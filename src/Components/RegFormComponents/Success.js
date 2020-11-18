import React from "react";

export const Success = ({patientId}) => {
  console.log(patientId);

    return (
      <div>
        <h1>Registration Form submitted successfully!</h1>
        <p>Your ID is <b>{patientId}</b>, please take note of your ID for upcoming stations.</p>
      </div>
    );
}

export default Success;
