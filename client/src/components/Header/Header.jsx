import React from "react"
import { NavLink } from 'react-router-dom'
import style from './Header.module.css'


const Header = () => {
    return (
        <div className={style.headerBlock}>
                <NavLink to={"/"} className={style.homeNavLink}>KaiTech</NavLink>
        </div>
    )
}


export default Header