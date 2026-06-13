import About from "./components/About"
import ContactMe from "./components/ContactMe"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Work from "./components/Work"

function App(){
  return(
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Work/>
      <ContactMe/>

    </div>
  )
}
export default App