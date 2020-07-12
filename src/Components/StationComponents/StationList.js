import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/core/styles";


const useStyles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class StationList extends Component {
 
    constructor(props) {
        super(props)
        this.state={ 
         checked: [''] , id:''
       }
    this.handleToggle = this.handleToggle.bind(this);

   }
  handleToggle = (value)=>() => {
    const {checked}= this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      this.setState({id: value });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({checked: newChecked });
    console.log(checked);
  };


  //need to improve/fix click Listbutton function for each station 
  //check for busy station etc.
  handleClick=(e)=> {     
    e.preventDefault();
    this.props.nextStep();
  }; 

  render() {
    const {classes} = this.props;

    return (

    <List className={classes.root}>
      <ListItem button onClick={this.handleClick}>
      <ListItemText id="switch-list-label-1" primary="Station 1" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={this.handleToggle('1')}
            checked={this.state.checked.indexOf('1') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-1' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={this.handleClick}>
        <ListItemText id="switch-list-label-2" primary="Station 2" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={this.handleToggle('2')}
            checked={this.state.checked.indexOf('2') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-2' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
}

export default withStyles(useStyles)(StationList);
