import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// const initialState = {
//     // pieChartData: [100]
// };

const store = createStore(rootReducer);

export default store;