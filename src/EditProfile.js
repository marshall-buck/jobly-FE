import {Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import userContext from "./userContext";


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


function EditProfile({handleProfileEdit}){

  const { user } = useContext(userContext);
  const [formData, setFormData] = useState(null);

  //TODO: does !user cover everything needed
    if (!user) {
      return <Navigate to="/" />;
    } else {
      const {username, firstName, lastName, email} = user;
      setFormData({username, firstName, lastName, email});
    }



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
    handleProfileEdit(formData);
    // TODO: setFormData(initialState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value="change me later"
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