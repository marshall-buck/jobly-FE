import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("Test App", () => {
  let axiosMock: MockAdapter;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });
  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders w/out crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/sign up/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/login/i)).toHaveLength(4);
  });
});
