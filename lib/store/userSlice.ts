import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json() as Promise<User[]>;
});

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  view: 'grid',
  searchQuery: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.view = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setView, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;