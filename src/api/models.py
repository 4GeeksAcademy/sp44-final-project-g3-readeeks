from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    document_type_enum = db.Enum('DNI', 'NIE', 'Passport', name='document_type_enum')
    document_type = db.Column(document_type_enum, nullable=False)
    document_number = db.Column(db.String(20), unique=True, nullable=False)
    address_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con tabla address (address.id)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.name + " " + self.last_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "document_type": self.document_type,
            "document_number": self.document_number,
            "adress_id": self.address_id,
            "phone": self.phone,
            "email": self.email
        }
    
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(100), unique=False, nullable=False)
    number = db.Column(db.Integer, unique=False, nullable=False)
    floor = db.Column(db.Integer, unique=False, nullable=False)
    flat_number = db.Column(db.String(5), unique=True, nullable=False)
    zip_code = db.Column(db.Integer, unique=True, nullable=False)
    state = db.Column(db.String(20), unique=True, nullable=False)
    city = db.Column(db.String(20), unique=True, nullable=False)

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
    user_id = db.Column(db.Integer, unique=True, nullable=True) # Relacionado con User (user.id)

    def __repr__(self):
        return f'<FavoriteUser {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id
        }
    
class FavoriteListings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, unique=True, nullable=True) # Relacionado con Listings (listings.id)

    def __repr__(self):
        return f'<FavoriteListings {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "listing_id": self.listing_id
        }
    
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con User (user.id)
    receiver_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con User (user.id)
    comment = db.Column(db.String(1000), unique=False, nullable=True)
    punctuation_enum = db.Enum('1', '2', '3', '4', '5', name='punctuation_enum')
    punctuation = db.Column(punctuation_enum, nullable=False)

    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "reviewer_id": self.reviewer_id,
            "receiver_id": self.receiver_id,
            "comment": self.comment,
            "punctuation": self.punctuation
        }
    
class Listings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con User (user.id)
    book_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con Books (books.id)
    album_id = db.Column(db.Integer, unique=True, nullable=True) # Relacionado con Album (album.id)
    listing_title = db.Column(db.String(200), unique=False, nullable=False)
    favorite_counter = db.Column(db.Integer, unique=False, nullable=False)
    sale_price = db.Column(db.Float, unique=False, nullable=False)
    description = db.Column(db.String(1000), unique=False, nullable=True)
    status_enum = db.Enum('Activo', 'Reservado', 'Vendido', 'Cancelado', name='status_enum')
    status = db.Column(status_enum, nullable=False)

    def __repr__(self):
        return f'<Listings {self.listing_title}>'

    def serialize(self):
        return {
            "id": self.id,
            "seller_id": self.seller_id,
            "book_id": self.book_id,
            "album_id": self.album_id,
            "listing_title": self.listing_title,
            "favorite_counter": self.favorite_counter,
            "sale_price": self.sale_price,
            "description": self.description,
            "status": self.status
        }

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, unique=True, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)

    def __repr__(self):
        return f'<Album {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "listing_id": self.listing_id,
            "url": self.url
        }

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=False, nullable=False)
    author = db.Column(db.String(50), unique=False, nullable=False)
    publisher = db.Column(db.String(50), unique=False, nullable=False)
    published_date = db.Column(db.String(50), unique=False, nullable=False)
    isbn = db.Column(db.String(20), unique=True, nullable=False)

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
    
class BookCategories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con Books (books.id)
    category_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con Categories (categories.id)

    def __repr__(self):
        return f'<BookCategories {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "category_id": self.category_id
        }
    
class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=True)

    def __repr__(self):
        return f'<Categories {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
    
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, unique=False, nullable=False) # Relacionado con User (user.id)
    buyer_id = db.Column(db.Integer, unique=False, nullable=False) # Relacionado con User (user.id)
    listing_id = db.Column(db.Integer, unique=True, nullable=False) # Relacionado con Listings (listings.id)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    total = db.Column(db.Float, unique=False, nullable=False)
    transaction_status_enum = db.Enum('Completada', 'Cancelada', 'Suspendida', 'Procesando', 'Error', name='transaction_status_enum')
    status = db.Column(transaction_status_enum, nullable=False)

    def __repr__(self):
        return f'<Transactions {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "seller_id": self.seller_id,
            "buyer_id": self.buyer_id,
            "listing_id": self.listing_id,
            "date": self.date,
            "total": self.total,
            "status": self.status
        }