import {configureStore} from '@reduxjs/toolkit'
import mpSlice from './slices'

// Passing in slices of the state (defined in reducer) as an object of store
const store = configureStore({
    reducer: mpSlice.reducer
})

export default store;
