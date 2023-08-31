"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, BookCategories, Categories, Transactions
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/users', methods=['GET']) # Ok
def get_users():
      
    users = db.session.execute(db.select(User).order_by(User.name)).scalars()
    results = [item.serialize() for item in users]

    response_body = {
                    "message": "All users",
                    "results": results,
                    "status": "ok"
                    }

    if response_body:
        return response_body, 200
    else:
        return "Not Found", 404
    

@api.route('/users', methods=['POST']) # Ok
def post_users():
    
    request_body = request.get_json()

    address_data = request_body.get("Direccion", {})
    address = Address(
        city=address_data.get("Ciudad"),
        flat_number=address_data.get("Piso"),
        floor=address_data.get("Planta"),
        number=address_data.get("Numero"),
        state=address_data.get("Provincia"),
        street=address_data.get("Calle"),
        zip_code=address_data.get("Codigo Postal")
        )

    new_user = User(
        name = request_body["Nombre"],
        last_name = request_body["Apellidos"],
        document_type = request_body["Tipo de documento"],
        document_number = request_body["Numero de identificacion"],
        address = address,
        phone = request_body["Telefono"],
        email = request_body["Email"],
        password = request_body["Contraseña"],
        is_active = request_body["Activo"]
        )

    db.session.add(new_user)
    db.session.commit()

    response_body = {
                    "message": "Adding new user",
                    "status": "ok",
                    "new_user": request_body
                    }
        
    if response_body:
        return response_body, 200
    else:
        return "Not Found", 404

######################################################################################################################################################
       
