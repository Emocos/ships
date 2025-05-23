import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import shipSlice from './slices/shipSlice/shipSlice';

export const store = configureStore({
  reducer: {
    ships: shipSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;