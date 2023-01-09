
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadToy, saveToy } from "../store/toy.action.js"
import { useDispatch, useSelector } from "react-redux"
import { SET_TOY } from '../store/toy.reducer.js'


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    let { toy } = useSelector((storeState) => storeState.toyModule)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy(toyId)
    }, [])

    // function loadToy() {
    //     toyService.getById(toyId)
    //         .then(setToyToEdit)
    //         .catch((err) => {
    //             console.log('Had issues in toy details', err)
    //             navigate('/toy')
    //         })
    // }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        // setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        toy = { ...toy, [field]: value }
        console.log(toy);
        dispatch({ type: SET_TOY, toy })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        dispatch({ type: SET_TOY, toy })
        saveToy(toy)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toy._id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toy.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toy.price}
                onChange={handleChange}
            />

            <div>
                <button>{toy._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}