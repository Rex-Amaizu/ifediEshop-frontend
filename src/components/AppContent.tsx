"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setShowTables,
  setSessionId,
  setStringsData,
  setClassificationsData,
  setErrors,
  setValidated,
} from "@/store/csvSlice";
import { RootState } from "@/store/store";
import { StringEntry, ClassificationEntry } from "@/types";
import UploadForm from "@/components/UploadForm";
import EditableTable from "@/components/EditableTable";
import ValidationFeedback from "@/components/ValidationFeedback";

export default function AppContent() {
  const dispatch = useDispatch();
  const {
    sessionId,
    stringsData,
    classificationsData,
    errors,
    loading,
    showTables,
    validated,
  } = useSelector((state: RootState) => state.csv);

  const handleUpload = async (stringsFile: File, classificationsFile: File) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("strings", stringsFile);
      formData.append("classifications", classificationsFile);

      const res = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { sessionId: id, strings, classifications } = await res.json();
        dispatch(setSessionId(id));
        dispatch(setStringsData(strings));
        dispatch(setClassificationsData(classifications));
        dispatch(setShowTables(true));
        dispatch(setErrors([]));
        dispatch(setValidated(false));
      } else {
        const error = await res.json();
        alert(`Upload failed: ${error.message}`);
      }
    } catch (err) {
      alert("Upload error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSave = async () => {
    if (!sessionId) return;
    dispatch(setLoading(true));
    try {
      const res = await fetch(`/api/data/${sessionId}/save`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strings: stringsData,
          classifications: classificationsData,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        dispatch(setErrors([]));
        dispatch(setValidated(true));
        alert("Saved successfully!");
      } else {
        dispatch(setErrors(result.errors || []));
        const invalidRows = result.invalidRows || [];
        dispatch(
          setStringsData(
            stringsData.map((row) => ({
              ...row,
              _error: invalidRows.includes(row._id),
            }))
          )
        );
      }
    } catch (err) {
      alert("Save error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleExport = async () => {
    if (!sessionId || !validated) return;
    try {
      const stringsRes = await fetch(`/api/export/${sessionId}/strings`);
      const stringsBlob = await stringsRes.blob();
      const stringsUrl = URL.createObjectURL(stringsBlob);
      const a1 = document.createElement("a");
      a1.href = stringsUrl;
      a1.download = "strings.csv";
      a1.click();

      const classRes = await fetch(`/api/export/${sessionId}/classifications`);
      const classBlob = await classRes.blob();
      const classUrl = URL.createObjectURL(classBlob);
      const a2 = document.createElement("a");
      a2.href = classUrl;
      a2.download = "classifications.csv";
      a2.click();
    } catch (err) {
      alert("Export error");
    }
  };

  return (
    <main className="container mx-auto p-4 bg-amber-50">
      <h1 className="text-2xl font-bold mb-4">CSV Data Management</h1>
      {!showTables ? (
        <UploadForm onUpload={handleUpload} loading={loading} />
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg h-[40px] cursor-pointer"
            >
              Validate & Save
            </button>
            <button
              onClick={handleExport}
              disabled={!validated || loading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg h-[40px] cursor-pointer"
            >
              Export CSVs
            </button>
          </div>
          <ValidationFeedback />
          <div className="grid grid-rows-2 gap-1">
            <div>
              <h2>Strings CSV</h2>
              <EditableTable
                columns={[
                  "Tier",
                  "Industry",
                  "Topic",
                  "Subtopic",
                  "Prefix",
                  "Fuzzing-Idx",
                  "Prompt",
                  "Risks",
                  "Keywords",
                ]}
                sessionId={sessionId!}
                type="strings"
              />
            </div>
            <div>
              <h2>Classifications CSV</h2>
              <EditableTable
                columns={["Topic", "SubTopic", "Industry", "Classification"]}
                sessionId={sessionId!}
                type="classifications"
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
