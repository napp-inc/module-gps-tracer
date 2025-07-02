import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

const entity = createEntityAdapter({
    selectId : item => item.id
})

const initialState = entity.getInitialState({
  loading: false,
  loadAdd:false
})

export const saveSac = createAsyncThunk(
  "save/sac",
  async ({data,token}, { rejectWithValue }) => { 
    try {
      const response = await axios.post(`${API_URL}/sac/postSac`, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      console.log("Data Sac ", response.data)
      return response.data?.sac
    } catch (error) {
      console.log("Erreur ", error)
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue(error.message);
    }
  }
)

export const getSacs = createAsyncThunk('get/allsacs', async (token, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${API_URL}/sac/getListSac`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data?.elems
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || 'Sac failed');
    }
    return rejectWithValue(error.message);
  }
})

const sacSlice = createSlice({
  name: 'sac',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSac.pending, (state) => {
        state.loadAdd = true;
        state.error = null;
      })
      .addCase(saveSac.fulfilled, (state, action) => {
        state.loadAdd = false
        entity.upsertOne(state,action.payload)
      })
      .addCase(saveSac.rejected, (state, action) => {
        state.loadAdd = false;
        state.error = action.payload;
      })
      .addCase(getSacs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSacs.fulfilled, (state, action) => {
        state.loading = false
        entity.setAll(state,action.payload)
      })
      .addCase(getSacs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: sacsActions } = sacSlice
export const sacReducer = sacSlice.reducer

const sacSelectors = entity.getSelectors((state)=>state.sac)
export const { selectAll:takeAllSacs, selectById:selectSacById } = sacSelectors

export const getLoading = (state) => state.sac.loading
export const getLoadingAdd = (state) => state.sac.loadAdd
