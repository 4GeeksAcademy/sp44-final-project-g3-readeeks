"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app.url_map.strict_slashes = False

app.config['CLOUD_NAME'] = os.getenv("CLOUD_NAME")
app.config['CLOUD_API_SECRET'] = os.getenv("CLOUD_API_SECRET")
app.config['CLOUD_KEY'] = os.getenv("CLOUD_KEY")

cloudinary.config( 
  cloud_name = app.config['CLOUD_NAME'], 
  api_key = app.config['CLOUD_KEY'], 
  api_secret = app.config['CLOUD_API_SECRET'],
  secure = True
)

# database configuration
# Initialize and set up bcrypt
bcrypt = Bcrypt(app)

# database condiguration

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the commands
setup_commands(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_KEY")
jwt = JWTManager(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/upload-image', methods=['POST'])
def upload_image():
    try:
        images = []  # Lista para guardar las imágenes enviadas
        for i in range(4):  # Asumiendo que enviarás hasta 4 imágenes
            key = f'img{i}'
            if key in request.files:
                image = request.files[key]
                images.append(image)  # Agrega la imagen a la lista
            else:
                break

        # Procesa la lista `images` como desees. Aquí solo las imprimimos
        for img in images:
            print(img)

        return jsonify({"success": True, "message": f"Received {len(images)} images."})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal Server Error"}), 500

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
