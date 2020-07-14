import React, {
    Component
}
from "react";


class InfoSegment extends Component {
    state = {};
    render() {
        return <body className="patientInfo"> <h4>Basic Patient Information</h4> <text>1. Name</text> <br></br> <text>2. Gender</text> <br></br> <text>3. Birthdate</text> <br></br> <text>4. Age</text> <br></br> <text>5. District Name</text> <br></br> <text>6. Address</text> <br></br> <text>7. Zip Code</text> <br></br> <text>8. Contact Number</text> <br></br> <text>9. Spoken Language</text> <br></br> <text>10. Drug Allergies</text> <br></br> <text>11. Do you have any blood borne disease?</text> <br></br> <div> <text>12. Doctor's consult: Basic Patient Information: Station Select: Height and Weight: Blood Glucose: Blood Pressure: </text> </div> <br></br> </body>; } } export default InfoSegment;
