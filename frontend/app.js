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

// ==========================================
// Expenses List Handling
// ==========================================

/**
 * Create expense item HTML
 * @param {Object} expense - Expense data
 * @returns {string} HTML string for expense item
 */
function createExpenseItemHTML(expense) {
    const icon = CATEGORY_ICONS[expense.category] || '📦';
    return `
        <article class="expense-item" data-id="${expense.id}">
            <div class="expense-info">
                <div class="expense-category-icon">${icon}</div>
                <div class="expense-details">
                    <h4>${expense.category}</h4>
                    ${expense.note ? `<p class="note">${expense.note}</p>` : ''}
                    <p class="date">${formatDate(expense.created_at)}</p>
                </div>
            </div>
            <div class="expense-amount">${formatCurrency(expense.amount)}</div>
            <div class="expense-actions">
                <button class="btn-delete" onclick="deleteExpense(${expense.id})" title="Delete expense">
                    🗑️
                </button>
            </div>
        </article>
    `;
}

/**
 * Render expenses list
 */
function renderExpenses() {
    // Clear existing items except empty state
    const existingItems = expensesList.querySelectorAll('.expense-item');
    existingItems.forEach(item => item.remove());

    if (filteredExpenses.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        const fragment = document.createDocumentFragment();
        filteredExpenses.forEach(expense => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = createExpenseItemHTML(expense);
            fragment.appendChild(tempDiv.firstElementChild);
        });

        expensesList.insertBefore(fragment, emptyState);
    }
}

/**
 * Delete an expense
 * @param {number} id - Expense ID to delete
 */
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }

    // Add visual feedback
    const expenseItem = document.querySelector(`.expense-item[data-id="${id}"]`);
    if (expenseItem) {
        expenseItem.style.opacity = '0.5';
        expenseItem.style.pointerEvents = 'none';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/expense/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete expense');
        }

        // Remove from local state
        expenses = expenses.filter(e => e.id !== id);

        // Update UI
        applyFiltersAndSort();
        updateSummary();

        showToast('Expense deleted successfully!', 'success');

    } catch (error) {
        console.error('Error deleting expense:', error);
        showToast(error.message || 'Failed to delete expense', 'error');

        // Restore visual state
        if (expenseItem) {
            expenseItem.style.opacity = '1';
            expenseItem.style.pointerEvents = 'auto';
        }
    }
}

/**
 * Fetch all expenses from the API
 */
async function fetchExpenses() {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses`);

        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        expenses = await response.json();
        applyFiltersAndSort();
        updateSummary();

    } catch (error) {
        console.error('Error fetching expenses:', error);
        showToast('Failed to load expenses. Is the backend running?', 'error');
    }
}

/**
 * Update summary dashboard
 */
function updateSummary() {
    // Calculate local total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountEl.textContent = formatCurrency(total);
    expenseCountEl.textContent = expenses.length;

    // Animate the numbers
    animateSummaryCards();
}

/**
 * Fetch total from API (for verification)
 */
async function fetchTotalFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/total`);
        if (response.ok) {
            const data = await response.json();
            return data.total;
        }
    } catch (error) {
        console.error('Error fetching total:', error);
    }
    return null;
}

/**
 * Animate summary cards on update
 */
function animateSummaryCards() {
    const cards = document.querySelectorAll('.summary-card');
    cards.forEach(card => {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

/**
 * Apply filters and sorting (placeholder - will be implemented)
 */
function applyFiltersAndSort() {
    // For now, just copy all expenses
    filteredExpenses = [...expenses];
    renderExpenses();
}

// Make deleteExpense available globally for onclick handlers
window.deleteExpense = deleteExpense;

// Load expenses on page load
document.addEventListener('DOMContentLoaded', fetchExpenses);

console.log('Expense Tracker App initialized - Full list component ready');
