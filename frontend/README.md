# Expense Tracker Frontend

A modern, responsive web frontend for the Expense Tracker API.

## Features

- ✨ **Modern UI** - Clean design with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📊 **Dashboard** - View total expenses and transaction count
- ➕ **Add Expenses** - Quick form with validation
- 🗑️ **Delete Expenses** - Remove expenses with confirmation
- 🔍 **Filter** - Filter by category
- 📈 **Sort** - Sort by date or amount
- 📱 **Responsive** - Works on all screen sizes
- 🔔 **Toast Notifications** - Feedback for all actions

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript** - ES6+, Fetch API

## Setup

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Open the frontend in your browser:
```bash
open frontend/index.html
```

Or use a local server:
```bash
npx serve frontend
```

## Project Structure

```
frontend/
├── index.html    # Main HTML file
├── styles.css    # All styles with design system
├── app.js        # JavaScript functionality
└── README.md     # This file
```

## API Integration

The frontend connects to `http://localhost:5000` with these endpoints:

| Action | Method | Endpoint |
|--------|--------|----------|
| Get all expenses | GET | `/expenses` |
| Add expense | POST | `/expense` |
| Delete expense | DELETE | `/expense/:id` |
| Get total | GET | `/expenses/total` |

## Screenshots

### Light Mode
The app features a clean, modern light theme with subtle shadows and gradients.

### Dark Mode
Toggle the moon/sun icon in the header to switch to dark mode.
