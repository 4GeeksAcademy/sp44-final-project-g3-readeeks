  
import os
from flask_admin import Admin
from .models import db, User, Address, FavoriteUser, FavoriteListings, Reviews, Listings, Album, Books, Transactions
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Readeeks', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Listings, db.session))
    admin.add_view(ModelView(Address, db.session))
    admin.add_view(ModelView(Books, db.session))
    admin.add_view(ModelView(Transactions, db.session))
    admin.add_view(ModelView(FavoriteUser, db.session))
    admin.add_view(ModelView(Reviews, db.session))
    admin.add_view(ModelView(FavoriteListings, db.session))
    admin.add_view(ModelView(Album, db.session))







    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))