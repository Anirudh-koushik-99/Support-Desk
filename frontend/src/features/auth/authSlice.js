import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//GET USER FROM LOCAL STORAGE
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//REGISTER NEW USER
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//LOGIN USER
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    console.log(user)
})

//LOGOUT USER
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})



export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer