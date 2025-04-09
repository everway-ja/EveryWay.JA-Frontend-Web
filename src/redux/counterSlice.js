import { createSlice } from '@reduxjs/toolkit';

/**
 * Counter Slice
 * 
 * A Redux Toolkit slice for managing counter state.
 * Provides actions for incrementing, decrementing, and incrementing by amount.
 */
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0, // Initial counter value
    },
    reducers: {
        /**
         * Increment the counter by 1
         * @param {Object} state - Current counter state
         */
        increment: (state) => {
            state.value += 1;
        },
        
        /**
         * Decrement the counter by 1
         * @param {Object} state - Current counter state
         */
        decrement: (state) => {
            state.value -= 1;
        },
        
        /**
         * Increment the counter by a specified amount
         * @param {Object} state - Current counter state
         * @param {Object} action - Action with payload containing amount to increment
         */
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Export the action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer
export const counterReducer = counterSlice.reducer;