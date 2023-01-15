// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

// const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
// const TOY_KEY = 'toyDB'
// _createToys()

// export const toyService = {
//     query,
//     get,
//     remove,
//     save,
//     getEmptyToy,
//     getDefaultFilter,
//     getRandomToy,
//     getById
// }

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             if (filterBy.name) {
//                 const regex = new RegExp(filterBy.name, 'i')
//                 toys = toys.filter(toy => regex.test(toy.name))
//             }
//             if (filterBy.price) {
//                 toys = toys.filter(toy => toy.price >= filterBy.price)
//             }
//             return toys
//         })
// }

// function get(toyId) {
//     return storageService.get(TOY_KEY, toyId)

// }

// function remove(toyId) {
//     return storageService.remove(TOY_KEY, toyId)
// }

// function save(toy) {
//     if (toy._id) {
//         return storageService.put(TOY_KEY, toy)
//     } else {
//         return storageService.post(TOY_KEY, toy)
//     }
// }

// function getById(toyId) {
//     return storageService.get(TOY_KEY, toyId)
// }


// function getRandomToy() {
//     var toy = getEmptyToy()
//     toy.price = utilService.getRandomIntInclusive(1000, 9000)
//     toy.name = 'Toy-' + (Date.now() % 1000)
//     return toy
// }

// function getEmptyToy(name = '', price = '') {
//     var toy = {
//         name,
//         price,
//         labels: ["Doll", "Battery Powered", "Baby"],
//         createdAt: '',
//         inStock: true,
//         imgName: name
//     }
//     return toy
// }

// function getDefaultFilter() {
//     return { name: '', price: '' }
// }

// function _createToys() {
//     let toys = utilService.loadFromStorage(TOY_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         toys.push(_createToy('Talking doll', 300))
//         toys.push(_createToy('Star wars', 120))
//         toys.push(_createToy('Lego', 50))
//         toys.push(_createToy('Boba', 150))
//         utilService.saveToStorage(TOY_KEY, toys)
//     }
// }

// function _createToy(name, price = 250) {
//     const toy = getEmptyToy(name, price)
//     toy._id = utilService.makeId()
//     toy.createdAt = Date.now()
//     return toy
// }