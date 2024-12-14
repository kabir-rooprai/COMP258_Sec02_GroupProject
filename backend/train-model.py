import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.preprocessing import LabelEncoder, MinMaxScaler, StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np

# Load the dataset
df = pd.read_csv('../dataset/Student data.csv', skiprows=24, header=None) 

columns = [
    "First_Term_GPA", "Second_Term_GPA", "First_Language", "Funding", "School",
    "FastTrack", "Coop", "Residency", "Gender", "Previous_Education", "Age_Group",
    "High_School_Avg", "Math_Score", "English_Grade", "First_Year_Persistence"
]

# Assign the columns to the dataset
df.columns = columns

# Replace '?' with NaN for handling missing values
df.replace('?', np.nan, inplace=True)

# Convert columns to appropriate numeric types where necessary
for column in df.columns:
    if column != "First_Year_Persistence":
        df[column] = pd.to_numeric(df[column], errors='coerce')

# Check for missing values in the dataset
missing_values = df.isnull().sum()

# Add missing values
numeric_columns = [
    "First_Term_GPA", "Second_Term_GPA", "High_School_Avg", 
    "Math_Score", "English_Grade"
]
# Numeric columns: Impute missing values with the column mean
for column in numeric_columns:
    df[column].fillna(df[column].mean(), inplace=True)


categorical_columns = ["First_Language", "Previous_Education", "Age_Group"]

# Categorical columns: Impute missing values with the mode
for column in categorical_columns:
    df[column].fillna(df[column].mode()[0], inplace=True)

# Define features (X) and target variable (y)
X = df.drop(columns=["First_Year_Persistence"])
y = df["First_Year_Persistence"]

# Perform train-test split (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Standardize numerical features using StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Label encode the data
categorical_columns = [
    "First_Language", "Funding", "School", "FastTrack", "Coop",
    "Residency", "Gender", "Previous_Education", "Age_Group"
]

# Apply label encoding to categorical columns
label_encoders = {}
for column in categorical_columns:
    le = LabelEncoder()
    X[column] = le.fit_transform(X[column])
    label_encoders[column] = le  # Store the encoder

# Build the model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Define early stopping to prevent overfitting
early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

# Train the model
history = model.fit(
    X_train_scaled, y_train,
    validation_split=0.2,
    epochs=100,
    batch_size=32,
    callbacks=[early_stopping],
    verbose=1
)

# Evaluate the model on the test set
test_loss, test_accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)

# Save the model
model.save('model/student_persistence_model.h5')  # Save in the 'backend/model/' folder
