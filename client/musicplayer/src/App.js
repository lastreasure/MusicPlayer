import React from 'react';
import AudioControls from './components/Controls/AudioControls';
import SongImage from './components/SongDisplay/SongImage';
import Header from './components/Layout/Header';
import SongTable from './components/SongDisplay/SongTable'
import SongsTable from './components/SongDisplay/SongsTable'

import store from './store';
import { getSongs, getPlaylists } from './store/slices';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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

  React.useEffect(() => {
    store.dispatch(getSongs())
  }, [] )

  React.useEffect(() => {
    store.dispatch(getPlaylists())
  }, [] )
  // Passing effect empty array so that the hook only ever runs on mount

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
        <Grid item xs={12}>
          Insert slider here
        </Grid>
        <Grid item xs={12}>
          <AudioControls/>
        </Grid>
        <Grid item xs={12}>
          {/* <SongTable/> */}
          <SongsTable/>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

