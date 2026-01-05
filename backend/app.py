"""
Expense Tracker Backend
Flask REST API for managing expenses
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Expense

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


@app.route('/expense', methods=['POST'])
def add_expense():
    """Add a new expense"""
    data = request.get_json()
    
    # Create new expense
    expense = Expense(
        amount=data.get('amount'),
        category=data.get('category'),
        note=data.get('note', '')
    )
    
    db.session.add(expense)
    db.session.commit()
    
    return jsonify(expense.to_dict()), 201


@app.route('/expenses', methods=['GET'])
def get_expenses():
    """Get all expenses"""
    expenses = Expense.query.order_by(Expense.created_at.desc()).all()
    return jsonify([expense.to_dict() for expense in expenses])


@app.route('/expense/<int:id>', methods=['DELETE'])
def delete_expense(id):
    """Delete an expense by ID"""
    expense = Expense.query.get(id)
    
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    
    db.session.delete(expense)
    db.session.commit()
    
    return jsonify({'message': 'Expense deleted successfully'})


@app.route('/expense/<int:id>', methods=['GET'])
def get_expense(id):
    """Get a single expense by ID"""
    expense = Expense.query.get(id)
    
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    
    return jsonify(expense.to_dict())


@app.route('/expenses/total', methods=['GET'])
def get_total():
    """Get total sum of all expenses"""
    from sqlalchemy import func
    total = db.session.query(func.sum(Expense.amount)).scalar() or 0
    return jsonify({'total': total})


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
