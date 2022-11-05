import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("Tests search Bar", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(<SearchBar handleSearch={jest.fn} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("adds word and calls submit func", () => {
    const handleSearch = jest.fn();
    render(<SearchBar handleSearch={handleSearch} />);
    const form = screen.queryByTestId("search-bar-form") as Element;
    const input = screen.queryByTestId("search-bar-input") as Element;
    const button = screen.queryByTestId("search-bar-button") as Element;
    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "form submit" } });
    expect(input).toHaveValue("form submit");
    fireEvent.submit(form);
    expect(handleSearch).toHaveBeenCalledWith("form submit");

    fireEvent.change(input, { target: { value: "button click" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("button click");

    fireEvent.change(input, { target: { value: "enter key" } });

    fireEvent.submit(form, { key: "Enter", charCode: 13 });

    expect(handleSearch).toHaveBeenCalledWith("enter key");
  });
});
