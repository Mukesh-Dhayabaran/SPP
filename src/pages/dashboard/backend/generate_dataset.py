# generate_dataset.py
import numpy as np
import pandas as pd
from pathlib import Path

outdir = Path("../data")
outdir.mkdir(parents=True, exist_ok=True)
n = 800
rng = np.random.default_rng(12345)

Hours_Studied_Per_Week = np.clip(rng.normal(12, 5, size=n), 0, 40).round(1)
Attendance = np.clip(rng.normal(82, 10, size=n), 40, 100).round(1)
Previous_Exam_Percent = np.clip(rng.normal(68, 14, size=n), 0, 100).round(1)
Failures = rng.choice([0,1,2,3], p=[0.72,0.18,0.07,0.03], size=n)

Sports = rng.choice(["Yes","No"], size=n, p=[0.42,0.58])
Tuition = rng.choice(["Yes","No"], size=n, p=[0.35,0.65])
Parents_Support = rng.choice(["Low","Medium","High"], size=n, p=[0.25,0.45,0.30])
Internet_Facility = rng.choice(["Yes","No"], size=n, p=[0.75,0.25])

noise = rng.normal(0,6,size=n)
Performance = (
    0.3*Previous_Exam_Percent +
    0.9*Hours_Studied_Per_Week +
    0.2*Attendance -
    6.0*Failures +
    3.0*(Sports=="Yes").astype(int) +
    2.5*(Tuition=="Yes").astype(int) +
    4.0*(Parents_Support=="High").astype(int) +
    2.0*(Parents_Support=="Medium").astype(int) +
    3.0*(Internet_Facility=="Yes").astype(int) +
    noise
)
Performance = np.clip(Performance, 0, 100).round(2)

df = pd.DataFrame({
    "Hours_Studied_Per_Week": Hours_Studied_Per_Week,
    "Attendance": Attendance,
    "Previous_Exam_Percent": Previous_Exam_Percent,
    "Failures": Failures,
    "Sports": Sports,
    "Tuition": Tuition,
    "Parents_Support": Parents_Support,
    "Internet_Facility": Internet_Facility,
    "Performance": Performance
})

out = outdir / "student_performance_dataset.csv"
df.to_csv(out, index=False)
print("Wrote dataset to:", out.resolve())
