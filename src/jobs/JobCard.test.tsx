import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { job } from "../testUtils";
import JobCard from "./JobCard";

describe("Tests Job Card", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <JobCard {...job} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates job correctly", function () {
    render(
      <MemoryRouter>
        <JobCard {...job} />
      </MemoryRouter>
    );
    expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    expect(screen.getByText(/110000/i)).toBeInTheDocument();
    expect(screen.getByText(/watson/i)).toBeInTheDocument();
  });
});
