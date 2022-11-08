import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

import { AlertType, FormLoginUser } from "../interfaces";

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
  const [errors, setErrors] = useState<any[] | null>(null);
  const navigate = useNavigate();
  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleLoginSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleLogin(formData);
      navigate("/companies");
    } catch (err: any) {
      setErrors(err);
    }
  }

  function handleAlertDismiss() {
    setErrors(null);
    setFormData(initialState);
  }
  console.debug("from login: ", errors);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        data-cy="login-form"
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleLoginSubmit}
      >
        {errors && (
          <Alert
            onDismiss={handleAlertDismiss}
            type={AlertType.ERROR}
            isVisible={errors ? true : false}
            message={[...errors]}
          />
        )}

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
