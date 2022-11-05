import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";

describe("Tests CompanyDetail", () => {
  it("matches CompanyDetail snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("render CompanyDetail", async () => {
    render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );

    await screen.findAllByTestId("company-detail");
    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();
  });
});
