import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
    rootTable: {
        '@media (min-width: 1150)': {
            paddingLeft: '265px',
          }, 
      },
    containerTable: {
    },
}));

const columns = [
    { 
      id: 'bpm', 
      label: 'Beats per Minute',
      align: 'center' 
      },
    {
      id: 'date',
      label: 'Date/Time Recorded',
      minWidth: 170,
      align: 'center',
      format: (value) => moment(value).day(),
    },
];

const TableComponent = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.rootTable} style={{height: '100%', maxHeight: '675px'}}>
            <TableContainer className={classes.containerTable} style={{height: '91%'}}>
                <Table stickyHeader stickyFooter aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                    <TableBody id="currentRows" style={{overflowY: 'scroll'}}>
                        {(props.rowsPerPage > 0
                            ? props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                            : props.rows).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.unNum}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{bottom: '0'}}
                rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                component="div"
                count={props.rows.length}
                rowsPerPage={props.rowsPerPage > 0 ? props.rowsPerPage : props.rows.length}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TableComponent
