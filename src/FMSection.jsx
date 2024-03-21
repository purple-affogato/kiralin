import React, {useState} from "react";
import Popup from 'reactjs-popup';
import { supabase } from "./supabaseClient";

export default function FMSection({y1, n1, y2, n2, id}){
    let percent1 = Math.round(y1/(y1+n1+0.0) * 1000.0) / 10.0;
    let percent2 = Math.round(y2/(y2+n2+0.0) * 1000.0) / 10.0;
    
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [open, setOpen] = useState(false);

    function handleQ1Change(e) {
        setOption1(e.target.value);
    }

    function handleQ2Change(e) {
        setOption2(e.target.value);
    }

    function handleSubmit(){
        if (option1 == "y" && option2 != ""){
            setOpen(false);
            updateQ1Data();
            updateQ2Data();
        }
        else if (option1 == "n"){
            setOpen(false);
            updateQ1Data();
        }
        else{
            alert("Please complete every poll to submit!");
        }   
    }

    async function updateQ1Data(){
        if (option1 == "y") {
            const {error} = await supabase.from("companies").update({ fm1_y: y1+1}).eq('id', id);
        }
        else {
            const {error} = await supabase.from('companies').update({ fm1_n: n1+1}).eq('id', id);
        }
    }

    async function updateQ2Data() {
        if (option2 == "pos") {
            const {error} = await supabase.from('companies').update({ fm2_y: y2+1}).eq('id', id);
        } else{
            const {error} = await supabase.from('companies').update({ fm2_n: n2+1}).eq('id', id);
            // console.log(error);
        }
    }

    const closePopup = () => {
        setOpen(false);
        setOption1("");
        setOption2("");
    }

    return(
        <>
            <h2>Feedback Mechanisms</h2>
            <p> {y1+n1 == 0 ? 
                "There is no data on how many employees sent feedback regarding inclusion of female and nonbinary employees." 
                : percent1+"% of people on Kiralin have sent feedback regarding inclusion of female and nonbinary employees."}
            </p>

            <p> {y2+n2 == 0 ? 
                "There is no data on whether or not this company implements feedback given regarding inclusion of female and nonbinary employees." 
                : percent2+"% of people on Kiralin who have sent feedback to this company have had it implemented."}
            </p>

            <p>If you've worked at or are currently working at this company, click the button to quickly share your experience!</p>
            <button type="button" className="popup-button" onClick={() => {setOpen(!open)}} >Vote</button>
            <Popup open={open} modal nested closeOnDocumentClick onClose={closePopup}>
                <>
                    <h2>Vote here</h2>
                    <p>Have you sent feedback regarding inclusion of women and nonbinary people at this company before?</p>
                    <label><input type="radio" name="q1" value={"y"} onChange={handleQ1Change}  />Yes</label>
                    <label><input type="radio" name="q1" value={"n"} onChange={handleQ1Change}  />No</label>
                    {option1 == "y" ? (<>
                        <br />
                        <p>Has your feedback been implemented at this company yet?</p>
                        <label><input type="radio" name="q2" value={"y"} onChange={handleQ2Change} />Yes</label>
                        <label><input type="radio" name="q2" value={"n"} onChange={handleQ2Change} />No</label></>) : <br/>
                    }
                    <hr/>
                    <button className="popup-button" onClick={handleSubmit}>Submit</button>
                </>
            </Popup>
        </>
    );
}