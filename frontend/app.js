/**
 * Expense Tracker App
 * Main JavaScript file for frontend functionality
 */

// ==========================================
// Configuration
// ==========================================
const API_BASE_URL = 'http://localhost:5000';

// Category icons mapping
const CATEGORY_ICONS = {
    'Food': '🍔',
    'Transport': '🚗',
    'Shopping': '🛒',
    'Entertainment': '🎬',
    'Bills': '📄',
    'Health': '💊',
    'Other': '📦'
};

// ==========================================
// State Management
// ==========================================
let expenses = [];
let filteredExpenses = [];

// ==========================================
// DOM Elements
// ==========================================
const expenseForm = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const noteInput = document.getElementById('note');
const submitBtn = document.getElementById('submit-btn');
const expensesList = document.getElementById('expenses-list');
const emptyState = document.getElementById('empty-state');
const totalAmountEl = document.getElementById('total-amount');
const expenseCountEl = document.getElementById('expense-count');
const filterCategory = document.getElementById('filter-category');
const sortBy = document.getElementById('sort-by');
const themeToggle = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type ('success' or 'error')
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✓' : '✕'}</span>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Set loading state on button
 * @param {boolean} loading - Loading state
 */
function setLoading(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    if (loading) {
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

// ==========================================
// Expense Form Handling
// ==========================================

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;
    const note = noteInput.value.trim();

    // Validation
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        amountInput.focus();
        return;
    }

    if (!category) {
        showToast('Please select a category', 'error');
        categorySelect.focus();
        return;
    }

    setLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, category, note })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add expense');
        }

        const newExpense = await response.json();
        expenses.unshift(newExpense);

        // Reset form
        expenseForm.reset();

        // Update UI
        applyFiltersAndSort();
        updateSummary();

        showToast('Expense added successfully!', 'success');

    } catch (error) {
        console.error('Error adding expense:', error);
        showToast(error.message || 'Failed to add expense', 'error');
    } finally {
        setLoading(false);
    }
}

// ==========================================
// Initialize
// ==========================================

// Form event listener
expenseForm.addEventListener('submit', handleFormSubmit);

console.log('Expense Tracker App initialized - Form component ready');
