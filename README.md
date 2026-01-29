# 💰 Expense Tracker

A full-stack expense tracking application with a Flask REST API backend and a modern, responsive web frontend.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

## ✨ Features

### Core Functionality
- ➕ **Add Expenses** - Track spending with amount, category, and notes
- 📋 **View Expenses** - See all transactions in a clean list view
- 🗑️ **Delete Expenses** - Remove entries with confirmation
- 📊 **Dashboard** - View total spending and transaction count

### User Experience
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔍 **Filter** - Filter expenses by category
- 📈 **Sort** - Sort by date or amount (ascending/descending)
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔔 **Notifications** - Toast messages for all actions
- ✨ **Animations** - Smooth transitions and micro-interactions

## 🛠️ Tech Stack

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript** - ES6+, Fetch API

## 📁 Project Structure

```
Expense-Tracker/
├── backend/
│   ├── app.py              # Flask application & routes
│   ├── models.py           # SQLAlchemy database models
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
│
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS with design system
│   ├── app.js              # JavaScript functionality
│   └── README.md           # Frontend documentation
│
├── .gitignore
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/vishwas-mehta/Expense-Tracker.git
cd Expense-Tracker
```

2. **Set up the backend**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at `http://localhost:5000`

3. **Open the frontend**
```bash
# In a new terminal, from project root
open frontend/index.html
```

Or use a local server:
```bash
npx serve frontend
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/expense` | Add new expense |
| GET | `/expenses` | Get all expenses |
| GET | `/expense/:id` | Get single expense |
| DELETE | `/expense/:id` | Delete expense |
| GET | `/expenses/total` | Get total sum |

### Example Request

```bash
curl -X POST http://localhost:5000/expense \
  -H "Content-Type: application/json" \
  -d '{"amount": 25.50, "category": "Food", "note": "Lunch"}'
```

### Example Response

```json
{
  "id": 1,
  "amount": 25.50,
  "category": "Food",
  "note": "Lunch",
  "created_at": "2026-01-06T12:00:00"
}
```

## 📸 Screenshots

### Light Mode
The application features a clean, modern interface with a purple/indigo primary color scheme, card-based layout, and intuitive form controls.

### Dark Mode
Click the moon/sun icon in the header to toggle dark mode. Theme preference is saved to localStorage.

## 🎨 Design Highlights

- **Design System** - CSS custom properties for consistent theming
- **Gradient Buttons** - Primary actions use attractive gradients
- **Card Shadows** - Subtle depth with layered shadows
- **Category Icons** - Emoji icons for visual categorization
- **Loading States** - Skeleton loaders and spinners
- **Staggered Animations** - Items animate in sequence

## 📝 Categories

| Icon | Category |
|------|----------|
| 🍔 | Food |
| 🚗 | Transport |
| 🛒 | Shopping |
| 🎬 | Entertainment |
| 📄 | Bills |
| 💊 | Health |
| 📚 | Education |
| ✈️ | Travel |
| 📦 | Other |

## 🔧 Development

### Backend Development
```bash
cd backend
python app.py  # Runs with debug=True
```

### Frontend Development
The frontend uses vanilla HTML/CSS/JS - no build step required.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Vishwas Mehta**
- GitHub: [@vishwas-mehta](https://github.com/vishwas-mehta)

---

Built with ❤️ for tracking expenses easily
