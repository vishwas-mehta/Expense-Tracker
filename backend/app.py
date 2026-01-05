"""
Expense Tracker Backend
Flask REST API for managing expenses
"""
from flask import Flask
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy', 'message': 'Expense Tracker API is running'}


if __name__ == '__main__':
    app.run(debug=True, port=5000)
