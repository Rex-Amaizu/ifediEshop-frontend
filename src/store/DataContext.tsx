"use client";
import {
  ClassificationEntry,
  ResponseState,
  SelectedRowType,
  StringEntry,
  ValidationError,
} from "@/types";
import React, { useState } from "react";

type DataContextObj = {
  loading: boolean;
  setLoading: (payload: boolean) => void;
  isEditLoading: boolean;
  setIsEditLoading: (payload: boolean) => void;
  sessionId: string | null;
  setSessionId: (payload: string | null) => void;
  stringsData: StringEntry[];
  setStringsData: (payload: StringEntry[]) => void;
  classificationsData: ClassificationEntry[];
  setClassificationsData: (payload: ClassificationEntry[]) => void;
  showTables: boolean;
  setShowTables: (payload: boolean) => void;
  showEditStringModal: boolean;
  setShowEditStringModal: (payload: boolean) => void;
  showEditClassificationModal: boolean;
  setShowEditClassificationModal: (payload: boolean) => void;
  showAddStringModal: boolean;
  setShowAddStringModal: (payload: boolean) => void;
  showAddClassificationModal: boolean;
  setShowAddClassificationModal: (payload: boolean) => void;
  validated: boolean;
  setValidated: (payload: boolean) => void;
  errors: ValidationError[];
  setErrors: (payload: ValidationError[]) => void;
  response: ResponseState;
  setResponse: React.Dispatch<React.SetStateAction<ResponseState>>;
  selectedRow: SelectedRowType;
  setSelectedRow: (row: SelectedRowType) => void;
  sessionData: string | null;
  setSessionData: (payload: string | null) => void;
  fetchStringsData: (id: string) => Promise<void>;
  fetchClassificationsData: (id: string) => Promise<void>;
};

type DataContextProviderProps = {
  children: React.ReactNode;
};

export const DataContext = React.createContext<DataContextObj>({
  loading: false,
  setLoading: () => {},
  isEditLoading: false,
  setIsEditLoading: () => {},
  sessionId: null,
  setSessionId: () => {},
  stringsData: [],
  setStringsData: () => {},
  classificationsData: [],
  setClassificationsData: () => {},
  showTables: false,
  setShowTables: () => {},
  showEditStringModal: false,
  setShowEditStringModal: () => {},
  showEditClassificationModal: false,
  setShowEditClassificationModal: () => {},
  showAddStringModal: false,
  setShowAddStringModal: () => {},
  showAddClassificationModal: false,
  setShowAddClassificationModal: () => {},
  validated: false,
  setValidated: () => {},
  errors: [],
  setErrors: () => {},
  response: { status: null, message: "" },
  setResponse: () => {},
  selectedRow: null,
  setSelectedRow: () => {},
  sessionData: null,
  setSessionData: () => {},
  fetchStringsData: async () => {},
  fetchClassificationsData: async () => {},
});

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [_id, set_Id] = useState<string | null>(null);
  const [stringsData, setStringsData] = useState<StringEntry[]>([]);
  const [classificationsData, setClassificationsData] = useState<
    ClassificationEntry[]
  >([]);
  const [showTables, setShowTables] = useState<boolean>(false);
  const [showEditStringModal, setShowEditStringModal] =
    useState<boolean>(false);
  const [showEditClassificationModal, setShowEditClassificationModal] =
    useState<boolean>(false);
  const [showAddStringModal, setShowAddStringModal] = useState<boolean>(false);
  const [showAddClassificationModal, setShowAddClassificationModal] =
    useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [response, setResponse] = useState<ResponseState>({
    status: null,
    message: "",
  });
  const [selectedRow, setSelectedRow] = useState<SelectedRowType>(null);
  const [sessionData, setSessionData] = useState<string | null>(null);

  const fetchStringsData = async (id: string | null) => {
    try {
      const res = await fetch(`http://localhost:3001/api/data/${id}/strings`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed: ${res.statusText}`);
      }
      const result = await res.json();
      console.log("Fetched strings:", result);
      setStringsData(result.map((r: StringEntry) => ({ ...r })));
    } catch (error: any) {
      console.error("Fetch strings error:", error);
      setResponse({
        status: "error",
        message: error.message || "Edit successful! Failed to fetch Data.",
      });
      setStringsData([]);

      setTimeout(() => {
        setResponse({ status: null, message: "" });
      }, 1500);
    }
  };

  const fetchClassificationsData = async (id: string | null) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/data/${id}/classifications`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed: ${res.statusText}`);
      }
      const result = await res.json();
      console.log("Fetched classifications:", result);
      console.log("same reference?", result === stringsData);
      setClassificationsData(
        result.map((r: ClassificationEntry) => ({ ...r }))
      );
      setShowTables(true);
    } catch (error: any) {
      console.error("Fetch classifications error:", error);
      setResponse({
        status: "error",
        message:
          error.message ||
          " Edit Successful! Failed to fetch ClassificationsData.",
      });
      setClassificationsData([]);
      setTimeout(() => {
        setResponse({ status: null, message: "" });
      }, 1500);
    }
  };

  const value: DataContextObj = {
    loading,
    setLoading,
    isEditLoading,
    setIsEditLoading,
    sessionId,
    setSessionId,
    stringsData,
    setStringsData,
    classificationsData,
    setClassificationsData,
    showTables,
    setShowTables,
    showEditStringModal,
    setShowEditStringModal,
    showEditClassificationModal,
    setShowEditClassificationModal,
    showAddStringModal,
    setShowAddStringModal,
    showAddClassificationModal,
    setShowAddClassificationModal,
    validated,
    setValidated,
    errors,
    setErrors,
    response,
    setResponse,
    selectedRow,
    setSelectedRow,
    sessionData,
    setSessionData,
    fetchStringsData,
    fetchClassificationsData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
