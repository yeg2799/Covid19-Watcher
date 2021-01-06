import React, { useState, useEffect } from "react";
import { fetchSummary } from "../Api";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
 
const Summary = () => {
  const [summaries, setSummary] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchSummaries = async () => {
      const data = await fetchSummary();
      setSummary(data);
    };
    fetchSummaries();
  }, []);

  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <h1>Global</h1>
      <div>New Confirmed:{summaries.Global.NewConfirmed}</div>
      <div>Total Confirmed:{summaries.Global.TotalConfirmed}</div>
      <div>new Deaths:{summaries.Global.NewDeaths}</div>
      <div>Total Confirmed:{summaries.Global.TotalDeahs}</div>
      <div>Total Recovered:{summaries.Global.TotalRecovered}</div>
      </CardContent>
    </Card>
    </>
  );
};

export default Summary;
