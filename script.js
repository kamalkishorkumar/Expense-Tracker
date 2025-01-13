const form = document.getElementById('transaction-form');
        const transactionList = document.getElementById('transaction-list');
        const totalIncome = document.getElementById('total-income');
        const totalExpense = document.getElementById('total-expense');
        const netIncome = document.getElementById('net-income');
        const errorMessage = document.getElementById('error-message');

        let transactions = [];
        let availableIncome = 0;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const date = document.getElementById('date').value;
            const description = document.getElementById('description').value;
            const category = document.getElementById('category').value;
            const amount = parseFloat(document.getElementById('amount').value);

            if (!date || !description || !category || isNaN(amount)) {
                errorMessage.textContent = 'Please fill out all fields correctly.';
                return;
            }

            errorMessage.textContent = '';

            const transaction = { date, description, category, amount };

            if (category === 'Food' || category === 'Transportation' || category === 'Entertainment' || category === 'Shopping') {
                if (amount > availableIncome) {
                    errorMessage.textContent = 'Insufficient funds for this expense.';
                    return;
                }
                availableIncome -= amount;
            } else {
                availableIncome += amount;
            }

            transactions.push(transaction);

            renderTransactions();
            calculateSummary();
            form.reset();
        });

        function renderTransactions() {
            transactionList.innerHTML = '';
            transactions.forEach((transaction, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transaction.date}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td><button onclick="deleteTransaction(${index})">Delete</button></td>
                `;
                transactionList.appendChild(row);
            });
        }

        function deleteTransaction(index) {
            const transaction = transactions[index];
            if (transaction.category === 'Food' || transaction.category === 'Transportation' || transaction.category === 'Entertainment' || transaction.category === 'shopping') {
                availableIncome += transaction.amount;
            } else {
                availableIncome -= transaction.amount;
            }
            transactions.splice(index, 1);
            renderTransactions();
            calculateSummary();
        }

        function calculateSummary() {
            let income = 0;
            let expense = 0;

            transactions.forEach(transaction => {
                if (transaction.category === 'Food' || transaction.category === 'Transportation' || transaction.category === 'Entertainment' || transaction.category === 'Shopping') {
                    expense += transaction.amount;
                } else {
                    income += transaction.amount;
                }
            });

            totalIncome.textContent = income.toFixed(2);
            totalExpense.textContent = expense.toFixed(2);
            netIncome.textContent = availableIncome.toFixed(2);
        }