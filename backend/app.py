"""
Expense Tracker Backend
Flask REST API for managing expenses
"""
from flask import Flask
from flask_cors import CORS
from models import db

# Initialize Flask application
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database with app
db.init_app(app)


def init_db():
    """Initialize the database and create tables"""
    with app.app_context():
        db.create_all()
        print("Database initialized successfully!")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy', 'message': 'Expense Tracker API is running'}


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
