import { ToyPreview } from "./toy-preview.jsx"
import { NavLink } from "react-router-dom";


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <NavLink className={'details'} to={`/toy/${toy._id}`}>More deatails</NavLink>
                <hr />
                <div className="flex edit">
                    <div className="trash" onClick={() => { onRemoveToy(toy._id) }}> </div>                    |
                    <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
                </div>

            </li>)}
    </ul>
}


