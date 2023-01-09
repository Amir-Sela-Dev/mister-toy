import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const TOY_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getById
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&price=${filterBy.price}&inStock=${filterBy.inStock}&lables=${JSON.stringify(filterBy.lables)}`
    return httpService.get(BASE_URL + queryParams)
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}


function getRandomToy() {
    var toy = getEmptyToy()
    toy.price = utilService.getRandomIntInclusive(1000, 9000)
    toy.name = 'Toy-' + (Date.now() % 1000)
    return toy
}

function getEmptyToy(name = '', price = '') {
    var toy = {
        name,
        price,
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: '',
        inStock: true,
        imgName: name
    }
    return toy
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: '', lables: [] }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking doll', 300))
        toys.push(_createToy('Star wars', 120))
        toys.push(_createToy('Lego', 50))
        toys.push(_createToy('Boba', 150))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price = 250) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createdAt = Date.now()
    return toy
}