// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { NavLink } from 'react-router-dom'

export function AppHeader() {


    return (
        <header className="app-header full">
            <h1 className='logo'>Toys & Joys</h1>
            <nav className='nav-bar'>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
            </nav>

        </header>
    )
}

