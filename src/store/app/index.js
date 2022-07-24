import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: 'John Doe',
};

export const app = createSlice({
    name: 'app',
    initialState,
});

export default app;