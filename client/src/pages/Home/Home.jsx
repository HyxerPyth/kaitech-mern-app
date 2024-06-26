import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Home.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";


function navigate(url){
    window.location.href = url 
}


async function auth(){
    const response = await fetch('http://127.0.0.1:8080/request', 
    {method: 'post'});
    const data = await response.json();
    navigate(data.url)
}


const Home = (props) => {

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try { 
                const res = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        },
                    });
                    console.log(res);
                }catch (err) {
                    console.log(err)
                }
            }});
    
    return (
        <div className={style.homeWrapper}>
            <div className={style.MainText}>
                <div className={style.ProjectTitle}>Stay With Me</div>
                <div className={style.ProjectDescription}> 
                    Create AI versions of real people. 
                </div> 
            
            <div className={style.MainButtonsContainer}>
                <div>
                    <button type="button" onClick={() => auth()} className={style.CreateButton} >
                        Create
                    </button>
                </div>
                <div>
                    <button className={style.LearnMoreButton} >
                        <a href="#test">Learn More </a>
                    </button>
                </div>
            </div>
            <div className={style.Test} id="test">
                hello
            </div>
            </div>
            
                {/* <div className={style.talkingCircleLink}>
                    <NavLink to="/talking-circle">
                        <button className={style.talkingCircleButton}>
                            Talk to people
                        </button>
                    </NavLink>
                </div> */}
                
                {/* <NavLink to="/signin">
                <button className={style.LoginButton}>
                    Sign In
                </button>
                </NavLink> */}
                {/* <NavLink to="/signup" className={style.SignupButtonLink}>
                    <button className={style.SignupButton}>
                        Sign Up
                    </button>
                </NavLink> */}

        {/* <div className={style.donateButton}> 
                <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="business" value="A3PQEFVJU37W4" />
                    <input type="hidden" name="no_recurring" value="0" />
                    <input type="hidden" name="item_name" value="Building a startup from scratch. Need help covering API costs to bring our vision to life." />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="./donate_paypal.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" className={style.donateimg} />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" />
                </form>
            </div> */}
        </div>
    );
}


export default Home;