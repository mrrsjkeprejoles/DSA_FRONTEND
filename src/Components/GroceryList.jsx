import React, { useState } from "react";
import "./GroceryList.css";

const GroceryList = () => {
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
        category: "",
    });

    const [groceryItems, setGroceryItems] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.itemName || !formData.quantity || !formData.category) {
            alert("Please fill out all fields before submitting!");
            return;
        }

        setGroceryItems([...groceryItems, formData]);

        setFormData({
            itemName: "",
            quantity: "",
            category: "",
        });
        try{
            const response = await fetch("https://backennnd-exb3e2bje0facrfc.southeastasia-01.azurewebsites.net/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                const result = await response.json();
                alert("form submitted successfully");
                console.log("API response:", result);
                console.log("form submission successful");
            } else {
                alert("failed to submit");
                console.error("API Error", response.statusText)
            }
        } catch(error){
            alert("an error occurred");
            console.error("error", error);
        }
    };

    return (
        <div className="grocery-container">
            <div className="grocery-card">
                <h1>Online Grocery List</h1>
                <p>Add items to your grocery list</p>
                <form onSubmit={handleSubmit}>
                    {/* Item Name Input */}
                    <div className="form-field">
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            placeholder="Enter item name"
                            value={formData.itemName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Quantity Input */}
                    <div className="form-field">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Enter quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Category Input */}
                    <div className="form-field">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Meat">Meat</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Canned goods">Canned goods</option>
                            <option value="Condiments">Condiments</option>
                            <option value="Alcohol">Alcohol</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Frozen Foods">Frozen Foods</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Add to List
                    </button>
                </form>
            </div>

            {/* Display Grocery Items */}
            <div className="grocery-list">
                <h2>Your Grocery List</h2>
                {groceryItems.length === 0 ? (
                    <p>No items in the list yet.</p>
                ) : (
                    <ul>
                        {groceryItems.map((item, index) => (
                            <li key={index}>
                                {item.quantity}x {item.itemName} ({item.category})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GroceryList;
