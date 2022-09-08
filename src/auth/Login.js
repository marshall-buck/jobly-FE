import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const initialState = {
  username: "",
  password: ""
};

function Login({ handleLogin }) {

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await handleLogin(formData);
    setFormData(initialState);
    navigate("/companies");
  }

  return (
    <form onSubmit={handleSubmit}>
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