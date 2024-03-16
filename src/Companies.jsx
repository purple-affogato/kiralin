import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function Companies (){
    const [companies, setCompanies] = useState([]);
    const [searchInput, setSearchInput] = useState("")

    useEffect (() => {
        async function getCompanies(){
            const {data: companies} = await supabase.from('companies').select('companyname');
            if (companies.length > 1){
                setCompanies(companies);
                console.log(companies);
            } 
        }
        getCompanies();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };


    return(
        <div className="SiteBody">
            <form action="" method="GET">
                <input 
                type="text" 
                placeholder="Search company names here" 
                onChange={handleChange}
                value={searchInput}></input>
            </form>
            
            <ul>
                {companies.map(function(company) {
                    return(
                        <li key={company.companyname}>{company.companyname}</li>
                    ); 
                })}
            </ul>

        </div>
        
    );
}

export default Companies;