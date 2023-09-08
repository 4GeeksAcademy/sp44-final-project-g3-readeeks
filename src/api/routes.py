"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, Transactions
from api.utils import generate_sitemap, APIException
from datetime import datetime

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


@api.route('/users/<int:id>/listings', methods=['POST']) # Ok
def post_listings(id):
    
    user = User.query.get_or_404(id)
    seller_id = user.id
    
    request_body = request.get_json()

    listing_title = request_body.get("Titulo del item")
    sale_price = request_body.get("Precio de venta")
    description = request_body.get("Descripcion")
    status = request_body.get("Status")

    album_data = request_body.get("album", {})  
    album = Album(
        url=album_data.get("La url")
    )   
    
    db.session.add(album)
    db.session.commit()

    album_id = album.id

    book_data = request_body.get("book", {})
    book = Books(
        title = book_data.get("Titulo"),
        author = book_data.get("Autor"),
        publisher = book_data.get("Editorial"),
        published_date = book_data.get("Fecha publicacion"),
        isbn = book_data.get("ISBN")
        #category1
        #category2
    )

    db.session.add(book)
    db.session.commit()

    book_id = book.id

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

@api.route('/users/<int:user_id>/listings/<int:listing_id>', methods=['PUT']) # Ok
def put_listings(user_id, listing_id):

    user = User.query.get_or_404(user_id)
    listing = Listings.query.get_or_404(listing_id)

    put_listing = Listings.query.filter_by(seller_id=user.id, id=listing.id).first()

    if put_listing:

        request_body = request.get_json()

        album_data = request_body.get("Album", {})
        album_url = album_data.get("La url")
        
        if album_url:
            put_listing.album.url = album_url

        put_listing.listing_title = request_body.get("Titulo", put_listing.listing_title)
        put_listing.sale_price = request_body.get("Precio venta", put_listing.sale_price)
        put_listing.description = request_body.get("Descripcion", put_listing.description)
        put_listing.status = request_body.get("Estado", put_listing.status)
        
       
        db.session.commit()

        response_body = {
            "message": "Update listing",
            "status": "ok",
            "listing": request_body
        }

        return request_body, 200

    else:

        response_body = {
            "message": "Listing not found",
            "status": "ok",
        }

        return response_body, 404


@api.route('/listings/<int:id_listing>', methods=['DELETE']) # Ok
def delete_listings(id_listing):

    # user = User.query.get_or_404(id)
    # user_id = user.id

    listing = Listings.query.get_or_404(id_listing)
    
    album_id = listing.album_id
    album_id_in_album = Album.query.get_or_404(album_id)
    
    if listing and album_id_in_album:
        db.session.delete(listing)
        db.session.delete(album_id_in_album)
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


@api.route('/users/<int:id_reviewer>/reviews/<int:id_receiver>', methods=['POST'])#OK
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

# FavoriteListings methods //////////////////////////////////////////////////////////////////////////////////////////////

@api.route('/users/<int:id>/favoritelistings/', methods=['GET'])#OK
def get_favorite_items(id):

    favorite_items = db.session.execute(db.select(FavoriteListings).where(FavoriteListings.user_id == id)).scalars()

    items = [item.listing_id for item in favorite_items]

    response_body = {
        "message": "Estos son tus articulos favoritos",
        "articulos": items  
    }

    return response_body


@api.route('/users/<int:user_id>/favoritelistings/<int:listing_id>', methods=['POST']) #Ok
def post_favorite_items(user_id, listing_id):
    
    user = User.query.get_or_404(user_id)    
    user_favoritelisting = user.id

    listing = Listings.query.get_or_404(listing_id)
    listing_favoritelisting = listing.id

    existing_favorite = FavoriteListings.query.filter_by(user_id=user_id, listing_id=listing_id).first()

    if existing_favorite:
        response_body = {
            "message": "Este articulo ya esta en tu lista de favoritos."
        }
        return response_body, 400  

    new_favorite_listing = FavoriteListings(
        listing_id=listing_favoritelisting,
        user_id=user_favoritelisting
    )

    db.session.add(new_favorite_listing)
    db.session.commit()
    
    response_body = {
        "message": "Nuevo articulo favorito añadido",
        "Item": new_favorite_listing.serialize()
    }

    
    return response_body, 200
    

@api.route("/users/<int:user_id>/favoritelistings/<int:listing_id>", methods=['DELETE']) # Ok
def delete_userid_listingid(user_id, listing_id):

    user = User.query.get_or_404(user_id)  
    
    listing = Listings.query.get_or_404(listing_id)
    
    delete_favorite = FavoriteListings.query.filter_by(user_id=user.id, listing_id=listing.id).first()

    if delete_favorite:
        db.session.delete(delete_favorite)
        db.session.commit()

        response_body = {
            "message": "Favorite deleted",
            "status": "ok"
        }

        return response_body, 200

    else:

        response_body = {
            "message": "Favorite not found",
            "status": "Error"
        }

        return response_body, 404


# Books methods ///////////////////////////////////////////////////////////////////////////////////////////////////


@api.route('/books', methods=['GET']) # Ok
def get_books():
      
    books = db.session.execute(db.select(Books).order_by(Books.title)).scalars()
    results = [item.serialize() for item in books]

    response_body = {
        "message": "All books",
        "results": results,
        "status": "ok"
        }

    if response_body:
        return response_body, 200
    else:
        return "Not found", 404


@api.route('/transactions', methods=['GET']) # Ok
def get_transactions():

    transactions = db.session.execute(db.select(Transactions).order_by(Transactions.id)).scalars()
    results = [item.serialize() for item in transactions]

    response_body = {
                    "message": "All users",
                    "results": results,
                    "status": "ok"
                    }

    if response_body:
        return response_body, 200
    else:
        return "Not Found", 404
    

@api.route('/<int:buyer_id>/transactions/<int:listing_id>', methods=['POST'])
def post_transactions(buyer_id, listing_id):

    buyer = User.query.get_or_404(buyer_id)
    listing = Listings.query.get_or_404(listing_id)
    seller = User.query.get_or_404(listing.seller_id)

    if buyer.id != seller.id:

        request_data = request.get_json()

    
        date_str = request_data.get("date")
        date = datetime.strptime(date_str, '%Y-%m-%d').date()  

        total = request_data.get("total")
        status = request_data.get("status")

        new_transaction = Transactions(
                date=date,
                total=total,
                status=status,
                seller=seller,
                buyer=buyer,
                listing=listing
            )

        db.session.add(new_transaction)
        db.session.commit()

        response_body = {
                "message": "New transaction added",
                "status": "ok",
                "transaction": new_transaction.serialize()
            }
    
        return response_body, 200
    
    else:

        response_body = {
            "message": "El comprador y el vendedor no pueden ser el mismo, crack"
        }

        return response_body, 403

@api.route('/<int:buyer_id>/transactions/<int:listing_id>', methods=['DELETE']) # Ok
def delete_transactions(buyer_id, listing_id):

    buyer = User.query.get_or_404(buyer_id)
    listing = Listings.query.get_or_404(listing_id)
    seller = User.query.get_or_404(listing.seller_id)

    

    delete_transactions = Transactions.query.filter_by(buyer_id=buyer.id, listing_id=listing.id, seller_id=seller.id).first()

    if delete_transactions:
        db.session.delete(delete_transactions)
        db.session.commit()

        response_body = {
            "message": "Transaction deleted",
            "status": "ok",
            "ID": listing.id
            }

        return response_body, 200

    else:

        response_body = {
            "message": "Transaction not found",
            "status": "Error"
            }

        return response_body, 404
   