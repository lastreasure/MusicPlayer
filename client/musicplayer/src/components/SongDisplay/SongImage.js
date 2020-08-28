import React from 'react';
import { connect } from 'react-redux'; 
// MAterial UI imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

// UI Styling
const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 350,
    },
});

const SongImage = ({currentSong={}}) => {

    const classes = useStyles();
    // Assigning state from current song
    const image = currentSong.imageSource
    const title = currentSong.title
    const artist = currentSong.artist


    return (
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={image}
                title={title}
                artist={artist}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {title} - {artist}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
        ); 
    
}

// Mapping slice action function to properties
const mapStateToProps = state => ({
    currentSong: state.currentSong
})

// Connecting SongImage component to the redux state and dispatching state to properties in the component
export default connect(mapStateToProps)(SongImage);


