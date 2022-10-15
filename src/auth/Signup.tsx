import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSignupUser, User } from '../interfaces';

interface SignupPropsInterface {
  handleSignup: (formData: User) =>  Promise<void>
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
  email: ""
};
function Signup({ handleSignup }: SignupPropsInterface)  {


  const [formData, setFormData] = useState<FormSignupUser>(initialState);
  const navigate = useNavigate();

  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement >) {
    const { name, value } = evt.target;
    setFormData(fData => ({
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
    <form onSubmit={handleSubmitSignup}>
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
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button>Signup</button>
    </form>

  );

}

export default Signup;