import React, { useEffect, useState } from "react";
import covidLogo from "./virus.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fetchCountries } from "./Api";
import AreaChart from "./components/AreaChart";
import Paper from "@material-ui/core/Paper";
import Summary from "./components/Summary";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width: "60%",
  },
}));

const App = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");
  useEffect(() => {
    const fetchCountriesData = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    fetchCountriesData();
  }, [country]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img
            src={covidLogo}
            alt="Covid 19Logo"
            style={{ width: 100, height: 100, marginTop: 20 }}
          />

          <FormControl className={classes.formControl} >
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{color:"white"}}
            
            >
              {countries.map((country) => [
                <MenuItem value={country.Slug}>{country.Country}</MenuItem>,
              ])}
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Summary country={country}/>
          </Grid>
          {/*Chart*/}
          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
