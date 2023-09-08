from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    document_type_enum = db.Enum('DNI', 'NIE', 'Passport', name='document_type_enum')
    document_type = db.Column(document_type_enum, nullable=False)
    document_number = db.Column(db.String(20), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # Relacion con tabla Address:
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    address = db.relationship('Address', primaryjoin='User.address_id == Address.id', uselist=False)

    def __repr__(self):
        return f'<User {self.name + " " + self.last_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "document_type": self.document_type,
            "document_number": self.document_number,
            "address": self.address.serialize() if self.address else None,
            "phone": self.phone,
            "email": self.email
        }
    
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(100), unique=False, nullable=False)
    number = db.Column(db.Integer, unique=False, nullable=False)
    floor = db.Column(db.Integer, unique=False, nullable=False)
    flat_number = db.Column(db.String(5), unique=False, nullable=False)
    zip_code = db.Column(db.Integer, unique=False, nullable=False)
    state = db.Column(db.String(20), unique=False, nullable=False)
    city = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return f'<Address {self.street}>'

    def serialize(self):
        return {
            "id": self.id,
            "street": self.street,
            "number": self.number,
            "floor": self.floor,
            "flat_number": self.flat_number,
            "zip_code": self.zip_code,
            "state": self.state,
            "city": self.city
        }
    
class FavoriteUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Relaciones con tabla User:
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    follower = db.relationship('User', foreign_keys=[follower_id])
    followed = db.relationship('User', foreign_keys=[followed_id])
    
    def __repr__(self):
        return f'<FavoriteUser {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "follower": self.follower.serialize(),
            "followed": self.followed.serialize()
        }
    
class FavoriteListings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Relacion con tabla Listings
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    listing = db.relationship('Listings', primaryjoin='FavoriteListings.listing_id == Listings.id', uselist=False)
    # Relacion con tabla User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', primaryjoin='FavoriteListings.user_id == User.id', uselist=False)

    def __repr__(self):
        return f'<FavoriteListings {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            #"favorite_listing": [listing.serialize() for listing in self.listing]
            "favorite_listing": self.listing.serialize() if self.listing else None

        }
    
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), unique=False, nullable=True)
    punctuation_enum = db.Enum('1', '2', '3', '4', '5', name='punctuation_enum')
    punctuation = db.Column(punctuation_enum, nullable=False)
    # Relaciones con tabla User:
    reviewer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviewer = db.relationship('User', primaryjoin='Reviews.reviewer_id == User.id', uselist=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver = db.relationship('User', primaryjoin='Reviews.receiver_id == User.id', uselist=False)

    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "reviewer": self.reviewer.serialize() if self.reviewer else None,
            "receiver": self.receiver.serialize() if self.receiver else None,
            "comment": self.comment,
            "punctuation": self.punctuation
        }
    
class Listings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    listing_title = db.Column(db.String(200), unique=False, nullable=False)
    favorite_counter = db.Column(db.Integer, unique=False, nullable=False)
    sale_price = db.Column(db.Float, unique=False, nullable=False)
    description = db.Column(db.String(1000), unique=False, nullable=True)
    status_enum = db.Enum('Activo', 'Reservado', 'Vendido', 'Cancelado', name='status_enum')
    status = db.Column(status_enum, nullable=False)
    # Relacion con tabla User:
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller = db.relationship('User', primaryjoin='Listings.seller_id == User.id', uselist=False)
    # Relacion con tabla Books:
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)
    book = db.relationship('Books', primaryjoin='Listings.book_id == Books.id', uselist=False)
    # Relacion con tabla Album:
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=True)
    album = db.relationship('Album', primaryjoin='Listings.album_id == Album.id', uselist=False)

    def __repr__(self):
        return f'<Listings {self.listing_title}>'

    def serialize(self):
        return {
            "id": self.id,
            "seller": self.seller.serialize() if self.seller else None,
            "book": self.book.serialize() if self.book else None,
            "album": self.album.serialize() if self.album else None,
            "listing_title": self.listing_title,
            "favorite_counter": self.favorite_counter,
            "sale_price": self.sale_price,
            "description": self.description,
            "status": self.status
        }

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), unique=False, nullable=False)

    def __repr__(self):
        return f'<Album {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "url": self.url
        }

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=False, nullable=True)
    author = db.Column(db.String(50), unique=False, nullable=True)
    publisher = db.Column(db.String(50), unique=False, nullable=True)
    published_date = db.Column(db.String(50), unique=False, nullable=True)
    isbn = db.Column(db.String(20), unique=True, nullable=True)
    category1 = db.Column(db.String(20), unique=False, nullable=True)
    category2 = db.Column(db.String(20), unique=False, nullable=True)

    def __repr__(self):
        return f'<Books {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "publisher": self.publisher,
            "published_date": self.published_date,
            "isbn": self.isbn
        }
    
# class BookCategories(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     # Relacion con tabla Books:
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
#     book = db.relationship('Books', primaryjoin='BookCategories.book_id == Books.id', uselist=False)
#     # Relacion con tabla Categories:
#     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
#     category = db.relationship('Categories', primaryjoin='BookCategories.category_id == Categories.id', uselist=True)

#     def __repr__(self):
#         return f'<BookCategories {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "book": self.book.serialize() if self.book else None,
#             "category": [category.serialize() for category in self.category]
#         }
    
# class Categories(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)
#     description = db.Column(db.String(500), unique=False, nullable=True)

#     def __repr__(self):
#         return f'<Categories {self.name}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description
#         }
    
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    total = db.Column(db.Float, unique=False, nullable=False)
    transaction_status_enum = db.Enum('Completada', 'Cancelada', 'Suspendida', 'Procesando', 'Error', name='transaction_status_enum')
    status = db.Column(transaction_status_enum, nullable=False)
    # Relaciones con tabla User:
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller = db.relationship('User', primaryjoin='Transactions.seller_id == User.id', uselist=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    buyer = db.relationship('User', primaryjoin='Transactions.buyer_id == User.id', uselist=False)
    # Relacion con tabla Listings:
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    listing = db.relationship('Listings', primaryjoin='Transactions.listing_id == Listings.id', uselist=False)

    def __repr__(self):
        return f'<Transactions {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "seller": self.seller.serialize() if self.seller else None,
            "buyer": self.buyer.serialize() if self.buyer else None,
            "listing": self.listing.serialize() if self.listing else None,
            "date": self.date.strftime('%Y-%m-%d'),
            "total": self.total,
            "status": self.status
        }