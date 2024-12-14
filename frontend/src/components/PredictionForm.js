import React, { useState } from "react";
import "../styles/PredictionForm.css";
import { predictPersistence } from "../services/api";

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        First_Term_GPA: "",
        Second_Term_GPA: "",
        First_Language: "1",
        Funding: "1",
        School: "1",
        FastTrack: "1",
        Coop: "1",
        Residency: "1",
        Gender: "1",
        Previous_Education: "1",
        Age_Group: "1",
        High_School_Avg: "",
        Math_Score: "",
        English_Grade: "1",
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await predictPersistence(formData);
            setPrediction(result.prediction); // Set the prediction result
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the prediction.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Term GPA:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="First_Term_GPA"
                        value={formData.First_Term_GPA}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Second Term GPA:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="Second_Term_GPA"
                        value={formData.Second_Term_GPA}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>First Language:</label>
                    <select name="First_Language" value={formData.First_Language} onChange={handleChange}>
                        <option value="1">English</option>
                        <option value="2">French</option>
                        <option value="3">Other</option>
                    </select>
                </div>
                <div>
                    <label>Funding:</label>
                    <select name="Funding" value={formData.Funding} onChange={handleChange}>
                        <option value="1">Apprentice_PS</option>
                        <option value="2">GPOG_FT</option>
                        <option value="3">Intl Offshore</option>
                        <option value="4">Intl Regular</option>
                        <option value="5">Intl Transfer</option>
                        <option value="6">Joint Program Ryerson</option>
                        <option value="7">Joint Program UTSC</option>
                        <option value="8">Second Career Program</option>
                        <option value="9">Work Safety Insurance Board</option>
                    </select>
                </div>
                <div>
                    <label>School:</label>
                    <select name="School" value={formData.School} onChange={handleChange}>
                        <option value="1">Advancement</option>
                        <option value="2">Business</option>
                        <option value="3">Communications</option>
                        <option value="4">Community and Health</option>
                        <option value="5">Hospitality</option>
                        <option value="6">Engineering</option>
                        <option value="7">Transportation</option>
                    </select>
                </div>
                <div>
                    <label>Fast Track:</label>
                    <select name="FastTrack" value={formData.FastTrack} onChange={handleChange}>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                </div>
                <div>
                    <label>Co-op:</label>
                    <select name="Coop" value={formData.Coop} onChange={handleChange}>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                </div>
                <div>
                    <label>Residency:</label>
                    <select name="Residency" value={formData.Residency} onChange={handleChange}>
                        <option value="1">Domestic</option>
                        <option value="2">International</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="Gender" value={formData.Gender} onChange={handleChange}>
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                        <option value="3">Neutral</option>
                    </select>
                </div>
                <div>
                    <label>Previous Education:</label>
                    <select name="Previous_Education" value={formData.Previous_Education} onChange={handleChange}>
                        <option value="1">High School</option>
                        <option value="2">Post-Secondary</option>
                    </select>
                </div>
                <div>
                    <label>Age Group:</label>
                    <select name="Age_Group" value={formData.Age_Group} onChange={handleChange}>
                        <option value="1">0-18</option>
                        <option value="2">19-20</option>
                        <option value="3">21-25</option>
                        <option value="4">26-30</option>
                        <option value="5">31-35</option>
                        <option value="6">36-40</option>
                        <option value="7">41-50</option>
                        <option value="8">51-60</option>
                        <option value="9">61-65</option>
                        <option value="10">66+</option>
                    </select>
                </div>
                <div>
                    <label>High School Average Mark:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="High_School_Avg"
                        value={formData.High_School_Avg}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Math Score:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="Math_Score"
                        value={formData.Math_Score}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>English Grade:</label>
                    <select name="English_Grade" value={formData.English_Grade} onChange={handleChange}>
                        <option value="1">Level-130</option>
                        <option value="2">Level-131</option>
                        <option value="3">Level-140</option>
                        <option value="4">Level-141</option>
                        <option value="5">Level-150</option>
                        <option value="6">Level-151</option>
                        <option value="7">Level-160</option>
                        <option value="8">Level-161</option>
                        <option value="9">Level-170</option>
                        <option value="10">Level-171</option>
                        <option value="11">Level-180</option>
                    </select>
                </div>
                <button type="submit">Predict</button>
            </form>

            {/* Display the prediction */}
            {prediction !== null && (
                <div>
                    <h3>Prediction:</h3>
                    <p>{prediction === 1 ? "Persisted" : "Not Persisted"}</p>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;
