import { NavLink } from "react-router-dom";
import { logo } from "../assets/img/logo.png";

export function ToyPreview({ toy }) {
    let imgUrl = `${toy.imgName}.png`
    if (!toy.imgName) imgUrl = 'toy.jpg'

    return (

        <article>
            <h4>{toy.name}</h4>
            <img src={require(`../assets/img/${imgUrl}`)} />
            <p>Price: <span>${toy.price}</span></p>
            <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
            <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
        </article>
    )
}