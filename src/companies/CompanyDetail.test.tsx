import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import CompanyDetail from "./CompanyDetail";

describe("Tests Company Card", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
