"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, BookCategories, Categories, Transactions
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST', 'GET']) #ok Makey
def handle_users():
    if request.method == 'GET' :  
        users = db.session.execute(db.select(User).order_by(User.name)).scalars()
        results = [item.serialize() for item in users]
        response_body = {"message": " esto devuelve el GET del endpoint /users",
                         "results": results,
                         "status": "ok"}

        if response_body:
            return response_body, 200
        else:
            return "Not Found", 404
    
    if request.method == 'POST' : #signup
        request_body = request.get_json()
        user = User(name = request_body["nombre"],
                    last_name = request_body["apellidos"],
                    document_type_enum = request_body["tipo de documento"],
                    document_type = request_body["tipo"],
                    document_number = request_body["numero de identificacion"],
                    address = request_body["direccion"],
                    phone = request_body["telefono"],
                    email = request_body["email"],
                    password = request_body["password"]
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new user",
                         "status": "ok",
                         "new_user": request_body}
        
       
        if response_body:
            return response_body, 200
        else:
            return "Not Found", 404


       
@api.route('/users/<int:id>', methods= ['GET', 'PUT', 'DELETE']) #Chachi
def handle_user(id):

    if request.method == 'GET' :
        user = db.get_or_404(User, id)
        print(user)
        response_body = {"status": "ok",
                         "results": user.serialize()
                         }
        
        return response_body, 200
        
    if request.method == 'PUT' :
        request_body = request.get_json()
        user = db.get_or_404(User, id)    
        user.name = request_body["nombre"]
        user.last_name = request_body["apellidos"]
        user.document_type_enum = request_body["tipo documento"]
        user.document_type = request_body["tipo"]
        user.document_number = request_body["numero de identificacion"]
        user.address = request_body["direccion"]
        user.phone = request_body["telefono"]
        user.email = request_body["email"]
        user.password = request_body["password"]
       
        db.session.commit()

        response_body = {"message": "Update user",
                         "status": "ok",
                         "user": request_body}
                
        return request_body , 200

       
    
    if request.method == 'DELETE' :
        user = db.get_or_404(User, id)
        db.session.delete(user)
        db.session.commit()
        response_body = {"message": "DELETE user",
                         "status": "ok",
                         "user_deleting": id}
        
        return response_body, 200

       



@api.route('/items', methods=['POST', 'GET'])
def handle_items():
    if request.method == 'GET' :
        items = db.session.execute(db.select(Listings).order_by(Listings.listing_title)).scalars()
        results = [item.serialize() for item in items]
        response_body = {"message": " esto devuelve el GET del endpoint /items",
                         "results": results,
                         "status": "ok"}

        return response_body, 200
    
    if request.method == 'POST' : #signup
        request_body = request.get_json()
        user = User(listing_title = request_body["encunciado"],
                    sale_price = request_body["precio"],
                    description = request_body["descripcion"],
                    document_number = request_body["document_number"],
                    status_enum = request_body["estado"],
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new item",
                         "status": "ok",
                         "new_item": request_body}
        
        return response_body, 200



@api.route('/location', methods=['POST', 'GET'])
def handle_address():
    if request.method == 'GET' :
        location = db.session.execute(db.select(Address).order_by(Address.id)).scalars()
        results = [item.serialize() for item in location]
        response_body = {"message": " esto devuelve el GET del endpoint /location",
                         "results": results,
                         "status": "ok"}

        return response_body, 200
    
    if request.method == 'POST' : #signup
        request_body = request.get_json()
        user = User(street = request_body["Calle"],
                    number = request_body["Numero"],
                    floor = request_body["Planta"],
                    letter = request_body["Letra"],
                    zipcode = request_body["Codigo postal"],
                    state = request_body["Poblacion"],
                    city = request_body["Ciudad"],
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new address",
                         "status": "ok",
                         "new user": request_body}
        
        return response_body, 200
    


@api.route('/books', methods=['POST', 'GET'])
def handle_books():
    if request.method == 'GET' :
        book = db.session.execute(db.select(Books).order_by(Books.title)).scalars()
        results = [item.serialize() for item in book]
        response_body = {"message": " esto devuelve el GET del endpoint /books",
                         "results": results,
                         "status": "ok"}

        return response_body, 200
    
    if request.method == 'POST' : #signup
        request_body = request.get_json()
        user = User(title = request_body["titulo"],
                    author = request_body["autor"],
                    publisher = request_body["editorial"],
                    published_date = request_body["año de publicacion"],
                    isbn = request_body["isbn"],
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new Book",
                         "status": "ok",
                         "new_user": request_body}
        
        return response_body, 200
    


@api.route('/transaccion', methods=['POST', 'GET'])
def handle_transaccion():
    if request.method == 'GET' :
        sale = db.session.execute(db.select(Transactions).order_by(Transactions.id)).scalars()
        results = [item.serialize() for item in sale]
        response_body = {"message": " esto devuelve el GET del endpoint /transaccion",
                         "results": results,
                         "status": "ok"}

        return response_body, 200
    
    if request.method == 'POST' : #signup
        request_body = request.get_json()
        user = User(seller_id = request_body["vendedor"],
                    buyer_id = request_body["comprador"],
                    listing_id = request_body["articulo"],
                    date = request_body["fecha"],
                    total = request_body["total"],
                    transaction_status_enum = request_body["estado"],
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new Book",
                         "status": "ok",
                         "new_user": request_body}
        
        return response_body, 200    



@api.route('/favoriteusers', methods=['POST', 'GET'])
def handle_favUsers():
    if request.method == 'GET' :
        favorite = db.session.execute(db.select(FavoriteUser).order_by(FavoriteUser.followed_id)).scalars()
        results = [item.serialize() for item in favorite]
       
        return results, 200
    
    if request.method == 'POST' : 
        request_body = request.get_json()
        user = User( follower = request_body["seguidor"],
                    followed = request_body["seguidos"]
                    )
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new Favorite User",
                         "status": "ok",
                         "new_Fav_User": request_body}
        
        return response_body, 200  


    
@api.route('/favoritelisting', methods=['POST', 'GET'])
def handle_favListing():
    if request.method == 'GET' :
        favorite = db.session.execute(db.select(FavoriteListings).order_by(FavoriteListings.listing_id)).scalars()
        results = [item.serialize() for item in favorite]
       
        return results, 200
    
    if request.method == 'POST' : 
        request_body = request.get_json()
        user = User( item = request_body["articulo favorito"],
                    )
                    
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new Favorite Item",
                         "status": "ok",
                         "new_Fav_Item": request_body}
        
        return response_body, 200      
    


@api.route('/review', methods=['POST', 'GET'])
def handle_review():
    if request.method == 'GET' :
        reviews = db.session.execute(db.select(Reviews).order_by(Reviews.id)).scalars()
        results = [item.serialize() for item in reviews]
       
        return results, 200
    
    if request.method == 'POST' : 
        request_body = request.get_json()
        user = User( reviewer = request_body["reseñador"],
                    receiver = request_body["receptor"],
                    comment = request_body["comentario"],
                    punctuation = request_body["puntuacion"]
                    )
                    
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new Favorite Item",
                         "status": "ok",
                         "new_Fav_Item": request_body}
        
        return response_body, 200      
    
