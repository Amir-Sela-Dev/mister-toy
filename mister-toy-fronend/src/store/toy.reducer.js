import { toyService } from '../services/toy.service.local.js'
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOGGLE_TOYT_SHOWN = 'TOGGLE_TOYT_SHOWN'
export const ADD_TO_TOYT = 'ADD_TO_TOYT'
export const REMOVE_FROM_TOYT = 'REMOVE_FROM_TOYT'
export const CLEAR_TOYT = 'CLEAR_TOYT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TOY = 'SET_TOY'




const initialState = {
    toys: [],
    toy: toyService.getEmptyToy(),
    lastRemovedToy: null,
    isLoading: false,
}


export function toyReducer(state = initialState, action) {
    let toys
    let lastRemovedToy

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_TOY:
            return { ...state, toy: action.toy }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TOY:
            lastRemovedToy = state.toys.find(t => t._id === action.toyId)
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys, lastRemovedToy }

        case UNDO_REMOVE_TOY:
            ({ lastRemovedToy } = state)
            toys = [lastRemovedToy, ...state.toys]
            return { ...state, toys, lastRemovedToy: null }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        default:
            return state
    }
}


