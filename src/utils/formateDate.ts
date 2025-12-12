// utils/formatDate.ts

export const formatDateTime = (isoDate: string | Date): string => {
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
