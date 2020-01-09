import { PLACE_BEAD, SET_BRUSH_POSITION, REDO, UNDO, SET_ACTIVE_COLOR, SET_MOUSE_STATUS } from "../constants/constants";


const initialState = {
    beads: {},
    brushPosition: {x: 0, y: 0},
    history: [],
    histNum: 0,
    activeColor: "#000000",
    mouseStatus: ""
    // transactions: [],
    // totalCash: 0
};

const rootReducer = (state = initialState, action) => {
    let newState = state;
    switch(action.type) {
        case PLACE_BEAD:
            
            newState = {
                ...state,
                beads: action.payload
            };

            const history = state.history;
            var histNum = state.histNum;
            history.splice(histNum, 0, newState);
            history.join();
            histNum += 1;

            newState = {
                ...newState,
                history: history,
                histNum: histNum
            }
            break;
        case SET_BRUSH_POSITION:
            newState ={
                ...state,
                brushPosition: action.payload
            };
            break;
        case REDO:
            if(state.histNum < state.history.length-1){
                histNum = state.histNum;
                histNum = histNum + 1;
                newState = state.history[histNum];
                newState = {
                    ...state,
                    histNum: histNum,
                    beads: newState.beads
                }
            }
            break;
        case UNDO:
            if(state.histNum > 0){
                histNum = state.histNum;
                histNum = histNum - 1;
                newState = state.history[histNum];
                newState = {
                    ...state,
                    histNum: histNum,
                    // mouseStatus: state.mouseStatus
                    beads: newState.beads
                }
            }
            break;
        case SET_ACTIVE_COLOR:
            newState = {
                ...state,
                activeColor: action.payload
            }
            break;
        case SET_MOUSE_STATUS:
            newState = {
                ...state,
                mouseStatus: action.payload
            }
            break;
        default:
            break;
            // return state;
    }
    
    return newState;
}
export default rootReducer;