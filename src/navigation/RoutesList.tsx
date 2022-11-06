import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../LandingPage";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import EditProfile from "../auth/EditProfile";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { FormEditUser, FormLoginUser, FormSignupUser } from "../interfaces";
import Error404Page from "../common/Error404Page";

interface RoutesListPropsInterface {
  handleSignup: (formData: FormSignupUser) => Promise<void>;
  handleLogin: (formData: FormLoginUser) => Promise<void>;
  handleEditForm: (formData: FormEditUser) => Promise<void>;
}

/**
 * RouteList
 * App -> Routes (LandingPage,CompaniesList, CompanyDetail )
 *
 *  not found goes to Homepage
 */

function RoutesList({
  handleSignup,
  handleLogin,
  handleEditForm,
}: RoutesListPropsInterface) {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup handleSignup={handleSignup} />}
          />
        </>
      )}
      <Route path="/" element={<LandingPage />} />
      {user && (
        <>
          <Route
            path="/profile"
            element={<EditProfile handleEditForm={handleEditForm} />}
          />
          <Route path="/companies" element={<CompaniesList />} />

          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobsList />} />
        </>
      )}

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RoutesList;
