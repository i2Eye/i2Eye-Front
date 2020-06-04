import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Success extends Component {
  resetForm = (e) => {
    e.preventDefault();
    this.props.resetForm();
  };

  render() {
    return (
      <div>
        <h1>Submitted Successfully</h1>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.resetForm}
        >
          Submit Another
        </Button>
      </div>
    );
  }
}

export default Success;
