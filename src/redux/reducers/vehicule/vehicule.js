import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

const entity = createEntityAdapter({
    selectId : item => item.id
})

const initialState = entity.getInitialState({
  loading:false,
  isLoggedIn: false
})

export const saveVehicule = createAsyncThunk(
  "save/vehicule",
  async ({data,token}, { rejectWithValue }) => { 
    try {
      const response = await axios.post(`${API_URL}/vehicule/postVehicule`, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response.data.vehicule
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue(error.message);
    }
  }
)


export const updateVehicule = createAsyncThunk(
  "update/vehicule",
  async ({data,token}, { rejectWithValue }) => { 
    try {
      const response = await axios.put(`${API_URL}/vehicule/updateVehicule`, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue(error.message);
    }
  }
)


export const getAllVehicules = createAsyncThunk(
    "get/vehicules",
    async (token, { rejectWithValue }) => { 
      try {
        const response = await axios.get(`${API_URL}/vehicule/getListVehicule`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        })
        return response.data?.data
      } catch (error) {
        if (error.response) {
          return rejectWithValue(error.response.data.message || 'Login failed');
        }
        return rejectWithValue(error.message);
      }
    }
)

const vehiculeSlice = createSlice({
  name: 'vehicule',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveVehicule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveVehicule.fulfilled, (state, action) => {
        state.loading = false
        entity.upsertOne(state,action.payload)
      })
      .addCase(saveVehicule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVehicule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicule.fulfilled, (state, action) => {
        state.loading = false
        entity.updateOne(state,action.payload)
      })
      .addCase(updateVehicule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllVehicules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVehicules.fulfilled, (state, action) => {
        state.loading = false
        entity.setAll(state,action.payload)
      })
      .addCase(getAllVehicules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: vehiculeActions } = vehiculeSlice
export const vehiculeReducer = vehiculeSlice.reducer

const vehiculeSelectors = entity.getSelectors((state)=>state.vehicule)
export const { selectAll:takeAllVehicules, selectById:selectVehiculeById } = vehiculeSelectors

export const getLoading = (state) => state.vehicule.loading
export const getLoadingFetchVehicule = (state) => state.vehicule.loading
