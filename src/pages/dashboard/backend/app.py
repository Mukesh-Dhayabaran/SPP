# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import joblib, os
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# DATA_CSV = "../data/student_performance_dataset.csv"  # relative to backend/
# MODEL_FILE = "model.joblib"
# FEATURE_ORDER = ["Hours_Studied_Per_Week","Attendance","Previous_Exam_Percent","Failures",
#                  "Sports","Tuition","Parents_Support","Internet_Facility"]

# def train_if_needed():
#     global model
#     if os.path.exists(MODEL_FILE):
#         model = joblib.load(MODEL_FILE)
#         print("Loaded model from", MODEL_FILE)
#         return
#     # else train
#     print("Training model from CSV:", DATA_CSV)
#     df = pd.read_csv(DATA_CSV)
#     # encode
#     df["Sports"] = df["Sports"].map({"Yes":1,"No":0})
#     df["Tuition"] = df["Tuition"].map({"Yes":1,"No":0})
#     df["Internet_Facility"] = df["Internet_Facility"].map({"Yes":1,"No":0})
#     df["Parents_Support"] = df["Parents_Support"].map({"Low":0,"Medium":1,"High":2})
#     X = df[FEATURE_ORDER]
#     y = df["Performance"]
#     from sklearn.ensemble import RandomForestRegressor
#     m = RandomForestRegressor(n_estimators=200, random_state=42)
#     m.fit(X,y)
#     joblib.dump(m, MODEL_FILE)
#     model = m
#     print("Trained and saved model as", MODEL_FILE)

# train_if_needed()

# def preprocess_payload(payload):
#     # safe conversions and defaults
#     row = {}
#     row["Hours_Studied_Per_Week"] = float(payload.get("Hours_Studied_Per_Week", 0))
#     row["Attendance"] = float(payload.get("Attendance", 0))
#     row["Previous_Exam_Percent"] = float(payload.get("Previous_Exam_Percent", 0))
#     row["Failures"] = int(payload.get("Failures", 0))
#     for key in ["Sports","Tuition","Internet_Facility"]:
#         val = payload.get(key, "No")
#         if isinstance(val, bool):
#             val = "Yes" if val else "No"
#         row[key] = 1 if str(val).lower() in ("yes","1","true","y") else 0
#     ps = payload.get("Parents_Support", "Medium")
#     if ps not in ("Low","Medium","High"): ps = "Medium"
#     row["Parents_Support"] = {"Low":0,"Medium":1,"High":2}[ps]
#     return pd.DataFrame([row], columns=FEATURE_ORDER)

# @app.route("/predict", methods=["POST"])
# def predict():
#     payload = request.get_json(force=True)
#     X = preprocess_payload(payload)
#     y_pred = float(model.predict(X)[0])
#     category = "Poor" if y_pred < 50 else ("Average" if y_pred < 70 else ("Good" if y_pred < 85 else "Excellent"))
#     return jsonify({"predicted_score": round(y_pred,2), "category": category})

# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.joblib")

# Mapping categorical values
support_map = {"Low": 0, "Medium": 1, "High": 2}
yes_no_map = {"Yes": 1, "No": 0}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Extract inputs
        Hours_Studied_Per_Week = float(data.get("Hours_Studied_Per_Week", 0))
        Attendance = float(data.get("Attendance", 0))
        Previous_Exam_Percent = float(data.get("Previous_Exam_Percent", 0))
        Failures = int(data.get("Failures", 0))
        Sports = yes_no_map.get(data.get("Sports", "No"), 0)
        Tuition = yes_no_map.get(data.get("Tuition", "No"), 0)
        Parents_Support = support_map.get(data.get("Parents_Support", "Medium"), 1)
        Internet_Facility = yes_no_map.get(data.get("Internet_Facility", "No"), 0)

        # Build feature array
        features = np.array([[Hours_Studied_Per_Week, Attendance, Previous_Exam_Percent,
                              Failures, Sports, Tuition, Parents_Support, Internet_Facility]])

        # Predict
        predicted_score = model.predict(features)[0]
        predicted_score = round(float(predicted_score), 2)

        # Category mapping
        if predicted_score >= 80:
            category = "High"
        elif predicted_score >= 50:
            category = "Medium"
        else:
            category = "Low"

        return jsonify({
            "predicted_score": predicted_score,
            "category": category
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
