import React, {Component} from "react";
import Switch from "@material-ui/core/Switch";
import "../../App.css";
import FormAbled from "./FormAbled";
import FormDisabled from "./FormDisabled";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked_1: false,
            checked_2: false,
            checked_3: false,
            current: 0
        };
        this.handleChange_1 = this.handleChange_1.bind(this);
        this.handleChange_2 = this.handleChange_2.bind(this);
        this.handleChange_3 = this.handleChange_3.bind(this);
    }

    handleChange_1() {
        this.setState({
            checked_1: !this.state.checked_1
        });
    }

    handleChange_2() {
        this.setState({
            checked_2: !this.state.checked_2
        });
    }
    handleChange_3() {
        this.setState({
            checked_3: !this.state.checked_3
        });
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Stations</h2>
                    <text className="text">Station 1</text>
                    <Switch //checked={state.checkedB}
                        onChange={
                            this.handleChange_1
                        }
                        color="primary"
                        name="checkedB"
                        inputProps={
                            {"aria-label": "primary checkbox"}
                        }/>{" "}
                    <br/>
                    <text className="text">Station 2</text>
                    <Switch //checked={state.checkedB}
                        onChange={
                            this.handleChange_2
                        }
                        color="primary"
                        name="checkedB"
                        inputProps={
                            {"aria-label": "primary checkbox"}
                        }/>{" "}
                    <br/>
                    <text className="text">Station 3</text>
                    <Switch //checked={state.checkedB}
                        onChange={
                            this.handleChange_3
                        }
                        color="primary"
                        name="checkedB"
                        inputProps={
                            {"aria-label": "primary checkbox"}
                        }/>{" "}
                    <h3 className="text-right">
                        Currently serving : {
                        this.state.current
                    } </h3>
                </div>
                {
                (this.state.checked_1 || this.state.checked_2 || this.state.checked_3) && <FormAbled/>
            }
                {
                !this.state.checked_1 && !this.state.checked_2 && !this.state.checked_3 && <FormDisabled/>
            } </div>
        );
    }
}

export default Form;
