import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY, SET_IS_LOADING, SET_TOY } from '../store/toy.reducer.js'

export async function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy)
        console.log('toys', toys)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// export function loadToys1(filterBy) {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//     return toyService.query(filterBy)
//         .then((toys) => {
//             store.dispatch({ type: SET_TOYS, toys })
//         })
//         .catch(err => {
//             console.log('Had issues loading toys', err)
//             throw err
//         })
//         .finally(() => {
//             store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//         })
// }

// Example for Optimistic mutation:
export async function removeToy(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_TOY })
        console.log('Had issues Removing toy', err)
        throw err
    }
}

// export function removeToy1(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     return toyService.remove(toyId)
//         .catch(err => {
//             store.dispatch({ type: UNDO_REMOVE_TOY })
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }

// export function removeToyNormal(toyId) {
//     return toyService.remove(toyId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_TOY, toyId })
//         })
//         .catch(err => {
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }

export async function saveToy(toy) {
    try {
        toy.price = +toy.price
        const type = (toy._id) ? UPDATE_TOY : ADD_TOY
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}

// export function saveToy1(toy) {
//     const type = (toy._id) ? UPDATE_TOY : ADD_TOY
//     return toyService.save(toy)
//         .then(savedToy => {
//             store.dispatch({ type, toy: savedToy })
//             return savedToy
//         })
//         .catch(err => {
//             console.error('Cannot save toy:', err)
//             throw err
//         })
// }

export async function loadToy(toyId) {
    try {
        const toy = await toyService.get(toyId)
        console.log('before dispatch', toy)
        store.dispatch({ type: SET_TOY, toy })
        return toy
    } catch (err) {
        console.log('Had issues loading toy', err)
        throw err
    }
}

// export function loadToy1(toyId) {
//     return toyService.get(toyId)
//         .then((toy) => {
//             console.log('before dispatch', toy)
//             store.dispatch({ type: SET_TOY, toy })
//             return toy
//         })
//         .catch(err => {
//             console.log('Had issues loading toy', err)
//             throw err
//         })
// }
