import React, { useState } from "react";
import gitHubLogo from '../../images/GitHub_Logo.png';
import gitHubMark from '../../images/github-mark.png';

import '../appFooter/appFooter.css';


const AppFooter = () =>{
    

    return (
        <div className="footer">
            <a className="social" href="https://github.com/Vander9225/guitars"><img src={gitHubMark}/><img src={gitHubLogo}/></a>
            <a className="social" href="tel:+380995317209">+38 099 531 72 09</a>
        </div>
    )
}
export default AppFooter;