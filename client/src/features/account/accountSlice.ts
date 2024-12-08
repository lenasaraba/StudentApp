import { createAsyncThunk } from "@reduxjs/toolkit";

interface AccountState {
    user: User | null; // Stanje čuva korisničke podatke ili je null ako korisnik nije prijavljen.
}

const initialState: AccountState = {
    user: null, // Početno stanje: korisnik nije prijavljen.
};


export const signInUser=createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI)=>{
        try {
            const userDto=await agent.Account.login(data);
            const {basket, ...user}=userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)