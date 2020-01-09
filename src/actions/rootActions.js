import { PLACE_BEAD, SET_BRUSH_POSITION, UNDO, REDO, ADD_STATE, SET_ACTIVE_COLOR, MOUSE_HELD, SET_MOUSE_STATUS } from '../constants/constants'

export function placeBead(payload){
    return {
        type: PLACE_BEAD,
        payload
    }
}

export function setBrushPosition(payload){
    return {
        type: SET_BRUSH_POSITION,
        payload
    }
}

export function undo(payload){
    return {
        type: UNDO,
        payload
    }
}

export function redo(payload){
    return {
        type: REDO,
        payload
    }
}

export function addState(payload){
    return{
        type: ADD_STATE,
        payload
    }
}

export function setActiveColor(payload){
    return{
        type: SET_ACTIVE_COLOR,
        payload
    }
}

export function setMouseStatus(payload){
    return{
        type: SET_MOUSE_STATUS,
        payload
    }
}