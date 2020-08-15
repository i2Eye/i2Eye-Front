import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";

const Wizard = ({children, initialValues, onSubmit}) => {
  const [step, setStep] = useState(0);
  const steps = React.Children.toArray(children);
  // a snapshot of form state is used as initialValues after each transition
  const [snapshot, setSnapshot] = useState(initialValues);

  const currStep = steps[step]; // get the form for each step
  const totalSteps = steps.length;
  const isSubmitStep = step === totalSteps - 1;
  
  const nextStep = values => {
    setSnapshot(values);
    setStep(Math.min(step + 1, totalSteps - 1));
  };

  const prevStep = values => {
    setSnapshot(values);
    setStep(Math.max(step - 1, 0));
  };

  const handleSubmit = async (values, formikBag) => {
    if (currStep.props.onSubmit) {
      await step.props.onSubmit(values, formikBag);
    }

    if (isSubmitStep) {
      return onSubmit(values, formikBag);
    } else {
      formikBag.setTouched({}); // need to check if success page needs this
      nextStep(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={currStep.props.validationSchema}
    >
      {formik => (
        <Form>
          {currStep}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20, marginRight: 20 }}
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            type="submit"
          >
            Next
          </Button>
          <pre>{JSON.stringify(formik, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  )
};

export default Wizard;