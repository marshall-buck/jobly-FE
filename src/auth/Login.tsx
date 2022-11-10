import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../common/Alert";
import useAlert from "../hooks/useAlert";

import { AlertTypes, FormLoginUser } from "../interfaces";

interface LoginPropsInterface {
  handleLogin: (formData: FormLoginUser) => Promise<void>;
}

/** Login
 *
 * Props
 * - handleLogin
 *
 * State
 * -formData { username: "", password: ""}
 *
 *
 * App -> RoutesList => Login
 */
const initialState: FormLoginUser = {
  username: "",
  password: "",
};

function Login({ handleLogin }: LoginPropsInterface) {
  const [formData, setFormData] = useState<FormLoginUser>(initialState);
  const { setAlert } = useAlert();

  const navigate = useNavigate();

  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handle submit login form and display proper message */
  async function handleLoginSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleLogin(formData);

      navigate("/companies");
    } catch (err: any) {
      setAlert(err, AlertTypes.ERROR);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        data-cy="login-form"
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleLoginSubmit}
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

          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
