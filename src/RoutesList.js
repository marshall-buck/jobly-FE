import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import CompaniesList from "./companies/CompaniesList";
import CompanyDetail from "./companies/CompanyDetail";
import JobsList from "./jobs/JobsList";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import EditProfile from "./auth/EditProfile";




/**
 * RouteList
 * App -> Routes (LandingPage,CompaniesList, CompanyDetail )
 *
 *  not found goes to Homepage
 */

function RoutesList({ handleSignup }) {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
      <Route path='/profile' element={<EditProfile />} />
      <Route path='/companies' element={<CompaniesList />} />
      <Route path='/companies/:handle' element={<CompanyDetail />} />
      <Route path='/jobs' element={<JobsList />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
