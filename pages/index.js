import MultiStepFormComponent from "../src/components/MultiStepForm/MultiStepFormComponent";
import { REGISTRATION_FORM } from "../src/formConfigs/registrationConfig";

const Home = () => {
  return <MultiStepFormComponent config={REGISTRATION_FORM} />;
};

export default Home;
