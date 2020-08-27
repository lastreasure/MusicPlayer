import { createSlice } from '@reduxjs/toolkit';

const mpSlice = createSlice({
    // Name used in action types
    name: 'MUSIC_PLAYER',
    // Initial state for the reducer to use
    initialState: { allSongs: [],
                    allPlaylists: []},
    // An object of reducers which will generate an action to update the state
    reducers: {
        TOGGLE_PLAY: (state) => ({
            ...state, // Spread operator to copy the previous state
            isPaused: !state.isPaused // To update the state of whether the music is paused
        }),
        GET_SONGS_REQUEST: (state) => ({ // Can add loading icon to this request 
            ...state
        }),
        GET_SONGS_SUCCESS: (state, action) => ({ 
            ...state,
            allSongs: action.payload, // Update all songs to array passed in to the get_songs_success method 
            currentSong: action.payload[0] || {} // Assign current song to first song in allSongs array || if not set then return empty object
        }),
        GET_SONGS_FAILURE: (state, action) => ({ // Can add a cancel to the loading icon then show error response
            ...state,
            error: action.payload
        }),
        GET_PLAYLISTS_REQUEST: (state) => ({ // Can add loading icon to this request 
            ...state
        }),
        GET_PLAYLISTS_SUCCESS: (state, action) => ({ 
            ...state,
            allPlaylists: action.payload, // Update all songs to array passed in to the get_playlists_success method 
            currentPlaylist: action.payload[0] || {}  // Assign current playlist to first playlist in allPlaylists array || if not set then return empty object
        }),
        GET_PLAYLISTS_FAILURE: (state, action) => ({ // Can add a cancel to the loading icon then show error response
            ...state,
            error: action.payload
        }),
        SET_CURRENT_SONG: (state, action) => ({ // Action to set the currentSong to provided number in the all songs array
            ...state,
            currentSong: state.allSongs[action.payload]
        }),
        SET_CURRENT_PLAYLIST: (state, action) => ({ // Action to set the currentPlaylist to provided number in the all songs array
            ...state,
            currentPlaylist: state.allPlaylists[action.payload]
        }),
        NEXT_SONG: (state, action) => ({  // Action to set the next song to provided number in the all songs array, then pause the song
            ...state,
            currentSong: state.allSongs[action.payload],
            isPaused: true
        }),
        SHUFFLE: (state) => ({ // Action to call the shuffle method which will reorder all songs in the array 
            ...state,
            allSongs: shuffle(state.allSongs)
        }),
    }
})

// Destructuring the actions from the slice
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
    dispatch(GET_SONGS_REQUEST()) // Dispatch request sent
    fetch('http://localhost:5000/songs')
    .then(res => res.json())
    .then(songs => dispatch(GET_SONGS_SUCCESS(songs))) // Dispatch songs successfully received 
    .catch((error) => dispatch(GET_SONGS_FAILURE(error))); // Dispatch error retrieving songs
}

// FETCHING PLAYLIST
export const getPlaylists = () => dispatch => {
    dispatch(GET_PLAYLISTS_REQUEST()) // Dispatch request sent
    fetch('http://localhost:5000/playlists')
    .then(res => res.json())
    // dispatch the state to the reducer
    .then(playlist => dispatch(GET_PLAYLISTS_SUCCESS(playlist))) // Dispatch songs successfully received 
    .catch((error) => dispatch(GET_PLAYLISTS_FAILURE(error)));  // Dispatch error retrieving songs
}

function shuffle (arr) {   
    // create temporary array from the all songs arr that is passed in as a parameter
    let tempArr = [...arr];
    for (let i = arr.length; i > 0; i--){  // loop through each element of the array
        const j = Math.floor(Math.random() * (i));
        [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]]; // switch element order
    }
    return tempArr.filter((val)=> !!val)  // cast value to boolean and filter then return the array 

}

export default mpSlice;