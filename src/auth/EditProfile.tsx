// import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FormEditUser } from "../interfaces";


import UserContext from '../UserContext';



interface EditProfileInterfaceProps {
  handleEditForm: (formData: FormEditUser) => Promise<void>
}

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


function EditProfile({ handleEditForm }: EditProfileInterfaceProps) {

  const { user } = useContext(UserContext);


  const [formData, setFormData] = useState<FormEditUser>(user as FormEditUser)

  // setFormData({ username, firstName, lastName, email });


  /** Update local state w/curr state of input elem */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) : void{
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await handleEditForm(formData);
    // setFormData(() => user);
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