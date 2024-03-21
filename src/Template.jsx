import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import logo from "./icons/logo512.png"

function Template () {

    return (
        <div style={{height: '100%', display: "block",}}>
            <Header />
            <Outlet />
            <footer>
                <p>Kiralin by purple-affogato</p>
                <p>Submission for Women in STEM Hackathon (2024).</p>
            </footer>
        </div>
    );
}

function Header (){
    return (
        <header className="Header">
            <Link to="/">
                <img src={logo} alt="logo" className="HeaderLogo" />
            </Link>
            
            <button type="button" className="HeaderItem">
                <Link to="companies" className="HeaderLink">Companies</Link>
            </button>
        </header>
    );
}


export default Template;