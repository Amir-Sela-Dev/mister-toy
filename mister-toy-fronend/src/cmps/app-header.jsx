// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { NavLink } from 'react-router-dom'
import { SET_USER } from '../store/user.reducer.js'
import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'



export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))


    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }


    return (
        <header className="app-header full">
            <h1 className='logo'>Toys & Joys</h1>
            <nav className='nav-bar'>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
            </nav>

            {/* {user && <section className="user-info">
                <p>{user.fullname} </p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>} */}


        </header>
    )
}

