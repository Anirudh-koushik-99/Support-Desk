import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState ={
    notes:[],
}

//GET TICKET NOTEs
export const getNotes = createAsyncThunk('notes/getAll', async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//CREATE A TICKET NOTE
export const createNote = createAsyncThunk('notes/create', async({noteText, ticketId}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.notes = null
          })
          .addCase(getNotes.fulfilled, (state, action) => {

            state.notes = action.payload
          })
          .addCase(createNote.fulfilled, (state, action) => {
            state.notes.push(action.payload)
          })
    },
})

export const { reset } = noteSlice.actions

export default noteSlice.reducer