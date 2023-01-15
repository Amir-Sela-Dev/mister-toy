import { useNavigate } from "react-router-dom";
import { logo } from "../assets/img/logo.png";


export function ToyPreview({ toy }) {
    const navigate = useNavigate()


    let imgUrl = `${toy.imgName}.png`
    if (!toy.imgName) imgUrl = 'toy.jpg'

    return (

        <article>
            <h4 onClick={() => { navigate(`/toy/${toy._id}`) }}>{toy.name}</h4>
            <img onClick={() => { navigate(`/toy/${toy._id}`) }} src={require(`../assets/img/${imgUrl}`)} />
            <p onClick={() => { navigate(`/toy/${toy._id}`) }}><span>${toy.price}</span></p>
        </article>
    )
}