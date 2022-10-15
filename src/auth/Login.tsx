import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLoginUser } from '../interfaces';


interface LoginPropsInterface {
  handleLogin: (formData: FormLoginUser) => Promise<void>
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
  password: ""
};

function Login({ handleLogin }: LoginPropsInterface) {

  const [formData, setFormData] = useState<FormLoginUser>(initialState);
  const navigate = useNavigate();

  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement >) {
    const { name, value } = evt.target;
    setFormData(fData => ({
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
    <form onSubmit={handleLoginSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button>Login</button>
    </form>

  );

}

export default Login;