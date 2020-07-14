import React, {Component} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core";
import "../../App.css";

class FormSegment extends Component {
    state = {};
    render() {
        return (
            <form>
                <h3>Height and Weight</h3>
                <Grid container>
                    <Grid item md="12">
                        <div className="label">
                            <FormControl component="fieldset">
                                <label>Is the participant a child?</label>
                                <RadioGroup aria-label="is child" name="gender1">
                                    <FormControlLabel value="yes"
                                        control={
                                            <Radio
                                        color="primary"/>
                                        }
                                        label="Yes"/>
                                    <FormControlLabel value="no"
                                        control={
                                            <Radio
                                        color="primary"/>
                                        }
                                        label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item md="12">
                        <div className="label">
                            <label htmlFor="height">1.1 Height (m)</label>
                            <br></br>
                            <TextField id="height" label="Height (m)" required/>
                            <p></p>
                            <label htmlFor="height">1.2 Weight (kg)</label>
                            <br></br>
                            <TextField id="weight" label="Weight (kg)" required/>
                            <p></p>
                            <label htmlFor="height">1.3 BMI</label>
                            <br></br>
                            <TextField id="bmi" label="BMI" required/>
                            <p></p>
                            <label htmlFor="waist circumference">2.1 Waist Circumference (cm)</label>
                            <br></br>
                            <TextField id="waist circumference" label="Waist Circumference (cm)" required/>
                            <p></p>
                            <label htmlFor="Hip circumference">2.2 Hip Circumference (cm)</label>
                            <br></br>
                            <TextField id="hip circumference" label="Hip Circumference (cm)" required/>
                            <p></p>
                            <label htmlFor="Waist:Hip Ratio">2.3 Waist:Hip Ratio</label>
                            <br></br>
                            <TextField id="Waist:Hip Ratio" label="Waist:Hip Ratio" required/>
                        </div>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default FormSegment;
