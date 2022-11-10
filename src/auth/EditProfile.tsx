import { useContext, useState } from "react";
import { FormEditUser, AlertTypes } from "../interfaces";
import AlertPopup from "../common/Alert";
import UserContext from "../context/UserContext";
import useAlert from "../hooks/useAlert";

interface EditProfileInterfaceProps {
  handleEditForm: (formData: FormEditUser) => Promise<void>;
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
  const [formData, setFormData] = useState<FormEditUser>(user as FormEditUser);
  const { setAlert } = useAlert();

  /** Update local state w/curr state of input elem */
  function handleChange(
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handle submit edit form and display proper message */
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleEditForm(formData);
      setFormData(user as FormEditUser);
      setAlert("Edit Success", AlertTypes.SUCCESS);
    } catch (err: any) {
      setAlert(err, AlertTypes.ERROR);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        data-cy="edit-user-form"
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={handleSubmit}
      >
        <AlertPopup />
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
              disabled
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="firstName">
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
            <label className="label" htmlFor="lastName">
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
            <label className="label" htmlFor="email">
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
            <button data-cy="edit-button" className="btn btn-primary">
              Submit Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
