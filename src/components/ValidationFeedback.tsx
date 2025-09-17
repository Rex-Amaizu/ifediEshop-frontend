import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ValidationError } from "@/types";

export default function ValidationFeedback() {
  const errors = useSelector((state: RootState) => state.csv.errors);

  if (errors.length === 0) return null;

  return (
    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400">
      <h3>Validation Errors:</h3>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="text-red-600">
            {error.message}
          </li>
        ))}
      </ul>
      <p>Invalid rows are highlighted in the table.</p>
    </div>
  );
}
