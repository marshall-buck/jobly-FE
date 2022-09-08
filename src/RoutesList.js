import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import CompaniesList from "./CompaniesList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
import Login from "./Login";
import Signup from "./Signup";
import EditProfile from "./EditProfile";




/**
 * RouteList
 * App -> Routes (LandingPage,CompaniesList, CompanyDetail )
 *
 *  not found goes to Homepage
 */

function RoutesList() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<EditProfile/>} />
      <Route path='/companies' element={<CompaniesList />} />
      <Route path='/companies/:handle' element={<CompanyDetail />} />
      <Route path='/jobs' element={<JobsList />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
