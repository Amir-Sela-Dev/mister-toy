// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link } = ReactRouterDOM

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { NavLink } from 'react-router-dom'

export function ToyIndex() {
    const { toys } = useSelector((storeState) => storeState.toyModule)
    // console.log(toys);
    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                // showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (name: ${savedToy.name})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {

        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }


    function setFilter(filterBy) {
        onLoadToys(filterBy)
    }

    return <section className='toy-main-index'>
        <div className="first-row">
            <h3>Toys & Joys shop</h3>
            <div className="add-btns">
                <button className='btn' onClick={onAddToy}>Add random Toy ⛐</button>
                <NavLink className='btn' to={`/toy/edit`}>Add toy!</NavLink>
            </div>
        </div>

        <main>
            <ToyFilter onSetFilter={setFilter} />

            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
            />
        </main>
    </section>
}


