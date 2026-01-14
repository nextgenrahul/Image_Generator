import Description from "../components/Description"
import GenerateButton from "../components/GenerateButton"
import Header from "../components/Header"
import Steps from "../components/Steps"
import Testimonial from "../components/Testimonial"

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <GenerateButton />
    </div>
  )
}
export default Home