/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/
import React, {useState, useEffect} from 'react';
import './Reports.css';
import LocalStorage from "./localStorage";

//page title
const Reports = () => {
    useEffect(() => {
        document.title = 'Reports';
    }, []);

    //state variables
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [expenses, setExpenses] = useState([]); //expenses
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    //to show expense by category later
    const categories = {};
    filteredExpenses.forEach(expense => {
        if (categories[expense.category]) {
            categories[expense.category] += parseInt(expense.price);
        } else {
            categories[expense.category] = parseInt(expense.price);
        }
    });

    // Fetch the expenses from local storage
    useEffect(() => {
        const inputsFromLocalStorage = LocalStorage.get('inputs');
        if (inputsFromLocalStorage) {
            setExpenses(inputsFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        console.log("change", expenses);
    }, [expenses]);


    // Calculate the total expenses for the filtered expenses
    const calculateTotalExpenses = () => {
        // if all the filter are filled
        if (selectedYear && selectedMonth) {
            let total = 0;
            const filtered = expenses.filter(exp => new Date(exp.date).getFullYear().toString() === selectedYear && new Date(exp.date).getMonth().toString() === selectedMonth);
            console.log("filtered", filtered);
            setFilteredExpenses(filtered);

            filteredExpenses.forEach(expense => {
                total += parseInt(expense.price);
            });
            setTotalExpenses(total);
        } else {
            alert('Please select a year and a month');
        }
    };
    useEffect(() => {
        let total = 0;
        filteredExpenses.forEach(expense => {
            total += parseInt(expense.price);
        });
        setTotalExpenses(total);
    }, [filteredExpenses]);

    return (
        <div className="reports">
            <h1 className="headline">Expense Report</h1>
            <div className="select-container">
                <label className="label">Year</label>
                <select className="select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value="" disabled>Select a year</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div className="select-container">
                <label className="label">Month</label>
                <select className="select" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                    <option value="" disabled>Select a month</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                    ...
                </select>
            </div>
            <div>
                <button className="submit" onClick={calculateTotalExpenses}>Show expenses</button>
            </div>
            {filteredExpenses.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredExpenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.date}</td>
                            <td>{expense.item}</td>
                            <td>{expense.price}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div>
                <p className="total-expenses">Total expenses for selected period: <span
                    className="total-number">{totalExpenses} ILS</span></p>
            </div>
            <div>
                <p className="total-expenses">Expenses by category:</p>
                {Object.keys(categories).map(category => (
                    <p key={category}>{category}: {categories[category]} ILS</p>
                ))}
            </div>
        </div>
    )
}

export default Reports;
