import React from "react";

function Homepage(){
    return(
        <div className="SiteBody">
            <h1>What is Kiralin</h1>
            <p>Kiralin is a site that allows users to assess how open and inclusive different companies are to women and nonbinary people. 
                This is a submission for the Women in STEM Hackathon hosted by The STEAM Boat. The goal of this site is to make it easier
                for women and nonbinary people working in STEM to navigate industries where they're a minority. You can get started by
                clicking the "Companies" tab in the header!</p>
            <h1>How does Kiralin work</h1>
            <p>Using a combination of our own research and user polls, Kiralin offers users a wide range of data to help them 
                figure out which companies would be them as a women or nonbinary person. The research team (which is actually just one 
                person right now) provides a score from 1 to 5 and a short explanation on each company's diversity policies and 
                representation in leadership. Users can share their experiences by answering Yes or No polls and leaving comments about 
                their experiences working at certain companies. All user data is kept anonymous and the site doesn't require an
                account to use. </p>
        </div>
    );
}

export default Homepage;