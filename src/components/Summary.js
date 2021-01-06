import React, { useState, useEffect } from "react";
import { fetchSummary } from "../Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
});
const Summary = ({ country }) => {
  const classes = useStyles();
  const [summaries, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      const data = await fetchSummary();
      setSummary(data);
    };
    fetchSummaries();
  });

  return (
    <React.Fragment>
      <Grid Container>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <h1>Global Data</h1>
      <div>New Confirmed:{summaries.Global.NewConfirmed}</div>
      <div>Total Confirmed:{summaries.Global.TotalConfirmed}</div>
      <div>new Deaths:{summaries.Global.NewDeaths}</div>
      <div>Total Confirmed:{summaries.Global.TotalDeahs}</div>
      <div>Total Recovered:{summaries.Global.TotalRecovered}</div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">NewConfirmed</StyledTableCell>
            <StyledTableCell align="right">TotalConfirmed</StyledTableCell>
            <StyledTableCell align="right">NewDeaths</StyledTableCell>
            <StyledTableCell align="right">TotalDeaths</StyledTableCell>
            <StyledTableCell align="right">NewRecovered</StyledTableCell>
            <StyledTableCell align="right">TotalRecovered</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaries.Countries.map((item) => (
            <StyledTableRow key={item.Country}>
              <StyledTableCell component="th" scope="row">
                {item.Country}
              </StyledTableCell>
              <StyledTableCell align="right">{item.NewConfirmed}</StyledTableCell>
              <StyledTableCell align="right">{item.TotalConfirmed}</StyledTableCell>
              <StyledTableCell align="right">{item.NewDeaths}</StyledTableCell>
              <StyledTableCell align="right">{item.TotalDeath}</StyledTableCell>
              <StyledTableCell align="right">{item.NewRecovered}</StyledTableCell>
              <StyledTableCell align="right">{item.TotalRecovered}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Summary;
