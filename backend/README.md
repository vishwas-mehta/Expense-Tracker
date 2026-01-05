# Expense Tracker Backend

A Flask REST API for managing personal expenses. Features CRUD operations, SQLite database, and input validation.

## Tech Stack

- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-SQLAlchemy** - ORM for SQLite database

## Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Server runs at `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /expense | Add new expense |
| GET | /expenses | Get all expenses |
| GET | /expense/:id | Get single expense |
| DELETE | /expense/:id | Delete expense |
| GET | /expenses/total | Get total sum |

## Request/Response Examples

### Add Expense

```bash
curl -X POST http://localhost:5000/expense \
  -H "Content-Type: application/json" \
  -d '{"amount": 50.00, "category": "Food", "note": "Lunch"}'
```

Response:
```json
{
  "id": 1,
  "amount": 50.0,
  "category": "Food",
  "note": "Lunch",
  "created_at": "2026-01-05T11:00:00"
}
```

### Get All Expenses

```bash
curl http://localhost:5000/expenses
```

### Delete Expense

```bash
curl -X DELETE http://localhost:5000/expense/1
```

### Get Total

```bash
curl http://localhost:5000/expenses/total
```

Response:
```json
{"total": 150.50}
```

## Input Validation

The API validates:
- `amount` - Required, must be positive number
- `category` - Required, cannot be empty
- `note` - Optional

## Project Structure

```
backend/
├── app.py           # Flask application & routes
├── models.py        # SQLAlchemy models
├── requirements.txt # Dependencies
└── README.md        # This file
```
