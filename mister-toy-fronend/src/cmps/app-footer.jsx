// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './user-msg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {

    const dispatch = useDispatch()

    // TODO: move to storeState



    return (
        <footer>
            <p>
                Coffeerights to all
            </p>
            <UserMsg />
        </footer>
    )
}
