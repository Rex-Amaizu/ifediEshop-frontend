import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

interface UploadFormProps {
  onUpload: (stringsFile: File, classificationsFile: File) => void;
  loading: boolean;
}

export default function UploadForm({ onUpload, loading }: UploadFormProps) {
  const stringsRef = useRef<HTMLInputElement>(null);
  const classificationsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stringsFile = stringsRef.current?.files?.[0];
    const classificationsFile = classificationsRef.current?.files?.[0];
    if (stringsFile && classificationsFile) {
      onUpload(stringsFile, classificationsFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>
          Strings CSV (Tier, Industry, Topic, Subtopic, Prefix, Fuzzing-Idx,
          Prompt, Risks, Keywords)
        </label>
        <input
          type="file"
          accept=".csv"
          ref={stringsRef}
          required
          className="block w-[200px] cursor-pointer mt-1 h-[40px] bg-[green] text-[white] rounded-lg"
        />
      </div>
      <div>
        <label>
          Classifications CSV (Topic, SubTopic, Industry, Classification)
        </label>
        <input
          type="file"
          accept=".csv"
          ref={classificationsRef}
          required
          className="block mt-1 rounded-lg bg-green-950 cursor-pointer w-[200px] h-[40px] text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        {loading ? "Uploading..." : "Upload CSVs"}
      </button>
    </form>
  );
}
