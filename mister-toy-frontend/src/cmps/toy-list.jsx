import { ToyPreview } from "./toy-preview.jsx"
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const user = useSelector(storeState => storeState.userModule.user)

    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <NavLink className={'details'} to={`/toy/${toy._id}`}>More deatails</NavLink>
                <hr />
                {(user?.isAdmin) && <div className="flex edit">
                    <div className="trash" onClick={() => { onRemoveToy(toy._id) }}> </div>                    |
                    <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
                </div>
                }
            </li>)}
    </ul>
}


