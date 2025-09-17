import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import Home from "../src/app/page";

describe("Home Page", () => {
  it("renders upload form initially", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText("Upload CSVs")).toBeInTheDocument();
  });
});
