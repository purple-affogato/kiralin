import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import WorkplaceCulture from "./WorkplaceCulture";
import ERGSection from "./ERGSection";
import FMSection from "./FMSection";

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
            <WorkplaceCulture y={company.wc1_y} n={company.wc1_n} pos={company.wc2_pos} neg={company.wc2_neg} id={companyID} />
            <ERGSection y={company.erg_y} n={company.erg_n} id={companyID} />
            <FMSection y1={company.fm1_y} n1={company.fm1_n} y2={company.fm2_y} n2={company.fm2_n} id={companyID} />

            <h2>Diversity Policies</h2>
            <p>{company.dp1 ? "There are diversity policies being implemented at this company." : "There are no diversity policies being implemented at this company."}</p>
            <p>{company.dp2}</p>
            <h2>Representation in Leadership</h2>
            <p>{company.rep_w} out of {company.rep_t} of this company's executive leadership are women or nonbinary people.</p>
        </div>
        
    );
}