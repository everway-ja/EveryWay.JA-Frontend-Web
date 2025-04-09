import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice';

/**
 * Redux Store
 * 
 * This is the central state store for the application using Redux Toolkit.
 * It combines all reducers and applies middleware.
 * 
 * Current reducers:
 * - counter: Simple counter functionality for demonstration
 */
export default configureStore({
    reducer: {
        counter: counterReducer,
    },
    });