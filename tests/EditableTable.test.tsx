import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import EditableTable from "../src/components/EditableTable";
import { StringEntry } from "../src/types";

describe("EditableTable", () => {
  const mockData: StringEntry[] = [
    {
      Tier: "1",
      Industry: "Tech",
      Topic: "AI",
      Subtopic: "ML",
      Prefix: "Pre",
      "Fuzzing-Idx": "1",
      Prompt: "Test",
      Risks: "Low",
      Keywords: "key",
    },
  ];

  it("renders table with editable cells", () => {
    render(
      <Provider store={store}>
        <EditableTable
          columns={["Tier", "Industry"]}
          sessionId="test"
          type="strings"
        />
      </Provider>
    );
    expect(screen.getByText("Tier")).toBeInTheDocument();
    // Note: Testing state updates requires mocking store or dispatching actions
  });

  it("adds a row", () => {
    render(
      <Provider store={store}>
        <EditableTable columns={["Tier"]} sessionId="test" type="strings" />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Row"));
    // Requires store mock to verify state change
  });

  it("deletes a row", () => {
    const { container } = render(
      <Provider store={store}>
        <EditableTable columns={["Tier"]} sessionId="test" type="strings" />
      </Provider>
    );
    const deleteBtn = container.querySelector("button") as HTMLButtonElement;
    fireEvent.click(deleteBtn);
    // Requires store mock to verify state change
  });
});
