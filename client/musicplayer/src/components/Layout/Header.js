import React from 'react';
import createActivityDetector from 'activity-detector'
import { connect } from 'react-redux'; 


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
    }));

const Header = (allSongs = []) => {
    const classes = useStyles();

    // Idle mode
    function useIdle(options) {
        const [isIdle, setIdle] = React.useState(false)
        // Only render on mount
        React.useEffect((options) => {
        const activityDetector = createActivityDetector(options)
        activityDetector.on('idle', () => setIdle(true))
        activityDetector.on('active', () => setIdle(false))
        //remove all event handlers from body - set by activity detector
        return () => activityDetector.stop()
        }, [])
        return isIdle
    }
    
    const isIdle = useIdle({timeToIdle: 3000});

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
            >
                {isIdle ? <NightsStayIcon/>  : <WbSunnyIcon/>}
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                Music Player
            </Typography>
                <Autocomplete
                    id="combo-box-demo"
                    options={allSongs.allSongs}
                    getOptionLabel={(option) => option.title}
                    groupBy={(option) => option.artist}
                    style={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Search song title" variant="outlined" />}
                />
            </Toolbar>
        </AppBar>
        </div>
    );
}

// Retrieve state from redux and map to properties to the component to use inside the component
// mapping values in the state to the properties 
const mapStateToProps = state => ({
    allSongs: state.allSongs
})

export default connect(mapStateToProps)(Header);
