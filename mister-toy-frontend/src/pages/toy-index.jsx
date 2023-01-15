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
    const user = useSelector(storeState => storeState.userModule.user)

    // console.log(toys);
    useEffect(() => {
        onLoadToys()
    }, [])

    async function onLoadToys(filterBy) {
        try {
            await loadToys(filterBy)
        }
        catch (err) {
            showErrorMsg('Cannot load toys')
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        try {
            const toyToSave = toyService.getRandomToy()
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (name: ${savedToy.name})`)
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        try {
            const price = +prompt('New price?')
            const toyToSave = { ...toy, price }
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }


    function setFilter(filterBy) {
        onLoadToys(filterBy)
    }

    return <section className='toy-main-index'>
        <div className="first-row">
            <h3>Toys & Joys shop</h3>
            {(user?.isAdmin) && <div className="add-btns">
                <button className='btn' onClick={onAddToy}>Add random Toy ⛐</button>
                <NavLink className='btn' to={`/toy/edit`}>Add toy!</NavLink>
            </div>
            }        </div>

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


