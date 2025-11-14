from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
import pandas as pd
import os

app = Flask(__name__)

# ✅ Allow requests from your Render frontend or local dev
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",  # for local development
    "https://studentperformanceprediction.vercel.app" 
]}})


# -------------------------------
# ✅ Load Trained Model
# -------------------------------
model = joblib.load("model.joblib")

FEATURE_ORDER = [
    "Hours_Studied_Per_Week",
    "Attendance",
    "Previous_Exam_Percent",
    "Failures",
    "Sports",
    "Tuition",
    "Parents_Support",
    "Internet_Facility"
]

support_map = {"Low": 0, "Medium": 1, "High": 2}
yes_no_map = {"Yes": 1, "No": 0}

# -------------------------------
# ✅ MongoDB Connection (via ENV)
# -------------------------------
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found in environment variables!")

client = MongoClient(MONGO_URI)
db = client["spp"]
students_col = db["students"]

# -------------------------------
# ✅ Routes
# -------------------------------

@app.route("/")
def home():
    return jsonify({"message": "✅ Flask app is running successfully!"})


# ✅ Store or update student info
@app.route("/store_student_info", methods=["POST"])
def store_student_info():
    try:
        data = request.get_json()
        name = data.get("name", "").strip() 
        register_number = data.get("registerNumber", "").strip()
        student_class = data.get("class", "").strip()
        section = data.get("section", "").strip()

        if not name or not register_number:
            return jsonify({"error": "Name and Register Number are required"}), 400

        students_col.update_one(
            {"Register_Number": register_number},
            {
                "$set": {
                    "Name": name,
                    "Register_Number": register_number,
                    "Class": student_class,
                    "Section": section,
                }
            },
            upsert=True
        )

        return jsonify({"message": "✅ Student information saved/updated successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Predict and optionally save
@app.route("/predict", methods=["POST"])
def predict_and_save():
    try:
        data = request.get_json()
        register_number = data.get("Roll_Number") or data.get("Register_Number")
        designation = data.get("designation", "student")  # teacher or student

        if not register_number:
            return jsonify({"error": "Register Number is required"}), 400

        # Prepare data for prediction
        row = {
            "Hours_Studied_Per_Week": float(data.get("Hours_Studied_Per_Week", 0)),
            "Attendance": float(data.get("Attendance", 0)),
            "Previous_Exam_Percent": float(data.get("Previous_Exam_Percent", 0)),
            "Failures": int(data.get("Failures", 0)),
            "Sports": yes_no_map.get(data.get("Sports", "No"), 0),
            "Tuition": yes_no_map.get(data.get("Tuition", "No"), 0),
            "Parents_Support": support_map.get(data.get("Parents_Support", "Medium"), 1),
            "Internet_Facility": yes_no_map.get(data.get("Internet_Facility", "No"), 0)
        }

        features = pd.DataFrame([row], columns=FEATURE_ORDER)
        predicted_score = round(float(model.predict(features)[0]), 2)

        if predicted_score >= 80:
            category = "High"
        elif predicted_score >= 50:
            category = "Medium"
        else:
            category = "Low"

        # ✅ Only save if user is a teacher
        if designation == "teacher":
            students_col.update_one(
                {"Register_Number": register_number},
                {
                    "$set": {
                        **row,
                        "Sports": "Yes" if row["Sports"] else "No",
                        "Tuition": "Yes" if row["Tuition"] else "No",
                        "Parents_Support": data.get("Parents_Support", "Medium"),
                        "Internet_Facility": "Yes" if row["Internet_Facility"] else "No",
                        "predicted_score": predicted_score,
                        "category": category,
                    }
                },
                upsert=True
            )

        return jsonify({
            "predicted_score": predicted_score,
            "category": category,
            "message": "✅ Prediction completed!" + (" Student data saved." if designation == "teacher" else "")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Fetch single student
@app.route("/get_student/<register_number>", methods=["GET"])
def get_student(register_number):
    try:
        student = students_col.find_one({"Register_Number": register_number}, {"_id": 0})
        if not student:
            return jsonify({"error": "Student not found"}), 404
        return jsonify(student)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Fetch all students
@app.route("/students", methods=["GET"])
def get_all_students():
    students = list(students_col.find({}, {"_id": 0}))
    return jsonify(students)


# -------------------------------
# ✅ Entry Point
# -------------------------------
if __name__ == "__main__":
    print("🚀 Flask server running at: http://0.0.0.0:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
