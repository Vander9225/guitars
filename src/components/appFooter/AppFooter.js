import React from "react";
import gitHubMark from '../../images/github-mark.png';
import telephone from '../../images/molumen_phone_icon.png';
import email from '../../images/email.svg';
import telegram from '../../images/Telegram_logo.svg.webp';
import '../appFooter/appFooter.css';


const AppFooter = () =>{
    

    return (
        <div className="footer">
            <a className="social" href="https://github.com/Vander9225/guitars"><img src={gitHubMark}/></a>
            <a className="social" href="tel:+380995317209"><img src={telephone}/></a>
            <a className="social" href="mailto: vanserkons@gmail.com"><img src={email}/></a>
            <a className="social" href="https://t.me/+380995317209"><img src={telegram}/></a>        
        </div>
    )
}
export default AppFooter;