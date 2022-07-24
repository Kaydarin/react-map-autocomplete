import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    hits: [],
    selectedHistory: [],
    selected: {
        placeId: null,
        name: null,
        latitude: null,
        longitude: null,
    }
};

export const autoComplete = createAsyncThunk(
    'place/autoComplete',
    async (keyword, { rejectWithValue }) => {

        try {

            const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
                params: {
                    input: keyword,
                    key: process.env.REACT_APP_GOOGLE_MAP_KEY
                }

            });

            return {
                data
            };
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const placeDetail = createAsyncThunk(
    'place/placeDetail',
    async (_, { rejectWithValue, getState }) => {

        const placeId = getState().place.selected.placeId;

        if (!placeId) {
            return rejectWithValue({
                message: "Place ID missing"
            });
        }

        try {
            const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                place_id: placeId,
                key: process.env.REACT_APP_GOOGLE_MAP_KEY
            });

            return {
                data
            };
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const place = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setSelectedPlaceAndName: (state, { payload }) => {
            state.selected.placeId = payload.placeId;
            state.selected.name = payload.name;
        },
        resetError: (state, { payload }) => {
            state.error = null;
        },
    },
    extraReducers: builder => {

        const matchBuilder = (action, status) =>
            action.type.startsWith('place') && action.type.endsWith(status);

        builder.addCase(autoComplete.fulfilled, (state, { payload }) => {
            state.hits = payload.data.predictions
            state.loading = false;
        });

        builder.addCase(placeDetail.fulfilled, (state, { payload }) => {
            const lat = payload.data.result.geometry.location.lat;
            const lng = payload.data.result.geometry.location.lng;

            const placeId = payload.data.result.place_id;
            const name = payload.data.result.formatted_address;

            let historyArr = [...state.selectedHistory];

            const found = historyArr.findIndex(val => {
                return val.placeId === placeId
            });


            if (found !== -1) {
                historyArr.push(historyArr.splice(found, 1)[0]);
            } else {
                historyArr.push({
                    placeId,
                    name,
                    latitude: lat,
                    longitude: lng
                });
            }

            state.selectedHistory = historyArr;
            state.selected.latitude = lat;
            state.selected.longitude = lng;
            state.loading = false;
        });

        builder.addMatcher(
            action => matchBuilder(action, '/pending'),
            (state, action) => ({
                ...state,
                loading: true,
            }),
        );

        builder.addMatcher(
            action => matchBuilder(action, '/rejected'),
            (state, { payload }) => {

                let errorMessage = 'Fetch Error';

                console.log(payload.response.hasOwnProperty('message'))
                if (payload) {
                    if (payload.hasOwnProperty('response') && payload.response.hasOwnProperty('data') && payload.response.data.hasOwnProperty('message')) {
                        errorMessage = payload.response.data.message;
                    } else if (payload.hasOwnProperty('message')) {
                        errorMessage = payload.message;
                    }
                }

                return {
                    ...state,
                    loading: false,
                    error: errorMessage,
                };
            },
        );
    },
});

export const { setSelectedPlaceAndName, resetError } = place.actions;

export default place;