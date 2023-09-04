import Button from "@mui/material/Button";
import StepMui from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { Step, useFormikWizard } from "formik-wizard-form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./FormikWizardWrapper.css";
import "../../Utils/Utils.css";
import { useNavigate } from "react-router-dom";

export type FormikWizardWrapperProp = {
  symbol: string;
  formSteps: FormStep[];
};

type FormStep = {
  step: Step;
  stepName: string;
};

const FormikWizardWrapper = ({ formSteps, symbol }: FormikWizardWrapperProp) => {
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const methods = useForm({
    defaultValues: {
      symbol: symbol,
    },
  });

  const steps: Step[] = formSteps.map((formStep) => formStep.step);

  const { renderComponent, handlePrev, handleNext, isNextDisabled, isPrevDisabled, isLastStep, currentStepIndex } =
    useFormikWizard({
      initialValues: {},
      onSubmit: (_: any) => {
        setFinished(true);
        navigate("/summary", { state: methods.getValues() });
      },
      validateOnNext: true,
      activeStepIndex: 0,
      steps: steps,
    });

  return (
    <div className="form">
      <div className="steps">
        <Stepper activeStep={currentStepIndex}>
          {formSteps.map((step, index) => (
            <StepMui key={step.stepName} completed={formSteps.length - 1 !== index ? currentStepIndex > index : finished}>
              <StepLabel>{step.stepName}</StepLabel>
            </StepMui>
          ))}
        </Stepper>
      </div>
      <div className="circle" style={{ filter: `blur(200px)` }} />
      <FormProvider {...methods}>
        <div className="render-component scroll-bar">{renderComponent()}</div>
      </FormProvider>
      <div className="buttons">
        <div className="previous-button-area">
          <Button color="primary" size="large" disabled={isPrevDisabled || finished} onClick={handlePrev}>
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
