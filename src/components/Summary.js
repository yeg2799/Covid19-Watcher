import React, { useState, useEffect } from "react";
import { fetchSummary } from "../Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop:120
  },
});
const Summary = ({ country }) => {
  const classes = useStyles();
  const [summariesGlobal, setSummary] = useState([]);
  const [summariesCountries,setSummaryCountries]=useState([]);
  const [search,setSearchCountry]=useState("");

  useEffect(() => {
    const fetchSummaries = async () => {
      const data = await fetchSummary();
      setSummary(data.Global);
      setSummaryCountries(data.Countries);
    };
    fetchSummaries();
  });

  const updateInput = async (search) => {
    const filtered = summariesCountries.filter(country => {
     return country.Country.toLowerCase().includes(search.toLowerCase())
    })
    setSearchCountry(search);
    setSummaryCountries(filtered);
 }
  {/*Global Data*/}
  const allGlobalDailyData = () => {
    return (
      <ul>
      <li>New Confirmed:{summariesGlobal.NewConfirmed}</li>
      <li>Total Confirmed:{summariesGlobal.TotalConfirmed}</li>
      <li>new Deaths:{summariesGlobal.NewDeaths}</li>
      <li>Total Confirmed:{summariesGlobal.TotalDeahs}</li>
      <li>Total Recovered:{summariesGlobal.TotalRecovered}</li>
    </ul>
    )
  };
  {/*All Country*/}
  const dailySelectedCountryData=()=>{
    return(
<TableContainer component={Paper} className={classes.table}>
        <h1>Selected Country:{country}</h1>
            <Table  aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell align="right">NewConfirmed</StyledTableCell>
                  <StyledTableCell align="right">
                    TotalConfirmed
                  </StyledTableCell>
                  <StyledTableCell align="right">NewDeaths</StyledTableCell>
                  <StyledTableCell align="right">TotalDeaths</StyledTableCell>
                  <StyledTableCell align="right">NewRecovered</StyledTableCell>
                  <StyledTableCell align="right">
                    TotalRecovered
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {summariesCountries.filter(item =>item.Slug===country).map(Filtered=> (
                  <StyledTableRow key={Filtered.Country}>
                    <StyledTableCell component="th" scope="row">
                      {Filtered.Country}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.NewConfirmed}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.TotalConfirmed}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.NewDeaths}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.TotalDeaths}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.NewRecovered}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Filtered.TotalRecovered}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    )
  }
  const dailyAllWorldData=()=>{
    return(
      
<TableContainer component={Paper} className={classes.table}>
      <h1>All Countries:{search}</h1>
      <input placeholder="search"  onChange={(e)=>updateInput(e.target.value)}></input>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell align="right">NewConfirmed</StyledTableCell>
                  <StyledTableCell align="right">
                    TotalConfirmed
                  </StyledTableCell>
                  <StyledTableCell align="right">NewDeaths</StyledTableCell>
                  <StyledTableCell align="right">TotalDeaths</StyledTableCell>
                  <StyledTableCell align="right">NewRecovered</StyledTableCell>
                  <StyledTableCell align="right">
                    TotalRecovered
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summariesCountries.map((item) => (
                  <StyledTableRow key={item.Country}>
                    <StyledTableCell component="th" scope="row">
                      {item.Country}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.NewConfirmed}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.TotalConfirmed}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.NewDeaths}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.TotalDeaths}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.NewRecovered}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.TotalRecovered}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
    )
  }
  return (
    <React.Fragment>
      <Grid Container>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
            <h1>Global Data</h1>
              {allGlobalDailyData()}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          
          {dailySelectedCountryData()}
        </Grid>
        <Grid item xs={12}>

          {dailyAllWorldData()}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Summary;
