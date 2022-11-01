import { fireEvent, render, screen, configure } from "@testing-library/react";
import RoutesList from "./RoutesList";

import { MemoryRouter } from "react-router-dom";

configure({ testIdAttribute: "data-cy" });

describe("Tests routes", () => {
  test("landing on a bad page", () => {
    const badRoute = "/some/bad/route";

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/login/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });
});
