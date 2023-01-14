import React from 'react';

import { toyService } from "../services/toy.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { loadToy } from "../store/toy.action.js"
import { useDispatch, useSelector } from 'react-redux'

export function ToyDetails() {
    // const [toy, setToy] = useState(null)
    let { toy } = useSelector((storeState) => storeState.toyModule)

    const { toyId } = useParams()
    const navigate = useNavigate()

    let imgUrl = `${toy.imgName}.png`
    if (!toy.imgName) imgUrl = 'toy.jpg'


    useEffect(() => {
        loadToy(toyId)
    }, [])


    if (!toy) return <div>Loading...</div>

    const { name, price, _id } = toy

    return <section className="toy-details">
        <h1>Toy vendor : {name}</h1>
        <h3>Price: ${price}</h3>
        <img src={require(`../assets/img/${imgUrl}`)} />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link to={`/toy/edit/${_id}`}>Edit</Link>
    </section>
}