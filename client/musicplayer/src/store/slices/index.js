import { createSlice } from '@reduxjs/toolkit';

const mpSlice = createSlice({
    // Name used in action types
    name: 'MUSIC_PLAYER',
    // Initial state for the reducer to use
    initialState: { allSongs: [],
                    allPlaylists: []},
    // An object of reducers whoms name will generate an action
    reducers: {
        TOGGLE_PLAY: (state) => ({
            ...state,
            isPaused: !state.isPaused
        }),
        GET_SONGS_REQUEST: (state) => ({ // loading variable 
            ...state
        }),
        GET_SONGS_SUCCESS: (state, action) => ({ 
            ...state,
            allSongs: action.payload,
            currentSong: action.payload[0] || {} // if not set then return empty object
        }),
        GET_SONGS_FAILURE: (state, action) => ({ // cancel loader then show error response
            ...state,
            error: action.payload
        }),
        GET_PLAYLISTS_REQUEST: (state) => ({ // loading variable 
            ...state
        }),
        GET_PLAYLISTS_SUCCESS: (state, action) => ({ 
            ...state,
            allPlaylists: action.payload,
            currentPlaylist: action.payload[0] || {} // if not set then return empty object
        }),
        GET_PLAYLISTS_FAILURE: (state, action) => ({ // cancel loader then show error response
            ...state,
            error: action.payload
        }),
        SET_CURRENT_SONG: (state, action) => ({
            ...state,
            currentSong: state.allSongs[action.payload]
        }),
        SET_CURRENT_PLAYLIST: (state, action) => ({
            ...state,
            currentPlaylist: state.allPlaylists[action.payload]
        }),
        NEXT_SONG: (state, action) => ({
            ...state,
            currentSong: state.allSongs[action.payload],
            isPaused: true
        }),
        SHUFFLE: (state) => ({
            ...state,
            allSongs: shuffle(state.allSongs)
        }),
    }
})

// destructuring th e actions from the slice
export const {  TOGGLE_PLAY, 
                GET_SONGS_SUCCESS, 
                GET_SONGS_REQUEST, 
                GET_SONGS_FAILURE, 
                GET_PLAYLISTS_SUCCESS, 
                GET_PLAYLISTS_REQUEST, 
                GET_PLAYLISTS_FAILURE, 
                NEXT_SONG,
                SHUFFLE} 
                = mpSlice.actions;

// FETCHING SONGS
export const getSongs = () => dispatch => {
    dispatch(GET_SONGS_REQUEST())
    fetch('http://localhost:5000/songs')
    .then(res => res.json())
    // dispatch the state to the reducer
    .then(songs => dispatch(GET_SONGS_SUCCESS(songs)))
    .catch((error) => dispatch(GET_SONGS_FAILURE(error)));
}

// FETCHING PLAYLIST
export const getPlaylists = () => dispatch => {
    dispatch(GET_PLAYLISTS_REQUEST())
    fetch('http://localhost:5000/playlists')
    .then(res => res.json())
    // dispatch the state to the reducer
    .then(playlist => dispatch(GET_PLAYLISTS_SUCCESS(playlist)))
    .catch((error) => dispatch(GET_PLAYLISTS_FAILURE(error)));
}

function shuffle (arr) {   
    
    let tempArr = [...arr];
    for (let i = arr.length; i > 0; i--){ 
        const j = Math.floor(Math.random() * (i));
        [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr.filter((val)=> !!val)

}

export default mpSlice;