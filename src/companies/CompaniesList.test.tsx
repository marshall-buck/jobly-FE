import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import CompaniesList from "./CompaniesList";

describe("Tests Company Card", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
