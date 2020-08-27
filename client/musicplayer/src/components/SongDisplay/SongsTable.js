import React, { useState } from 'react';
import { connect } from 'react-redux'; 

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from'@material-ui/core/Button'
import TextField from'@material-ui/core/TextField'

// Method for creating the data for the table
function createData(_id, title, artist) {
return { _id, title, artist };
}

// Sorting columns
function descendingComparator(a, b, orderBy) {
if (b[orderBy] < a[orderBy]) {
    return -1;
}
if (b[orderBy] > a[orderBy]) {
    return 1;
}
return 0;
}

// Sorting columns
function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Sorting columns
function stableSort(array, comparator) {
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
});
return stabilizedThis.map((el) => el[0]);
}

// Assigning column titles
const headCells = [
{ id: 'title', numeric: false, disablePadding: true, label: 'Title' },
{ id: 'artist', numeric: false, disablePadding: false, label: 'Artist' },
];

// Method props for sorting table 
function EnhancedTableHead(props) {
const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
    <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
        <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
        />
        </TableCell>
        {headCells.map((headCell) => (
        <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
        >
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            >
            {headCell.label}
            {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
            ) : null}
            </TableSortLabel>
        </TableCell>
        ))}
    </TableRow>
    </TableHead>
);
}

EnhancedTableHead.propTypes = {
classes: PropTypes.object.isRequired,
numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.oneOf(['asc', 'desc']).isRequired,
orderBy: PropTypes.string.isRequired,
rowCount: PropTypes.number.isRequired,
};

// Styling the ToolBar
const useToolbarStyles = makeStyles((theme) => ({
root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
},
highlight:
    theme.palette.type === 'light'
    ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
    : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
        },
title: {
    flex: '1 1 100%',
},
}));

const EnhancedTableToolbar = (props) => {
const classes = useToolbarStyles();
const { numSelected } = props;

return (
    <Toolbar
        className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}
        >
        {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} songs selected 
            </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Song Library
            </Typography>
        )}
    </Toolbar>
);
};

EnhancedTableToolbar.propTypes = {
numSelected: PropTypes.number.isRequired,
};

// Styling the table
const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
},
paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
},
table: {
    minWidth: 750,
},
visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
},
}));

const SongsTable = (allSongs = []) => {
        
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const rows = [];

    // pushing data from all songs database to the table
    allSongs.allSongs.forEach((song) => {
        rows.push(createData(song._id, song.title, song.artist)) 
    })

    // Method for sorting the table elements
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Method for setting the selected row item
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    // Method for identifying which row items are selected
    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    // Method for handling page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Method for assigning rows per page 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1; 

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // Set state for assigning the inputted playlist name
    let [playlistNameText, setplaylistNameText] = useState('');

    // Assign text state from text field for the playlist name upon input change
    let handleTextFieldChange = (event) => {
        setplaylistNameText(event.target.value);
    }

    // Method to create a new playlist
    const createPlaylist = () => {

        if (playlistNameText !== '' && selected.length > 0) {
            fetch('http://localhost:5000/playlists', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlistName: playlistNameText,
                    playlistSongId: selected,
                })
            }).then(function() {
                alert('playlist created')
            }).catch(function(err) {
                alert('error' + err)
            })
        } else {
            alert('Cannot create playlist with no name or no songs selected')
        }

    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                />
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.artist}</TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
        />

            <TextField 
            id="outlined-basic" 
            label="Insert Playlist Name" 
            variant="outlined" 
            onChange={(e) => handleTextFieldChange(e)}
            />

            <Button 
            variant="contained" 
            color="primary"
            onClick={(e) => createPlaylist()}
            >
                Create Playlist
            </Button>

        </div>
    );
}

const mapStateToProps = state => ({
    allSongs: state.allSongs
})

export default connect(mapStateToProps)(SongsTable);