import { render, screen } from "@testing-library/react";
import RoutesList from "./RoutesList";
import UserContext from "../context/UserContext";
import { jobs, userCtx } from "../testMockData";
import { MemoryRouter } from "react-router-dom";
import JobCardList from "../jobs/JobCardList";

const badRoute = "/some/bad/route";
const companiesRoute = "/companies";
const loginRoute = "/login";
const profileRoute = "/profile";
const jobsRoute = "/jobs";

describe("Tests routes when user is logged in", () => {
  it("landing on a bad page user logged in", () => {
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it("renders home page user logged in", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/jest/i)).toBeInTheDocument();
  });

  it("renders edit profile route, when user logged in", () => {
    render(
      <MemoryRouter initialEntries={[profileRoute]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("edit-user-form")).toBeInTheDocument();
  });

  it("renders jobs route, when user logged in", () => {
    render(
      <MemoryRouter initialEntries={[jobsRoute]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
          {/* <JobsList /> */}
          <JobCardList jobs={jobs} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/equity/i).length).toEqual(3);
    expect(screen.getAllByText(/salary/i).length).toEqual(3);
    expect(screen.queryByText(/404/i)).not.toBeInTheDocument();
  });
  it("renders companies route, when user logged in", () => {
    render(
      <MemoryRouter initialEntries={[companiesRoute]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText(/404/i)).not.toBeInTheDocument();
  });

  it("renders companies detail, when user logged in", () => {
    render(
      <MemoryRouter initialEntries={[`${companiesRoute}/:handle`]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText(/404/i)).not.toBeInTheDocument();
  });
  // TODO: comment out when fixed
  // it("renders 404 detail, when user logged in and tries to sign up", () => {
  //   render(
  //     <MemoryRouter initialEntries={[`${companiesRoute}/:handle`]}>
  //       <UserContext.Provider
  //         value={{ user: userCtx.user, token: userCtx.token }}
  //       >
  //         <RoutesList
  //           handleSignup={jest.fn()}
  //           handleLogin={jest.fn()}
  //           handleEditForm={jest.fn()}
  //         />
  //       </UserContext.Provider>
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByText(/404/i)).toBeInTheDocument();
  // });
});

describe("Tests routes when user is logged out", () => {
  it("landing on a bad page when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it("renders home page when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it("renders login route when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={[loginRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("renders 404 route, when profile is manually entered into address bar when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={[profileRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("edit-user-form")).not.toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
  it("renders 404 route, when companies is manually entered into address bar when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={[companiesRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it("renders 404 route, when jobs is manually entered into address bar when user is logged out", () => {
    render(
      <MemoryRouter initialEntries={[jobsRoute]}>
        <RoutesList
          handleSignup={jest.fn()}
          handleLogin={jest.fn()}
          handleEditForm={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
