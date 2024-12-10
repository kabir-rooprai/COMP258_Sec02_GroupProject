from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model('model/student_persistence_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Receive JSON data from the frontend
    print(f"Received data: {data}")  # Log for debugging

    # Process the input data
    input_data = np.array(data['input']).reshape(1, -1)
    prediction = model.predict(input_data)[0][0]

    # Return the prediction as a JSON response
    return jsonify({'prediction': int(prediction > 0.5)})

if __name__ == '__main__':
    app.run(debug=True)
