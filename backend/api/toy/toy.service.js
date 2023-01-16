const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = getFilterBy(filterBy)
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

function getFilterBy(filterBy) {
    if (filterBy.inStock === 'false') filterBy.inStock = false
    if (filterBy.inStock === 'true') filterBy.inStock = true
    let lables = JSON.parse(filterBy.lables)
    if (!lables.length) {
        lables = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    }
    const criteria = {
        name: { $regex: filterBy.name, $options: 'i' },
        price: { $lte: +filterBy.price },
        inStock: filterBy.inStock,
        lables: { $in: lables }
    }


    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    console.log(toy);
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
            lables: toy.lables,
            inStock: toy.inStock,
            imgName: toy.imgName,

        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg
}
