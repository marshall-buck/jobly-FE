import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTypes, FormSignupUser, User } from "../interfaces";
import AlertPopup from "../common/Alert";
import useAlert from "../hooks/useAlert";

interface SignupPropsInterface {
  handleSignup: (formData: User) => Promise<void>;
}

/** Signup
*
* Props
* - handleSignup
*
* State
* -formData { "username": "JohnDoe",
 "password": "password",
 "firstName": "John",
 "lastName": "Doe",
 "email" : "e@mail.com"
}
*
*
* App -> RoutesList => Signup
*/

const initialState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};
function Signup({ handleSignup }: SignupPropsInterface) {
  const [formData, setFormData] = useState<FormSignupUser>(initialState);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handle submit signup form and display proper message */
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleSignup(formData);
      setFormData(initialState);
      navigate("/companies");
      setAlert("Congrats", AlertTypes.SUCCESS);
    } catch (err: any) {
      setAlert(err, AlertTypes.ERROR);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleSubmit}
        data-cy="signup-form"
      >
        <AlertPopup />
        <div className="card-body">
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="lastName">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
