import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormSignupUser, User } from "../interfaces";

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
// TODO: if user is loggedin, redirect to error page your are already logged in
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

  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmitSignup(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await handleSignup(formData);
    setFormData(initialState);
    navigate("/companies");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleSubmitSignup}
        data-cy="signup-form"
      >
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
