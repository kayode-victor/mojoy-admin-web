import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import voucherService from "./voucherService";

export const getVouchers = createAsyncThunk(
  "voucher/get-vouchers",
  async (thunkAPI) => {
    try {
      return await voucherService.getVouchers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getVoucher = createAsyncThunk(
  "voucher/get-voucher",
  async (id, thunkAPI) => {
    try {
      return await voucherService.getVoucher(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createVoucher = createAsyncThunk(
  "voucher/create-voucher",
  async (voucherData, thunkAPI) => {
    try {
      return await voucherService.createVoucher(voucherData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteVoucher = createAsyncThunk(
  "voucher/delete-voucher",
  async (id, thunkAPI) => {
    try {
      return await voucherService.deleteVoucher(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  vouchers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVouchers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVouchers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.vouchers = action.payload;
      })
      .addCase(getVouchers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createVoucher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdVoucher = action.payload;
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getVoucher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.VoucherData = action.payload;
      })
      .addCase(getVoucher.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteVoucher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedVoucher = action.payload;
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default voucherSlice.reducer;
