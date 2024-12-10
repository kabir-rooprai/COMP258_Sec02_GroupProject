import React from "react";
import PredictionForm from "../components/PredictionForm";

const Home = () => {
    const handlePredictionSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    return (
        <div>
            <h1>Student Persistence Predictor</h1>
            <PredictionForm onSubmit={handlePredictionSubmit} />
        </div>
    );
};

export default Home;
