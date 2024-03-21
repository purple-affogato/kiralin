import React, {useState} from "react";
import Popup from 'reactjs-popup';
import { supabase } from "./supabaseClient";

export default function ERGSection({y, n, id}){
    let percent = Math.round(y/(y+n+0.0) * 1000.0) / 10.0;
    
    const [option, setOption] = useState("");
    const [open, setOpen] = useState(false);

    function handleQ1Change(e) {
        setOption(e.target.value);
    }

    function handleSubmit(){
        if (option != ""){
            setOpen(false);
            updateQ1Data();
        }
        else{
            alert("Please complete the poll to submit!");
        }   
    }

    async function updateQ1Data(){
        if (option == "y") {
            const {error} = await supabase.from("companies").update({ erg_y: y+1}).eq('id', id);
        }
        else {
            const {error} = await supabase.from('companies').update({ erg_n: n+1}).eq('id', id);
        }
    }

    const closePopup = () => {
        setOpen(false);
        setOption("");
    }

    return(
        <>
            <h2>Employee Resource Groups (ERGs)</h2>
            <p> {y+n == 0 ? 
                "There is no data on ERGs for female and nonbinary employees at this company yet." 
                : percent+"% of people on Kiralin participated in ERGs for female or nonbinary employees at this company."}
            </p>

            <p>If you've worked at or are currently working at this company, click the button to quickly share your experience!</p>
            <button type="button" className="popup-button" onClick={() => {setOpen(!open)}} >Vote</button>
            <Popup open={open} modal nested closeOnDocumentClick onClose={closePopup}>
                <>
                    <h2>Vote here</h2>
                    <p>Have you ever participated in an ERG at this company for female or nonbinary employees?</p>
                    <label><input type="radio" name="q1" value={"y"} onChange={handleQ1Change}  />Yes</label>
                    <label><input type="radio" name="q1" value={"n"} onChange={handleQ1Change}  />No</label>
                    <hr/>
                    <button className="popup-button" onClick={handleSubmit}>Submit</button>
                </>
            </Popup>
        </>
    );
}