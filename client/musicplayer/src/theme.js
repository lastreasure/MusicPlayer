// import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Custom theme 
const theme = createMuiTheme({
    palette: {
        primary: {
        main: '#556cd6',
        },
        secondary: {
        main: '#19857b',
        },
        error: {
        main: '#e60000',
        },
        background: {
        default: '#fff',
        },
    },
});

export default theme;