import { Button } from "@mui/material";

export function Prediction({ result, onBack }) {
  console.log(result);  
  if (!result) return null;
  return (
    <div className="flex flex-col  m-10 mt-20 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-y-8">
        <div >
          <h1 className="bg-violet-900 font-bold text-3xl text-white p-6 rounded-tl-lg">
            Prediction Result
          </h1>

          <div className="text-6xl font-medium  text-center p-20   border-black border-r-2">
            {result.predicted_score} %
          </div>
          
        </div>
        <div>
          <h1 className="bg-violet-900 font-bold text-3xl text-white p-6 rounded-tr-lg">
            Category
          </h1>
          <div className="text-6xl font-medium  text-center p-20  ">
            {result.category}
          </div>
        </div>
        </div>
        <Button
          sx={{
            backgroundColor: "var(--color-violet-900)",
            fontSize: "25px",
            width: "full",
            padding: "20px ",
            textAlign: "center",
            color: "#fff",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--color-violet-500)",
            },
          }}
          onClick={onBack}
        >
          Back
        </Button>
    </div>
  );
}
