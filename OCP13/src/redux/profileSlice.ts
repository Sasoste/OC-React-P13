// profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Profile {
    firstName: string;
    lastName: string;
}

interface ProfileState {
    data: Profile | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProfileState = {
    data: null,
    status: 'idle',
    error: null,
};

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    'profile/fetchProfile',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch profile');
            }

            const data = await response.json();
            return data.body;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk<Profile, Partial<Profile>, { state: RootState }>(
    'profile/updateProfile',
    async (updatedData, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const data = await response.json();
            return data.body;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;
