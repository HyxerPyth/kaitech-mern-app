import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Home.module.css';



const Home = (props) => {
    return (
        <div>
            <div className={style.Text}>
                <h2 className={style.Title}>KaiTech</h2>
                <p className={style.Description}>you can use the signup button to register you phone number</p>
                <p className={style.Description}>once you signed up, you will be able to call Andrew Tate</p>
            </div>
            <div className={style.donateButton}> 
                <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="business" value="A3PQEFVJU37W4" />
                    <input type="hidden" name="no_recurring" value="0" />
                    <input type="hidden" name="item_name" value="Building a startup from scratch. Need help covering API costs to bring our vision to life." />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>
           <div className={style.Container}>
                <NavLink to="/signin">
                    <button className={style.LoginButton}>
                        Sign In
                    </button>
                </NavLink>
                <NavLink to="/signup">
                    <button className={style.SignupButton}>
                        Sign Up
                    </button>
                </NavLink>
           </div>
        </div>
    );
}


export default Home;