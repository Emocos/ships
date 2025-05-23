import type { Vehicle } from "@/graphql/generated/graphql"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ShipsSliceType {
  ships: Vehicle[] | []
}

const initialState: ShipsSliceType = {
  ships: [],
}

export const shipSlice = createSlice({
  name: "ships",
  initialState,
  reducers: {
    setShips: (state, action: PayloadAction<Vehicle[]>) => {
      state.ships = action.payload
    }
  }
})

export const { setShips } = shipSlice.actions;
export default shipSlice.reducer;
