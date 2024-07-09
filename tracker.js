document.addEventListener('DOMContentLoaded', loadExpenses);

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;

    if (name && amount) {
        const expense = {
            id: Date.now(),
            name,
            amount
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        addExpenseToList(expense);
        expenseForm.reset();
    }
});

function loadExpenses() {
    expenses.forEach(expense => addExpenseToList(expense));
}

function addExpenseToList(expense) {
    const li = document.createElement('li');
    li.dataset.id = expense.id;
    li.innerHTML = `
        ${expense.name}: ₹${expense.amount}
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    expenseList.appendChild(li);

    li.querySelector('.delete').addEventListener('click', () => {
        deleteExpense(expense.id);
    });

    li.querySelector('.edit').addEventListener('click', () => {
        editExpense(expense.id);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    document.querySelector(`[data-id='${id}']`).remove();
}

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    deleteExpense(id);
}
