"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, BookCategories, Categories, Transactions
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

# Users methods /////////////////////////////////////////////////////////////

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

# Users ID methods ///////////////////////////////////////////////////////  

@api.route('/users/<int:id>', methods=['GET']) # Ok
def get_users_id(id):

    user = db.get_or_404(User, id)

    response_body = {
        "status": "ok",
        "results": user.serialize()
    }

    return response_body, 200


@api.route('/users/<int:id>', methods=['PUT']) # Ok
def put_users_id(id):

    request_body = request.get_json()

    user = db.get_or_404(User, id)

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

    user.name = request_body["Nombre"]
    user.last_name = request_body["Apellidos"]
    user.document_type = request_body["Tipo de documento"]
    user.document_number = request_body["Numero de identificacion"]
    user.address = address
    user.phone = request_body["Telefono"]
    user.email = request_body["Email"]
    user.password = request_body["Contraseña"]
    user.is_active = request_body["Activo"]
       
    db.session.commit()

    response_body = {
        "message": "Update user",
        "status": "ok",
        "user": request_body
        }
                
    return request_body , 200


@api.route('/users/<int:id>', methods= ['DELETE']) # Ok
def delete_users_id(id):

    user = db.get_or_404(User, id)
    
    if user.address:  
        db.session.delete(user)  
        db.session.delete(user.address)  
        db.session.commit()

        response_body = {
            "message": "Deleted user and associated address",
            "status": "ok",
            "user": id
        }
    else:
        db.session.delete(user)  
        db.session.commit()

        response_body = {
            "message": "Deleted user",
            "status": "ok",
            "user": id
        }
   
    return response_body , 200

#FavoriteUsers methods //////////////////////////////////////////////////

@api.route('/users/<int:id>/favoriteusers', methods=['GET']) # Ok
def get_favorite_users(id): 

    favorite_users = db.session.execute(db.select(FavoriteUser).where(FavoriteUser.follower_id == id)).scalars()

    results = [item.serialize() for item in favorite_users]
    followeds = [followed["followed"]["id"] for followed in results]

    response_body = {
        "message": "Following",
        "user_id": followeds
    }

    return response_body, 200


@api.route('/users/<int:id>/favoriteusers', methods=['POST']) # Ok
def post_favorite_users(id):

    user = User.query.get_or_404(id)
    follower = user

    request_body = request.get_json()

    followed_id = request_body["Seguir"]
    followed = User.query.get_or_404(followed_id)

    new_followed = FavoriteUser(
        follower=follower,
        followed=followed
    )

    db.session.add(new_followed)
    db.session.commit()
    
    response_body = {
        "message": "New followed added",
        "status": "ok",
        "new_followed": new_followed.serialize()
    }
        
    return response_body, 200


@api.route('/users/<int:id>/favoriteusers', methods=['DELETE']) # Ok
def delete_favorite_users(id):

    user = User.query.get_or_404(id) 
    follower = user

    request_body = request.get_json()

    followed_id = request_body["Seguido"]
    followed = User.query.get_or_404(followed_id)

    favorite_user_id = FavoriteUser.query.filter_by(follower=follower, followed=followed).first()

    if favorite_user_id:
        db.session.delete(favorite_user_id)
        db.session.commit()
        
        response_body = {
            "message": "Follow relationship deleted",
            "status": "ok"
        }

        return response_body, 200
    
    else:
        response_body = {
            "message": "Follow relationship not found",
            "status": "error"
        }

        return response_body, 404
    

# Listings methods //////////////////////////////////////////////////////////////

@api.route('/listings', methods=['GET']) # Ok
def get_listings():
      
    items = db.session.execute(db.select(Listings).order_by(Listings.listing_title)).scalars()
    results = [item.serialize() for item in items]

    response_body = {
        "message": "All items",
        "results": results,
        "status": "ok"
        }

    if response_body:
        return response_body, 200
    else:
        return "Not found", 404

@api.route('users/<int:id>/listings', methods=['POST']) # Ok
def post_listings(id):
    
    user = User.query.get_or_404(id)
    seller_id = user.id
    
    request_body = request.get_json()

    listing_title = request_body.get("Titulo del item")
    sale_price = request_body.get("Precio de venta")
    description = request_body.get("Descripcion")
    status = request_body.get("Status")

    book_id = request_body.get("book_id", None)
    album_id = request_body.get("album_id", None)

    favorite_counter = 0

    new_item = Listings(
        listing_title=listing_title,
        favorite_counter=favorite_counter,
        sale_price=sale_price,
        description=description,
        status=status,
        seller_id=seller_id,
        book_id=book_id,
        album_id=album_id
    )

    db.session.add(new_item)
    db.session.commit()

    response_body = {
        "message": "New item added",
        "status": "ok",
        "new_item": new_item.serialize()
    }

    return response_body, 200

@api.route('/listings/<int:id_listing>', methods=['DELETE']) # Ok
def delete_listings(id_listing):

    # user = User.query.get_or_404(id)
    # user_id = user.id

    listing = Listings.query.get_or_404(id_listing)
    
    if listing:
        db.session.delete(listing)
        db.session.commit()
        
        response_body = {
            "message": "Listing deleted",
            "status": "ok"
        }

        return response_body, 200
    
    else:
        response_body = {
            "message": "Listing not found",
            "status": "error"
        }

        return response_body, 404


# Review methods //////////////////////////////////////////////////

@api.route('/users/<int:id>/reviews', methods=['GET']) # Ok
def get_users_reviews(id):

    reviews_user = db.session.execute(db.select(Reviews).where(Reviews.receiver_id == id)).scalars()

    result = [
        {
            "reviewer": {
                "id": review.reviewer.id,
            },
            "comment": review.comment,
            "punctuation": review.punctuation,
            "receiver": {
                "id": review.receiver.id,               
            }
        }
        for review in reviews_user
    ]

    response_body = {
        "Reviews": result
    }

    return response_body, 200


@api.route('/users/<int:id_reviewer>/reviews/<int:id_receiver>', methods=['POST'])
def post_users_reviews(id_reviewer, id_receiver):

    user_reviewer = User.query.get_or_404(id_reviewer)
    reviewer = user_reviewer.id

    user_receiver = User.query.get_or_404(id_receiver)
    receiver = user_receiver.id

    request_body = request.get_json()

    new_review = Reviews(
        comment = request_body["Comentario"],
        punctuation = request_body["Puntuacion"],
        reviewer_id = reviewer,
        receiver_id = receiver
    )

    db.session.add(new_review)
    db.session.commit()
    
    response_body = {
        "message": "New review added",
        "status": "ok",
        "review": new_review.serialize()
    }
    
    return response_body, 200

@api.route('/users/<int:id>/favoritelisting/', methods=['GET'])
def get_favorite_items(id):

    favorite_items = db.session.execute(db.select(FavoriteListings).where(FavoriteListings.user_id == id)).scalars()

    items = [item.listing_id for item in favorite_items]

    response_body = {
        "message": "Estos son tus artículos favoritos",
        "articulos": items  
    }

    return response_body

@api.route('/users/<int:user_id>/favoritelisting/<int:listing_id>', methods=['POST'])
def post_favorite_items(user_id, listing_id):

    user = User.query.get_or_404(user_id)
    listing = Listings.query.get_or_404(listing_id)
    

    new_favoritelisting = FavoriteListings(
        listing_id=listing.id,
        user_id=user.id
    )

    db.session.add(new_favoritelisting)
    db.session.commit()

    response_body = {
        "message": "New favorite item added",
        "Item": new_favoritelisting.serialize()
    }

    return response_body, 200




# @api.route('/favoritepost/<int:post_id>/<int:user_id>/', methods=['POST'])
# def post_postid_user_id(post_id, user_id):
#     pass
#     #validar si ya lo tiene como favorito
    

