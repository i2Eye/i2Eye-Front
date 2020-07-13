import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class StationList extends Component {
  state = {};

  render() {
    const { classes, stations, handleClick, handleToggle } = this.props;

    return (
      //using map to render so that we only have to change the stations state property
      <List className={classes.root}>
        {stations.map((station, index) => (
          <ListItem
            key={index}
            button
            disabled={!station.checked} //handles the check if the station is off
            onClick={handleClick(index)}
          >
            <ListItemText id={station.name} primary={station.name} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle(index)}
                checked={station.checked}
                inputProps={{ "aria-labelledby": "switch-list-label-1" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(useStyles)(StationList);
