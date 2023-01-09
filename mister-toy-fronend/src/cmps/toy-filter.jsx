
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { MultiSelect } from "react-multi-select-component"
import { logDOM } from "@testing-library/react"

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [selected, setSelected] = useState([]);

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        handleLableChange()
    }, [selected])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleLableChange() {
        console.log(selected);
        const lables = selected.map(lable => {
            return lable.value
        })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, lables: lables }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const options = [
        { label: "On wheels", value: "On wheels" },
        { label: "Box game", value: "Box game" },
        { label: "Art", value: "Art", },
        { label: "Baby", value: "Baby", },
        { label: "Doll", value: "Doll", },
        { label: "Puzzle", value: "Puzzle", },
        { label: "Outdoor", value: "Outdoor", },
        { label: "Battery Powered", value: "Battery Powered", },
    ];





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

            <select
                className="inStock"
                name='inStock'
                value={filterByToEdit.inStock}
                onChange={handleChange}
            >
                <option value=''>All</option>
                <option value={true}>In stock</option>
                <option value={false}>Out of stock</option>
            </select>
            <div>
                <h1>Select lables</h1>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>




            <button hidden>Filter</button>
        </form>

    </section>
}