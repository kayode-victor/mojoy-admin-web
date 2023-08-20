import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import advertService from "./advertService";

export const getAdverts = createAsyncThunk(
  "advert/get-adverts",
  async (thunkAPI) => {
    try {
      return await advertService.getAdverts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAdvert = createAsyncThunk(
  "advert/get-advert",
  async (id, thunkAPI) => {
    try {
      return await advertService.getAdvert(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createAdvert = createAsyncThunk(
  "advert/create-advert",
  async (advertData, thunkAPI) => {
    try {
      return await advertService.createAdvert(advertData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAdvert = createAsyncThunk(
  "advert/update-advert",
  async (advert, thunkAPI) => {
    try {
      return await advertService.updateAdvert(advert);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAdvert = createAsyncThunk(
  "advert/delete-advert",
  async (id, thunkAPI) => {
    try {
      return await advertService.deleteAdvert(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  adverts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const advertSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdverts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.adverts = action.payload;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAdvert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAdvert = action.payload;
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAdvert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.AdvertName = action.payload.title;
        state.AdvertImages = action.payload.images;
      })
      .addCase(getAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAdvert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedAdvert = action.payload;
      })
      .addCase(updateAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAdvert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedAdvert = action.payload;
      })
      .addCase(deleteAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default advertSlice.reducer;
