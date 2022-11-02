import { render, screen } from "@testing-library/react";

import { company } from "../testUtils";
import { MemoryRouter } from "react-router-dom";

import CompanyCard from "./CompanyCard";

describe("Tests Company Card", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard
          handle={company.handle}
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates card correctly", function () {
    render(
      <MemoryRouter>
        <CompanyCard
          handle={company.handle}
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.description)).toBeInTheDocument();
    const img = screen.getByAltText(/company-logo/i) as HTMLImageElement;
    expect(img).toHaveAttribute("src");
    expect(img.src).toContain("/logos/logo3.png");
  });
});
