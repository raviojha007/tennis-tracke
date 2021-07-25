import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PlayerOneWins: 0,
  PlayerTwoWins: 0,
  seconds:0
};

const PlayerOneReducer = createSlice({
  name: "Players",
  initialState,
  reducers: {
      UpdatePlayerOneWin(state,action ){
        state.PlayerOneWins += 1;
        state.seconds=0
        console.log("PlayerOneWins")
        localStorage.setItem("PlayerOneWins", (state.PlayerOneWins +=1));
      
      },
      UpdatePlayerTwoWin(state, action) {
        state.PlayerTwoWins +=1
        state.seconds=0
        console.log("PlayerTwoWins")
      localStorage.setItem("PlayerTwoWins", (state.PlayerTwoWins +=1));
    }
  },
});

export const {UpdatePlayerOneWin,UpdatePlayerTwoWin} = PlayerOneReducer.actions
export default PlayerOneReducer.reducer;
