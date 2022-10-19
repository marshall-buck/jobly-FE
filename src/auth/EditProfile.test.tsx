import { fireEvent, render, screen, configure } from "@testing-library/react";
import EditProfile from "./EditProfile";
import { editUser, userCtx } from "../testUtils";
import UserContext from "../context/UserContext";
import {} from "../testUtils";
import { MemoryRouter } from "react-router-dom";

configure({ testIdAttribute: "data-cy" });

const editUserMock = jest.fn((cb) => cb(userCtx));

describe("Tests EditProfile", () => {
  it("matches snapshot", function () {
    const { asFragment, debug } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <EditProfile handleEditForm={editUserMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

//   const handleSearch = jest.fn()
// render(<SearchBar handleSearch={handleSearch} />);
//     const form = screen.queryByTestId('search-bar-form') as Element
//     const input = screen.queryByTestId('search-bar-input') as Element
//     const button = screen.queryByTestId('search-bar-button')  as Element
//     fireEvent.change(input, {target: {value: ''}})
//     expect(input).toHaveValue("")

//     fireEvent.change(input, {target: {value: 'form submit'}})
//     expect(input).toHaveValue("form submit")
//     fireEvent.submit(form)
//     expect(handleSearch).toHaveBeenCalledWith("form submit")

//     fireEvent.change(input, {target: {value: 'button click'}})
//     fireEvent.click(button)

//     expect(handleSearch).toHaveBeenCalledWith("button click")

//     fireEvent.change(input, {target: {value: 'enter key'}})

//     fireEvent.submit(form, { key: 'Enter', charCode: 13 });

//     expect(handleSearch).toHaveBeenCalledWith("enter key")
