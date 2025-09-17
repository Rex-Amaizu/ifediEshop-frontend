import { StringEntry, ClassificationEntry } from "./index";

export interface UploadResponse {
  sessionId: string;
  strings: StringEntry[];
  classifications: ClassificationEntry[];
}
