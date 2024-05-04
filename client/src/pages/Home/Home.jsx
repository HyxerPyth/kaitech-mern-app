import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Home.module.css';



const Home = (props) => {
    return (
        <div>
            <div>
                <h2 className={style.Title}>KaiTech</h2>
                <p className={style.Description}>you can use signup button to register you phone number</p>
                <p className={style.Description}>once you signed up, you will be able to call the Andrew Tate</p>
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