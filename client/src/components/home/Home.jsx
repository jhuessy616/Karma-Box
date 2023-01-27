
import NavBar from './NavBar'
import About from './About'
import Charities from './Charities'
import Banner from './Banner'
import "./home.css"
function Home() {
  return (
    <div className="HomePage">
      
        <NavBar />
        <Banner />
      
     
      <Charities />
    </div>
  );
}

export default Home