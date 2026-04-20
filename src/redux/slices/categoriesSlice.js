import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, API_ENDPOINTS } from "../../constants/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.CATEGORIES}/all`
      );

      const rawData = response.data;

      const categories = Array.isArray(rawData)
        ? rawData
        : rawData.categories || rawData.data || [];

      return categories.map((category) => ({
        id: category.id ?? category._id,
        title: category.title ?? category.name ?? "Untitled category",
        image: category.image ?? category.img ?? "",
      }));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories"
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { categories } = getState();

      if (categories.status === "loading") {
        return false;
      }

      if (categories.status === "succeeded" && categories.items.length > 0) {
        return false;
      }

      return true;
    },
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default categoriesSlice.reducer;