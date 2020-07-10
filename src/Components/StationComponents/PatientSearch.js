import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {CardHeader} from '@material-ui/core/';
import CardActions from '@material-ui/core/CardActions';
const useStyles = () => ({
  root: {
    maxWidth: 275,
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

class PatientSearch extends Component {
  state = {
    swtich: true,
    people: [
      { id: 1, name: "Person 1", age: 10, gender: "M", available: false },
      { id: 2, name: "Person 2", age: 20, gender: "F", available: true },
      { id: 3, name: "Person 3", age: 30, gender: "M", available: true },
    ],
    station: [
      { id: 1, available: false },
      { id: 2, available: true },
      { id: 3, available: true },
    ],
    selected: false
  };

  render() {

    const {classes} = this.props;

    return (
     
     <div>
     <Autocomplete
      id="combo-box-demo"
      options={this.state.people}
      getOptionLabel={(option) => (option.available === false)? (option.id +" (busy)").toString(): (option.id).toString()}
      getOptionDisabled={(option) => option.available === false}
      style={{ width: 300, marginRight: 200 }}
      renderInput={(params) => <TextField {...params} label="Search Patient ID" variant="outlined" />}
     />
        
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom:20 }}
          onClick={() => this.setState({ selected: true })}
          disabled={this.state.selected}
        >
          Get Next Person
        </Button>

       
       
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom:20 }}
          onClick={() => this.setState({ selected: false })}
          disabled={!this.state.selected}
        >
          Cancel
        </Button>

        <Card className={classes.root}>
         <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {`ID : ${this.state.people[0].id}`}
        </Typography>
        <Typography variant="body2" component="p">
        {`Age : ${this.state.people[0].age}`}
        <br/>
        {`Gender : ${this.state.people[0].gender}`}
        </Typography>
      </CardContent>
    </Card>

        <br />
    
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          disabled={!this.state.selected}
        >
          Next
        </Button>
      
     </div>
    );
  }
}


export default withStyles(useStyles)(PatientSearch);
