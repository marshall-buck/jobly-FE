import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import UserContext from "./context/UserContext";
import { userCtx } from "./testMockData";
import { MemoryRouter } from "react-router-dom";

const LoggedInProviders = () => {
  return (
    <MemoryRouter>
      <UserContext.Provider
        value={{ user: userCtx.user, token: userCtx.token }}
      >
        {children}
      </UserContext.Provider>
    </MemoryRouter>
  );
};
