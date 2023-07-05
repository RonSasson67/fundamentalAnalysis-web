import Button from "@mui/material/Button";
import { useFormikWizard } from "formik-wizard-form";
import MetricsType from "../../Entity/MetricsType";
import RatioType from "../../Entity/RatioType";
import ChartSliderWrapper from "../ChartSlider/ChartSliderWrapper";
import TabelWrapper from "../TabelWrapper/TabelWrapper";
import "./FormikWizardWrapper.css";

const FormikWizardWrapper = () => {
  const { renderComponent, handlePrev, handleNext, isNextDisabled, isPrevDisabled, isLastStep } = useFormikWizard({
    initialValues: { firstName: "", lastName: "" },
    onSubmit: (values: any) => console.log(values),
    validateOnNext: true,
    activeStepIndex: 0,
    steps: [
      {
        component: () => <TabelWrapper symbol="META" metricsType={MetricsType.General} />,
      },
      {
        component: () => <ChartSliderWrapper symbol="META" ratioType={RatioType.PE} />,
      },
      {
        component: () => <TabelWrapper symbol="META" metricsType={MetricsType.CashFlow} />,
      },
    ],
  });

  return (
    <div className="form">
      <div className="circle" style={{ filter: `blur(${((400 * 50) % 600) + 30}px)` }} />
      <div className="render-component">{renderComponent()}</div>
      <div className="buttons">
        <div className="previous-button-area">
          <Button color="primary" size="large" disabled={isNextDisabled} onClick={handlePrev}>
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
