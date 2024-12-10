import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split

# Load the dataset
df = pd.read_csv('../dataset/Student data.csv')  # Adjust path if needed

# Preprocess the data
le = LabelEncoder()
df['First Language'] = le.fit_transform(df['First Language'])
df['Funding'] = le.fit_transform(df['Funding'])
df['School'] = le.fit_transform(df['School'])

scaler = MinMaxScaler()
numeric_features = ['First Term Gpa', 'Second Term Gpa', 'High School Average Mark', 'Math Score']
df[numeric_features] = scaler.fit_transform(df[numeric_features])

X = df.drop('First Year Persistence Count', axis=1)
y = df['First Year Persistence Count']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.1)

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy}")

# Save the model
model.save('model/student_persistence_model.h5')  # Save in the 'backend/model/' folder
