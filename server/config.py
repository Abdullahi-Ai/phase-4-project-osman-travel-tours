import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('FLASK_SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('FLASK_SQLALCHEMY_TRACK_MODIFICATIONS') == "False"
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY') or 'super-secret'
