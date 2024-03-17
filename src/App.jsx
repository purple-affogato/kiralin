import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Template from "./Template.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Homepage from "./Homepage.jsx";
import Companies from "./Companies.jsx";
import './index.css'
import CompanyPage from "./CompanyPage.jsx";

function App() {
  return (
      <div style={{height: '100%', display: "block",}}>
        <Routes>
              <Route path="/" element={<Template />} errorElement={<ErrorPage/>}>
                <Route index element={<Homepage/>}/>
                <Route path="companies" element={<Companies/>} />
                <Route path="companies/:companyID" element={<CompanyPage/>}/>
              </Route>
        </Routes>
      </div>
    );
}

export default App
