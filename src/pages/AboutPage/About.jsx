import REviewPart from "../HomePage/ReviewPart/REviewPart";
import AboutCarousel from "./AboutCarousel";
import AboutSecondPart from "./AboutSecondPart";
import ContactPart from "./Contactpart";

const About = () => {
  return (
    <div>
      <AboutCarousel />
      <AboutSecondPart />
      <REviewPart />
      <ContactPart />
    </div>
  );
};

export default About;
