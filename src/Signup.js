import {useState} from 'react';
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

function Signup({handleSignup}){

  const initialState = { username: "",
  password: "",
  firstName: "" ,
  lastName: "",
  email :""
 }

  const [formData, setFormData] = useState(initialState);


  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSignup(formData);
    setFormData(initialState);
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