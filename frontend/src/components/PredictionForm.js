import React, { useState } from "react";

const PredictionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        firstTermGpa: "",
        secondTermGpa: "",
        firstLanguage: "1",
        funding: "1",
        school: "1",
        fastTrack: "1",
        coop: "1",
        residency: "1",
        gender: "1",
        prevEducation: "1",
        ageGroup: "1",
        highSchoolAverageMark: "",
        mathScore: "",
        englishGrade: "1",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Term GPA:</label>
                <input
                    type="number"
                    step="0.01"
                    name="firstTermGpa"
                    value={formData.firstTermGpa}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Second Term GPA:</label>
                <input
                    type="number"
                    step="0.01"
                    name="secondTermGpa"
                    value={formData.secondTermGpa}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>First Language:</label>
                <select name="firstLanguage" value={formData.firstLanguage} onChange={handleChange}>
                    <option value="1">English</option>
                    <option value="2">French</option>
                    <option value="3">Other</option>
                </select>
            </div>
            <div>
                <label>Funding:</label>
                <select name="funding" value={formData.funding} onChange={handleChange}>
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
                <select name="school" value={formData.school} onChange={handleChange}>
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
                <select name="fastTrack" value={formData.fastTrack} onChange={handleChange}>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                </select>
            </div>
            <div>
                <label>Co-op:</label>
                <select name="coop" value={formData.coop} onChange={handleChange}>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                </select>
            </div>
            <div>
                <label>Residency:</label>
                <select name="residency" value={formData.residency} onChange={handleChange}>
                    <option value="1">Domestic</option>
                    <option value="2">International</option>
                </select>
            </div>
            <div>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="1">Female</option>
                    <option value="2">Male</option>
                    <option value="3">Neutral</option>
                </select>
            </div>
            <div>
                <label>Previous Education:</label>
                <select name="prevEducation" value={formData.prevEducation} onChange={handleChange}>
                    <option value="1">High School</option>
                    <option value="2">Post-Secondary</option>
                </select>
            </div>
            <div>
                <label>Age Group:</label>
                <select name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
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
                    name="highSchoolAverageMark"
                    value={formData.highSchoolAverageMark}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Math Score:</label>
                <input
                    type="number"
                    step="0.1"
                    name="mathScore"
                    value={formData.mathScore}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>English Grade:</label>
                <select name="englishGrade" value={formData.englishGrade} onChange={handleChange}>
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
    );
};

export default PredictionForm;
