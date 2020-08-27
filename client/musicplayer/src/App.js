import React from 'react';
import AudioControls from './components/Controls/AudioControls';
import SongImage from './components/SongDisplay/SongImage';
import Header from './components/Layout/Header';
import SongsTable from './components/SongDisplay/SongsTable'
// Redux imports
import store from './store';
import { getSongs, getPlaylists } from './store/slices';
// Material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App()  {

  // Fetch songs on mount from the getSongs() method in the store
  React.useEffect(() => {
    store.dispatch(getSongs()) 
  }, [] )  // Passing effect empty array so that the hook only ever runs on mount

  // Fetch playlists on mount from the getPlaylist() method in the store
  React.useEffect(() => {
    store.dispatch(getPlaylists()) 
  }, [] )  // Passing effect empty array so that the hook only ever runs on mount

  const classes = useStyles(); 

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column" justify="center" alignItems="center">
        <Grid container item xs={12}>
          <Header/>
        </Grid>
        <Grid item xs={12}>
          <SongImage />
        </Grid>
        {/* <Grid item xs={12}>
          Insert slider here
        </Grid> */}
        <Grid item xs={12}>
          <AudioControls/>
        </Grid>
        <Grid item xs={12}>
          <SongsTable/>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default App;

