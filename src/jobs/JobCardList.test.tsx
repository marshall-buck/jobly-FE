import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { jobs } from "../testMockData";
import JobCardList from "./JobCardList";

describe("Tests Job Card", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <JobCardList jobs={jobs} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates jobs correctly", function () {
    render(
      <MemoryRouter>
        <JobCardList jobs={jobs} />
      </MemoryRouter>
    );
    expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    expect(screen.getByText(/110000/i)).toBeInTheDocument();
    expect(screen.getByText(/watson/i)).toBeInTheDocument();
  });
});
