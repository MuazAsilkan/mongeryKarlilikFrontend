import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface GetDataParams {
  order: number;
  isUsd: number;
}

const initialState = {
  data: { data: [] },
}

export const getData = createAsyncThunk(
  'data/getData',


  

  async ({ order, isUsd }: GetDataParams) => {
    const response = await axios.post('http://localhost:8000/api/order', {
       order, isUsd 
    })
    
    
    
    return response.data
  }
)

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  }
})

export default dataSlice.reducer