import { createSlice } from "@reduxjs/toolkit";

export const schoolsSlice = createSlice({
    name: "schools",
    initialState: {
        schools: [],
    },
    reducers: {
        saveSchools: (state, action) => {
            state.schools = action.payload;
        }
    }
})

export const {saveSchools } = schoolsSlice.actions;

export default schoolsSlice.reducer;