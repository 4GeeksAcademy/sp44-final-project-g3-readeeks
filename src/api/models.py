from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    document_type = db.Column(db.Enum, unique=False, nullable=False)
    document_num = db.Column(db.String(20), unique=True, nullable=False)
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
            "adress_id": self.address_id,
            "phone": self.phone,
            "email": self.email,
            "favorites_id": self.favorites_id,
            "history": self.history
        }
    
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=True) # Relacionado con User (user.id)
    item_id = db.Column(db.Integer, unique=True, nullable=True) # Relacionado con Item (item.id)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_id": self.item_id
        }
    
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=False) # Relaciona con User (user.id)
    book_id = db.Column(db.Integer, unique=True, nullable=False) # Relaciona con Book (book.id)
    item_title = db.Column(db.String(200), unique=False, nullable=False)
    favorite_counter = db.Column(db.Integer, unique=False, nullable=False)
    sale_price = db.Column(db.Float, unique=False, nullable=False)
    description = db.Column(db.String(1000), unique=False, nullable=True)
    status = db.Column(db.Enum(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Item {self.item_title}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "item_title": self.item_title,
            "favorite_counter": self.favorite_counter,
            "sale_price": self.sale_price,
            "description": self.description,
            "status": self.status
        }
    
class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, unique=True, nullable=False)