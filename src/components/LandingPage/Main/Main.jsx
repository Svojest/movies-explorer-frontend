import AboutMe from "../AboutMe/AboutMe"
import AboutProject from "../AboutProject/AboutProject"
import Portfolio from "../Portfolio/Portfolio"
import Promo from "../Promo/Promo"
import Techs from "../Techs/Techs"

const Main = () => {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />

    </main>    
  )
}

export default Main