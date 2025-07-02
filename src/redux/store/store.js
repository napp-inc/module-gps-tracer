import { configureStore } from '@reduxjs/toolkit';
import { vehiculeReducer } from '../reducers/vehicule/vehicule';
import { sacReducer } from '../reducers/sac';

const store = configureStore({
  reducer: {
    vehicule:vehiculeReducer,
    sac:sacReducer
  },
});

export default store