import { Routes, Route } from "react-router-dom";
import React from "react";
import Template from "./Template.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Homepage from "./Homepage.jsx";
import SearchCompanies from "./SearchCompanies.jsx";
import './index.css'

function App() {

  return (
      <div style={{height: '100%', display: "block",}}>
        <Routes>
              <Route path="/" element={<Template />} errorElement={<ErrorPage/>}>
                <Route index element={<Homepage/>}/>
                <Route path="companies" element={<SearchCompanies/>}/>
              </Route>
        </Routes>
      </div>
    );
}

export default App
