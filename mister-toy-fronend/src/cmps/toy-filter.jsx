
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.local.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="price">Price:</label>
            <input type="number"
                id="price"
                name="price"
                placeholder="By max price"
                value={filterByToEdit.price}
                onChange={handleChange}
            />

            <button hidden>Filter</button>
        </form>

    </section>
}