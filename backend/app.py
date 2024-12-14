from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
model = tf.keras.models.load_model('model/student_persistence_model.h5')

# Load the scaler used during training
scaler = StandardScaler()
scaler.mean_ = np.load('model/scaler_mean.npy', allow_pickle=True)  # Load the saved mean
scaler.scale_ = np.load('model/scaler_scale.npy', allow_pickle=True)  # Load the saved scale

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from the frontend
    input_data = pd.DataFrame([data])  # Convert input data to DataFrame

    # Apply the trained scaler
    numeric_columns = [
        "First_Term_GPA", "Second_Term_GPA", "High_School_Avg",
        "Math_Score", "English_Grade"
    ]
    input_data[numeric_columns] = scaler.transform(input_data[numeric_columns])

    prediction = model.predict(input_data)
    prediction = int(prediction[0][0] > 0.5)  # Convert to binary prediction
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
