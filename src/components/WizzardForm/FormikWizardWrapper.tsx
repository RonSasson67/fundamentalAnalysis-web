import Button from "@mui/material/Button";
import StepMui from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { Step, useFormikWizard } from "formik-wizard-form";
import { useState } from "react";
import "./FormikWizardWrapper.css";
import { FormProvider, useForm } from "react-hook-form";

export type FormikWizardWrapperProp = {
  formSteps: FormStep[];
};

type FormStep = {
  step: Step;
  stepName: string;
};

const FormikWizardWrapper = ({ formSteps }: FormikWizardWrapperProp) => {
  const [finished, setFinished] = useState(false);
  const methods = useForm();

  //create steps from formSteps prop and add type of the varibale
  const steps: Step[] = formSteps.map((formStep) => formStep.step);

  const { renderComponent, handlePrev, handleNext, isNextDisabled, isPrevDisabled, isLastStep, currentStepIndex } =
    useFormikWizard({
      initialValues: { firstName: "", lastName: "" },
      onSubmit: (values: any) => {
        alert(JSON.stringify(methods.getValues()));
        setFinished(true);
      },
      validateOnNext: true,
      activeStepIndex: 0,
      steps: steps,
    });

  return (
    <div className="form">
      <Stepper activeStep={currentStepIndex}>
        {formSteps.map((step, index) => (
          <StepMui key={step.stepName} completed={formSteps.length - 1 !== index ? currentStepIndex > index : finished}>
            <StepLabel>{step.stepName}</StepLabel>
          </StepMui>
        ))}
      </Stepper>
      <div className="circle" style={{ filter: `blur(${((400 * 50) % 600) + 30}px)` }} />
      <FormProvider {...methods}>
        <div className="render-component">{renderComponent()}</div>
      </FormProvider>
      <div className="buttons">
        <div className="previous-button-area">
          <Button color="primary" size="large" disabled={isPrevDisabled} onClick={handlePrev}>
            Previous
          </Button>
        </div>
        <div className="next-button-area">
          <Button color="primary" size="large" disabled={isNextDisabled} onClick={handleNext}>
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormikWizardWrapper;
