/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/
import React from 'react';
import './Home.css';
import {useState, useEffect} from 'react';
import LocalStorage from "./localStorage";


const Home = () => {
    // This useEffect hook updates the document title to 'Cost Manager'
    useEffect(() => {
        document.title = 'Cost Manager';
    }, []);

    useEffect(() => {
        // This useEffect hook retrieves the inputs saved in local storage and sets them to the inputs state variable
        const inputsFromLocalStorage = LocalStorage.get('inputs');
        if (inputsFromLocalStorage) {
            setInputs(inputsFromLocalStorage);
        }
    }, []);

    // These state variables are used to store the values of the inputs
    const [date, setDate] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('food');
    const [description, setDescription] = useState('');
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');

    // This function is called when the user clicks the add cost button
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);


    return (
        <div className="Home">
            <h1>Add your expense here</h1>
            <div className="form-container">
                <div className="inputGroup">
                    <label htmlFor='name'>Date:</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                           autoComplete={'off'} max={todayStr}/>
                </div>
                <div className="inputGroup">
                    <label>Item: </label><input type="text" value={item} onChange={e => setItem(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <label>Price: </label><input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <label>Category:</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="personalSpending">Personal spending</option>
                        <option value="children">Children</option>
                        <option value="rent">Rent</option>
                        <option value="transportation">Transportation</option>
                        <option value="utilities">Utilities</option>
                        <option value="medical">Medical</option>
                        <option value="insurance">Insurance</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label>Description: </label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                              placeholder="Enter description"></textarea>
                </div>
                <div className="submit-cost">
                    <button className={"add-cost"} id="plus" onClick={() => {
                        if (!date || !item || !price) { // If any of the inputs are empty, display an error message
                            alert("please enter all field")
                            return;
                        }
                        setError('');
                        setInputs([...inputs, {date, item, price, category, description}]); // Add the new input to the inputs state variable
                        localStorage.setItem('inputs', JSON.stringify([...inputs, { // Add the new input to local storage
                            date,
                            item,
                            price,
                            category,
                            description
                        }]));
                        setDate(''); // Clear the date input
                        setItem(''); // Clear the item input
                        setPrice(''); // Clear the price input
                        setCategory('food'); // Reset the category to default
                        setDescription(''); // Clear the description input
                        alert("Cost added successfully");
                    }}>Add cost
                    </button>
                    {error && <p className="error">{error}</p>}
                </div>

            </div>


            {/*The component then maps over the items in the inputs state variable and displays them in a list*/}
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Delete item</th>
                </tr>
                </thead>
                <tbody>
                {inputs.map((input, index) => ( // Map over the inputs state variable
                    <tr key={index}>
                        <td>{input.date}</td>
                        <td>{input.item}</td>
                        <td>{input.price}</td>
                        <td>{input.category}</td>
                        <td>{input.description}</td>
                        <td>
                            <button
                                className={'delete-button'}
                                onClick={() => {
                                    inputs.splice(index, 1); // Remove the item from the inputs state variable
                                    setInputs([...inputs]); // Update the inputs state variable
                                    LocalStorage.set('inputs', inputs); // Update local storage
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>

    );
}
export default Home;
