import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringEntry, ClassificationEntry, ValidationError } from "@/types";

interface CsvState {
  sessionId: string | null;
  stringsData: StringEntry[];
  classificationsData: ClassificationEntry[];
  errors: ValidationError[];
  loading: boolean;
  showTables: boolean;
  validated: boolean;
}

const initialState: CsvState = {
  sessionId: null,
  stringsData: [],
  classificationsData: [],
  errors: [],
  loading: false,
  showTables: false,
  validated: false,
};

const csvSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setStringsData: (state, action: PayloadAction<StringEntry[]>) => {
      state.stringsData = action.payload;
    },
    setClassificationsData: (
      state,
      action: PayloadAction<ClassificationEntry[]>
    ) => {
      state.classificationsData = action.payload;
    },
    setErrors: (state, action: PayloadAction<ValidationError[]>) => {
      state.errors = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowTables: (state, action: PayloadAction<boolean>) => {
      state.showTables = action.payload;
    },
    setValidated: (state, action: PayloadAction<boolean>) => {
      state.validated = action.payload;
    },
  },
});

export const {
  setSessionId,
  setStringsData,
  setClassificationsData,
  setErrors,
  setLoading,
  setShowTables,
  setValidated,
} = csvSlice.actions;
export default csvSlice.reducer;
