import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: null,
};

const TokenSlice = createSlice({
    name :'token',
    initialState,
    reducers :{
        setToken:(state , action: PayloadAction<string | null>)=>{
            state.token = action.payload;
        },
        removeToken : (state) => {
          state.token = null;
        }
    },
}) ;

export const {setToken , removeToken} = TokenSlice.actions;
export default TokenSlice.reducer;