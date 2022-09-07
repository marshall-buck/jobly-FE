import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import CompaniesList from "./CompaniesList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";



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
      <Route path='/companies' element={<CompaniesList />} />
      <Route path='/companies/:handle' element={<CompanyDetail />} />
      <Route path='/jobs' element={<JobsList />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
