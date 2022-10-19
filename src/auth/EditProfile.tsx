// import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FormEditUser } from "../interfaces";


import UserContext from '../context/UserContext';



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

    <div className="flex flex-col items-center justify-center min-h-screen">
    <form
      className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
      onSubmit={handleSubmit}
    >
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
            className="input input-bordered"
          />
        </div>
        {/* <div className="form-control">
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
        </div> */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
  );

}

export default EditProfile;