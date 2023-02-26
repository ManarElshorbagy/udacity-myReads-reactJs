import { createSlice } from '@reduxjs/toolkit';

const initialBookState = {books: [],  loading: false, errorMessage: null};

const BookSlice = createSlice({
  name: 'books',
  initialState: initialBookState,
  reducers: {
    loadBooks(state) {
      state.loading = true;
      state.errorMessage = null;
    },
    loadBooksError(state, action) {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },
    loadBooksSuccess(state, action) {
      state.loading = false;
      state.errorMessage = null;
      state.books = action.payload;
    },
    setSearchedBook(state, action) {
      state.loading = false;
      state.errorMessage = null;
      state.searchedBook = action.payload;
    },
    getFilteredBooks(state, action) {
      state.loading = false;
      state.errorMessage = null;
      state.filteredBooks = action.payload;
    },
  },
});

export const booksActions = BookSlice.actions;
export default BookSlice.reducer;