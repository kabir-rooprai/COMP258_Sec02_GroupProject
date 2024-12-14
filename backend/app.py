from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import StandardScaler
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model('model/student_persistence_model.h5')

# Define an endpoint to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from the frontend

    # Convert input data to a Pandas DataFrame
    input_data = pd.DataFrame([data])

    # Example preprocessing (ensure you apply the same transformations used during training)
    numeric_columns = [
        "First_Term_GPA", "Second_Term_GPA", "High_School_Avg", 
        "Math_Score", "English_Grade"
    ]

    scaler = StandardScaler()  # Reuse the scaler used in training
    input_data[numeric_columns] = scaler.fit_transform(input_data[numeric_columns])

    # Make prediction
    prediction = model.predict(input_data)
    prediction = int(prediction[0][0] > 0.5)  # Convert to binary (0 or 1)

    # Return prediction as JSON
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
