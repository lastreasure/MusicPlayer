import React from 'react';
import { connect } from 'react-redux'; 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';



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

// Retrieve state from redux and map to properties to the component to use inside the component
// mapping values in the state to the properties 
const mapStateToProps = state => ({
    currentSong: state.currentSong
})

export default connect(mapStateToProps)(SongImage);


