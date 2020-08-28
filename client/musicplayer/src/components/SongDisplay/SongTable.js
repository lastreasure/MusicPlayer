import React from 'react';
import { connect } from 'react-redux'; 

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// UI Styling
const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

// Create data for rows
function createData(_id, title, artist) {
    return { _id, title, artist};
}

const SongTable = (allSongs = []) => {

    const classes = useStyles();
    // Create array to be populated by state songs
    const rowsSongs = [];
    // For each song in the array push from the create data function to populate the table rows 
    allSongs.allSongs.forEach((song) => {
        rowsSongs.push(createData(song._id, song.title, song.artist)) 
    })

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Artist</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rowsSongs.map((song) => (
                <TableRow key={song._id}>
                <TableCell component="th" scope="row">
                    {song.title}
                </TableCell>
                <TableCell align="left">{song.artist}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

// Mapping values in the state to the properties 
const mapStateToProps = state => ({
    currentSong: state.currentSong,
    allSongs: state.allSongs

})

// Connecting SongTable component to the redix state and dispatching state to properties in the component
export default connect(mapStateToProps)(SongTable);