"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin

from api.models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, Transactions
from api.utils import generate_sitemap, APIException
from datetime import datetime

from cloudinary.uploader import upload as cloudinary_upload
from cloudinary.uploader import upload

from flask_jwt_extended import create_access_token, get_jwt_identity
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required
from sqlalchemy.orm import aliased




from sqlalchemy import select
from sqlalchemy import or_
from flask import request
import traceback


from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)
CORS(api)

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
        city=address_data.get("Ciudad", city),
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
        is_active = request_body["Activo"],
        url = request_body["Url"]
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
    
    user = User.query.get_or_404(id)
    
    request_body = request.get_json()

    address_data = request_body.get("Direccion", {})
    address = Address(
        city=address_data.get("Ciudad", user.address.city),
        flat_number=address_data.get("Piso", user.address.flat_number),
        floor=address_data.get("Planta", user.address.floor),
        number=address_data.get("Numero", user.address.number),
        state=address_data.get("Provincia", user.address.state),
        street=address_data.get("Calle", user.address.street),
        zip_code=address_data.get("Codigo Postal", user.address.zip_code)
        )

    user.name = request_body.get("Nombre", user.name)
    user.last_name = request_body.get("Apellidos", user.last_name)
    user.document_type = request_body.get("Tipo de documento", user.document_type)
    user.document_number = request_body.get("Numero de identificacion", user.document_number)
    user.address = address
    user.phone = request_body.get("Telefono", user.phone)
    user.email = request_body.get("Email", user.email)
    user.password = request_body.get("Contraseña", user.password)
    user.is_active = request_body.get("Activo", user.is_active)
    user.url = request_body.get("Url", user.url)
       
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
    followeds = [followed["followed"] for followed in results]

    response_body = {
        "message": "Following",
        "user_id": followeds,
        "status": "ok"
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


@api.route('/users/<int:id>/favoriteusers/<int:followed_id>', methods=['DELETE'])
def delete_favorite_user(id, followed_id):
    user = User.query.get_or_404(id)
    follower = user
    followed = User.query.get_or_404(followed_id)

    favorite_user = FavoriteUser.query.filter_by(follower=follower, followed=followed).first()

    if favorite_user:
        db.session.delete(favorite_user)
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

from sqlalchemy.orm import aliased

# ... Resto del código ...


@api.route('/listings', methods=['GET'])
def get_listings():
    search_query = request.args.get('title')

    # Crear alias para la tabla Album para la unión
    album_alias = aliased(Album)

    columns_to_select = [
        Listings.id,
        Listings.listing_title,
        Listings.favorite_counter,
        album_alias.url.label('url'),
        Listings.sale_price  # Agrega la URL del álbum utilizando el alias
        # Agrega aquí todas las columnas que necesitas
    ]

    # Si hay un query de búsqueda, filtra los resultados
    if search_query:
        stmt = (
            select(columns_to_select)
            .where(Listings.listing_title.ilike(f"%{search_query}%"))
            .order_by(Listings.listing_title)
        ).join(album_alias, Listings.album_id == album_alias.id)
    else:
        # Crea una consulta seleccionando las columnas especificadas y ordenándolas por título
        stmt = (
            select(columns_to_select)
            .order_by(Listings.listing_title)
        ).join(album_alias, Listings.album_id == album_alias.id)

    # Ejecuta la consulta y obtén los resultados
    print(stmt)  # Imprime la consulta SQL generada

    items = db.session.execute(stmt).fetchall()

    # Convierte los resultados en un formato JSON
    results = [dict(item) for item in items]

    if results:
        response_body = {
        "message": "All items",
        "results": results,
        "status": "ok"
        }
        return jsonify(response_body), 200
    else:
    # Retorna una lista vacía con un código 200 en lugar de 404
        return jsonify({"message": "No items found", "results": [], "status": "ok"}), 200

    

@api.route('/listings/<int:id>', methods=['GET']) # Ok
def get_listings_id(id):

    listing = db.get_or_404(Listings, id)

    response_body = {
        "status": "ok",
        "results": listing.serialize()
    }

    return response_body, 200


@api.route('/users/<int:id>/listings', methods=['GET'])
def get_id_listings(id):

    # user = User.query.get_or_404(id)
    listings = db.session.execute(db.select(Listings).where(Listings.seller_id == id)).scalars()

    results = [item.serialize() for item in listings]

    response_body = {
        "message": "Listings",
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
# ----------------



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

    items = [item.serialize() for item in favorite_items]

    response_body = {
        "message": "Estos son tus articulos favoritos",
        "articulos": items,
        "status": "ok"
    }

    if response_body:
        return response_body, 200
    else:
        return "Not found", 404


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


# Transactions methods //////////////////////////////////////////////////////////////////

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
    
@api.route('/<int:user_id>/transactions', methods=['GET']) # Ok
def get_transactionsId(user_id):

    transaction_items = db.session.execute(db.select(Transactions).where(Transactions.buyer_id == user_id)).scalars()
    items = [item.serialize() for item in transaction_items]


    response_body = {
                    "message": "All users",
                    "results": items,
                    "status": "ok"
                    }

    if response_body:
        return response_body, 200
    else:
        return "Not Found", 404

@api.route('/<int:user_id>/transactionssell', methods=['GET']) # Ok
def get_transactionssellId(user_id):

    transaction_items = db.session.execute(db.select(Transactions).where(Transactions.seller_id == user_id)).scalars()
    items = [item.serialize() for item in transaction_items]


    response_body = {
                    "message": "All users",
                    "results": items,
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


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    print('Login', data)

    # Check if the user with the provided email exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 401
    print(user)
    # Verify the hashed password
    # if check_password_hash(user.password, password):
      
    #     # Password is correct, generate an access token
    #     access_token = create_access_token(identity=email)
    #     user_id = user.id
    #     print(user_id)
    #     return jsonify(access_token=access_token, user_id=user_id), 200
    # else:
    #     # Password is incorrect
    #     return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=email)
    user_id=user.id

    return jsonify(access_token=access_token, user_id=user_id), 200


@api.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    # Create a new user record and save it to the database
    user_data = {
        "name": data["name"],
        "last_name": data["last_name"],
        "document_type": data["document_type"],
        "document_number": data["document_number"],
        "phone": data["phone"],
        "email": data["email"],
        "password": generate_password_hash(data["password"]),
        "is_active": True, 
    }

    # Extract address data
    address_data = {
        "street": data["street"],
        "number": data["number"],
        "floor": data["floor"],
        "flat_number": data["flat_number"],
        "zip_code": data["zip_code"],
        "state": data["state"],
        "city": data["city"],
    }

    try:
        # Create an Address object and add it to the session
        address = Address(**address_data)
        db.session.add(address)

        # Create a User object with the associated Address and add it to the session
        user = User(address=address, **user_data)
        db.session.add(user)

        # Commit the changes to the database
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    
@api.route('/get-user-id', methods=['GET'])
@jwt_required()
def get_user_id():
    current_user_id = get_jwt_identity()
    return jsonify(user_id=current_user_id), 200


if __name__ == '__main__':
    api.run(debug=True)