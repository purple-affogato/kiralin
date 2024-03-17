import React from "react";
import { useParams } from "react-router-dom";

export default function CompanyPage() {
    let {companyID} = useParams();
    return(
        <p>Company ID: {companyID}</p>
    );
}