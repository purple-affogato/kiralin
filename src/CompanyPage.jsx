import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Popup from 'reactjs-popup';

export default function CompanyPage() {
    let {companyID} = useParams();
    const [isValid, setValid] = useState(false);
    const [company, setCompany] = useState({});

    useEffect(() => {
        async function getCompanyInfo(){
            const {data, error} = await supabase.from("companies").select().eq('id', companyID).maybeSingle();
            if (data != null) {
                setCompany(data);
                setValid(true);
            }
        }
        getCompanyInfo();
    });

    if (isValid == false){
        return(
            <div className="SiteBody">
                <p>Company not found. Please go back to search page to view a valid company page. </p>
            </div>
        );
    }

    return(
        <div className="SiteBody">
            <h1>{company.companyname}</h1>
            <p>Industry: {company.industry}</p>
            {/* <p>Company ID: {companyID}</p> */}
            <WorkplaceCulture y={company.wc1_y} n={company.wc1_n} pos={company.wc2_pos} neg={company.wc2_neg} />
            <h2>Employee Resource Groups (ERGs)</h2>
            <h2>Feedback Mechanisms</h2>
            <h2>Diversity Policies</h2>
            <h2>Representation in Leadership</h2>
        </div>
        
    );
}

function WorkplaceCulture({y, n, pos, neg}){
    let percent1 = Math.round(y/(y+n+0.0) * 1000.0) / 10.0;
    let percent2 = Math.round(pos/(pos+neg+0.0) * 1000.0) / 10.0;
    
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");

    function handleQ1Change(e) {
        setOption1(e.target.value);
    }

    function handleQ2Change(e) {
        setOption2(e.target.value);
    }

    function handleSubmit(){
        if (option1 != "" && option2 != ""){
            //update database & use cookies
            close();
        }
        else{
            alert("Please complete every poll to submit!");
        }
        
    }

    return(
        <>
            <h2>Workplace Culture</h2>
            <p> {y+n == 0 ? 
                "There is no data on how welcome female and nonbinary employees feel at this workplace yet." 
                : percent1+"% of people on Kiralin felt welcome as a women or nonbinary person at this company."}
            </p>

            <p> {pos+neg == 0 ? 
                "There is no data on how many female and nonbinary employees believe this company's workplace culture is positive or negative yet." 
                : percent2+"% of people on Kiralin felt this company had a positive workplace culture."}
            </p>

            <p>If you've worked at or are currently working at this company, click the button to quickly share your experience!</p>
            <Popup trigger={
                <button className="popup-button">Vote</button>
            } modal nested >
                <>
                    <h2>Vote here</h2>
                    <p>Do you, as a women or nonbinary person, feel welcome at this company's workplace?</p>
                    <label><input type="radio" name="q1" value={"y"} onChange={handleQ1Change}  />Yes</label>
                    <label><input type="radio" name="q1" value={"n"} onChange={handleQ1Change}  />No</label>
                    <hr/>
                    <p>Is this company's workplace culture positive or negative?</p>
                    <label><input type="radio" name="q2" value={"y"} onChange={handleQ2Change}  />Positive</label>
                    <label><input type="radio" name="q2" value={"n"} onChange={handleQ2Change}  />Negative</label>
                    <button className="popup-button" onClick={handleSubmit}>Submit</button>
                </>
            </Popup>
        </>
    );
}