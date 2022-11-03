import { render, screen, renderHook } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { jobs } from "../testUtils";
import JobsList from "./JobsList";

describe("Tests Job Card", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
