import React, { useState } from 'react'
// Redux imports
import { connect } from 'react-redux'; 
// Retrieve action from slices
import { TOGGLE_PLAY, NEXT_SONG, SHUFFLE } from '../../store/slices'

// Material UI imports
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ReplayIcon from '@material-ui/icons/Replay';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Create audio file
const audioFile = new Audio();

// Variable to track and manipulate current song
let songNum = 0

const AudioControls = ({togglePlay, nextSong, isPaused, allSongs=[], shuffle, currentSong={}}) => {

    // Assigning state hook for play/pause icon to be displayed
    const [playIcon, setPlayIcon] = useState(<PlayArrowIcon/>)

    // Play next song method
    const iterator = () => {
        setPlayIcon(<PlayArrowIcon/>) 
        if(songNum === allSongs.length-1) {
            songNum = 0; // When end of song array go to back to first song in list
        } 
        // songNum = songNum++;
        songNum++; // Increment song number
        nextSong(songNum) // Update current song using nextSong slice method
        
    }

    // Play previous song method
    const decrement = () => {
        setPlayIcon(<PlayArrowIcon/>)
        if(songNum === 0 ) {
            songNum = allSongs.length; // When song array reaches the start go to the end of the song list
        } 
            // songNum = songNum--;
            songNum-- // Decrement song number
            nextSong(songNum) // Decrement current song using nextSong slice method
        
    }

    // Play audio method
    const audioPlay = () => {
        // if song is not paused then pause : if song is paused then play
        !isPaused ? audioFile.pause() : audioFile.play()
    }

    // Set play/pause icon using state hook
    const iconPlay = () => {
        // if song is not paused then display play icon : if song is paused then display pause icon
        !isPaused ? setPlayIcon(<PlayArrowIcon/>) : setPlayIcon(<PauseIcon/>)
    }

    // Assign the audioFile variable to the current song source
    React.useEffect(() => {
        audioFile.src=currentSong.songSource
    }, [currentSong])   // Whenever the currentSong changes then provide an updated currentSong song source

    // Replay song method
    const replay = () => {
        audioFile.pause() // Pause current song
        setPlayIcon(<PlayArrowIcon/>) // Set to play icon
        audioFile.currentTime = 0 // Put song time to start
        audioFile.play() // Play song
        setPlayIcon(<PauseIcon/>) // Set pause icon
    }

    return (
        <div>
            <Button id='replayButton' variant="contained" color="primary"
                    onClick={() => {replay()}}>
                <ReplayIcon/>
            </Button>

            <Button id='previousButton' variant="contained" color="primary"
                    onClick={() => {decrement() ; audioPlay(); console.log("from dec " + songNum)}}> 
                <SkipPreviousIcon/>
            </Button>

            <Button id='playButton' variant="contained" color="primary" 
                    onClick={() => {audioPlay(); togglePlay(); iconPlay(); console.log(songNum)}}>
                {playIcon}
            </Button>

            <Button id='skipButton' variant="contained" color="primary"
                    onClick={() => {iterator(); audioPlay(); console.log("from incre " + songNum)}}>
                <SkipNextIcon/>
            </Button>

            <Button id='shuffle' variant="contained" color="primary"
                    onClick={() => {shuffle()}}>
                <ShuffleIcon/>
            </Button>

        </div>
    )
}

// Retrieve state from redux and map to properties to the component to use inside the component
const mapStateToProps = state => ({
    isPaused: state.isPaused,
    currentSong: state.currentSong,
    allSongs: state.allSongs

})

// Mapping slice action function to properties
const mapDispatchToProps = {
    togglePlay: TOGGLE_PLAY,
    nextSong: NEXT_SONG,
    shuffle: SHUFFLE
}

// Connecting AudioControls component to the redix state and dispatching state to properties in the component
export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);

