import React, {useState} from "react";
import Popup from 'reactjs-popup';
import { supabase } from "./supabaseClient";

export default function WorkplaceCulture({y, n, pos, neg, id}){
    let percent1 = Math.round(y/(y+n+0.0) * 1000.0) / 10.0;
    let percent2 = Math.round(pos/(pos+neg+0.0) * 1000.0) / 10.0;
    
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
        if (option1 != "" && option2 != ""){
            //update database & use cookies
            setOpen(false);
            updateQ1Data();
            updateQ2Data();
        }
        else{
            alert("Please complete every poll to submit!");
        }   
    }

    async function updateQ1Data(){
        if (option1 == "y") {
            const {error} = await supabase.from("companies").update({ wc1_y: y+1}).eq('id', id);
        }
        else {
            const {error} = await supabase.from('companies').update({ wc1_n: n+1}).eq('id', id);
        }
    }

    async function updateQ2Data() {
        if (option2 == "pos") {
            const {error} = await supabase.from('companies').update({ wc2_pos: pos+1}).eq('id', id);
        } else{
            const {error} = await supabase.from('companies').update({ wc2_neg: neg+1}).eq('id', id);
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
            <button type="button" className="popup-button" onClick={() => {setOpen(!open)}} >Vote</button>
            <Popup open={open} modal nested closeOnDocumentClick onClose={closePopup}>
                <>
                    <h2>Vote here</h2>
                    <p>Do you, as a women or nonbinary person, feel welcome at this company's workplace?</p>
                    <label><input type="radio" name="q1" value={"y"} onChange={handleQ1Change}  />Yes</label>
                    <label><input type="radio" name="q1" value={"n"} onChange={handleQ1Change}  />No</label>
                    <br/>
                    <p>Is this company's workplace culture positive or negative?</p>
                    <label><input type="radio" name="q2" value={"pos"} onChange={handleQ2Change}  />Positive</label>
                    <label><input type="radio" name="q2" value={"neg"} onChange={handleQ2Change}  />Negative</label>
                    <hr/>
                    <button className="popup-button" onClick={handleSubmit}>Submit</button>
                </>
            </Popup>
        </>
    );
}