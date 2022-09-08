// import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from '../userContext';


/** EditProfile
*
* Props
* - handleProfileEdit
*
* State
* -formData {
  "username": "JohnDoe",
 "firstName": "John",
 "lastName": "Doe",
 "email" : "e@mail.com"
}
*
*
* App -> RoutesList => EditProfile
*/


function EditProfile({ handleEditForm }) {

  const { user } = useContext(userContext);
  // console.log(user);
  // const { username, firstName, lastName, email } = user;

  const [formData, setFormData] = useState(user);

  // setFormData({ username, firstName, lastName, email });


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
    await handleEditForm(formData);
    // TODO: setFormData(initialState);
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
        disabled
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
      <button>Save Changes</button>
    </form>

  );

}

export default EditProfile;