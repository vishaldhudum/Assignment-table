// Library
import React from 'react';
import { connect } from 'react-redux'

// Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

// Action
import { toggleEditDialogue } from '../action/crudAction'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    padding: 0
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    height: 'calc(100vh - 120px)'
  }
});

function DataTable(props) {

  const classes = useStyles();
  const headers = ["SL. No.", "Name", "Username", "Email", "Action"]

  function handleEdit(user) {
    if(!props.showEditDialog)
      props.toggleDialogue(user);
  }

  return (
    <Container maxWidth="lg" >
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                headers.map((header, index) =>
                  <StyledTableCell key={"header_" + index}>{header}</StyledTableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.rows.map((row, index) =>
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell key={row.name + "_" + row.id}>{row.name}</StyledTableCell>
                  <StyledTableCell key={row.username + "_" + row.id}>{row.username}</StyledTableCell>
                  <StyledTableCell key={row.email + "_" + row.id}>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="primary" component="span" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const mapStateToProps = state => ({
  showEditDialog: state.showEditDialog,
  rows: state.rows
})

const mapDispatchToProps = dispatch => ({
  toggleDialogue: (user) => dispatch(toggleEditDialogue(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)