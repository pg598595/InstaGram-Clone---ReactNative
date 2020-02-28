import { createStore, combineReducers } from 'redux'
import userReducer from './components/reducers/userReducer'
import dataReducer from './components/reducers/dataReducer'

export default createStore(
        combineReducers({
            userReducer,
            dataReducer
        }),
       
)


