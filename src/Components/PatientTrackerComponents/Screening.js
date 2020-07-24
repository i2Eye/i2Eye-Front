import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useStyles = (theme) => ({
    container: {
      height: 56,
      display: "inline-block",
      minWidth: 320,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },

    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "70%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },

  });
class Screening extends Component {
    state= {disable:true}

  render() {

    const {classes} =this.props;
    return (
      <React.Fragment>
        <div className="container">
        <h1 style={{float: "left"}}>Screening Review 
        <IconButton onClick={e=> {this.setState({disable: false})}}>            
          <EditIcon />
        </IconButton>
        <IconButton onClick={e=> {this.setState({disable: true})}}>            
          <DoneAllIcon />
        </IconButton>
                </h1> 
        
                </div>
        <Grid container spacing={3}>
          <Grid item xs={8}>
          <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                  Personal Details
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="name"
                    id="name"
                    label="Name"
                    disabled = {this.state.disable}
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="nric"
                    id="nric"
                    label="NRIC"
                    disabled = {this.state.disable}
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      name="gender"
                      labelId="gender-label"
                      id="gender"
                      disabled = {this.state.disable}
                    >
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"M"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="age"
                    id="age"
                    label="Age"
                    type="number"
                    disabled = {this.state.disable}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="birthday"
                    id="date"
                    label="Birthday"
                    type="date"
                    disabled = {this.state.disable}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="education-label">Highest Education Qualification</InputLabel>
                    <Select
                      name="education"
                      labelId="education-label"
                      id="education"
                      disabled = {this.state.disable}
                    >
                      <MenuItem value="no_formal_qualification">No formal qualification</MenuItem>
                      <MenuItem value="primary">Primary(complete 6th standard)</MenuItem>
                      <MenuItem value="secondary">Secondary</MenuItem>
                      <MenuItem value="higher_secondary">Higher Secondary</MenuItem>
                      <MenuItem value="above_higher_secondary">Above higher secondary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="occupation-label">Occupation</InputLabel>
                    <Select
                      name="occupation"
                      labelId="occupation-label"
                      id="occupation"
                      disabled = {this.state.disable}

                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="homemaker">Homemaker/Housewife</MenuItem>
                      <MenuItem value="religious_work">Religious Work</MenuItem>
                      <MenuItem value="professional">Professional (teacher, engineer, architect, doctor, nurse, lawyer, management, finance, etc)</MenuItem>
                      <MenuItem value="service_industry">Service industry (e.g. restaurant server, call centre, receptionist, hotel staff)</MenuItem>
                      <MenuItem value="manual_labourer">Manual labourer (e.g. farming, mining, construction, cleaning)</MenuItem>
                      <MenuItem value="skilled_labourer">Skilled labourer (e.g. plumbing, electrician, cook, tailor)</MenuItem>
                      <MenuItem value="manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="unemployed">Unemployed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              </AccordionDetails>
            </Accordion>

    <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Patient Profile 
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>   
              </AccordionDetails>
            </Accordion>           

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                   Station 1
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                    
              </AccordionDetails>
            </Accordion>        
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Screening);
