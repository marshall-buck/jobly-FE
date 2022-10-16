import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLoginUser } from "../interfaces";

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
    await handleLogin(formData);
    setFormData(initialState);
    navigate("/companies");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleLoginSubmit}
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
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
            <label className="label">
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
