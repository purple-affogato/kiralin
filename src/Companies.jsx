import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

function Companies (){
    const [companies, setCompanies] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState([]);

    useEffect (() => {
        async function getCompanies(){
            const {data: companies} = await supabase.from('companies').select('id, companyname, industry');
            if (companies.length > 1){
                setCompanies(companies);
                setResults(companies);
            }
        }
        getCompanies();
    }, []);


    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        if (e.target.value.length == 0){
            setResults(companies);
        }
        else{
            search(e.target.value);
        }
        
    }

    async function search(str) {
        const {data, error} = await supabase.from('companies').select('id, companyname, industry').ilike('companyname','%'+str+'%');
        // console.log(data);
        if (data.length > 0){
            setResults(data);
        }
    }

    return(
        <div className="SiteBody">
            <input 
            type="text" 
            id="search"
            name="search"
            placeholder="Search companies"
            onChange={handleChange}
            value={searchInput}
            className="searchBar"/>
            {results.map(function(company) {
                return(
                    <SearchEntry name={company.companyname} industry={company.industry} id={company.id} key={company.id} />
                ); 
            })}

        </div>
        
    );
}

function SearchEntry ({name, industry, id}){
    return(
        <div className="searchEntry">
            <Link to={id.toString()} style={{textDecoration: "none", color: "#400820"}}>
                <h2>{name}</h2>
                <p>Industry: {industry}</p>
            </Link>
        </div>
    );
}

export default Companies;