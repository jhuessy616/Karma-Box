import NavBar from "./NavBar";
import Charities from "./Charities";
import Banner from "./Banner";
import "./home.css";

function Home(props) {
  return (
    <div className="HomePage">
      <NavBar token={props.token} />
      <Banner />

      <Charities />
    </div>
  );
}

export default Home;
