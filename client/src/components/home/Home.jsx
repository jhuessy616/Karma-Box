
import NavBar from './NavBar'
import About from './About'
import Charities from './Charities'
import Banner from './Banner'
import "./home.css"

let getTokenStart = "ill karma your box 123456. testing"; // string to use when starting a message to the token getter ifram
let karmaboxUrl = "http://localhost:3000"; // url to karma box website


function getToken() {
    let win = document.getElementById("kb-ifr").contentWindow;
    win.postMessage(getTokenStart + "get", "*");
}
function setToken(msg) {
    let win = document.getElementById("kb-ifr").contentWindow;
    win.postMessage(getTokenStart + "set" + msg, "*");
}


function Home() {

    window.onmessage = (e) => {
    if (e.origin === karmaboxUrl) {
        console.log("data", e.data);
    }
}

  return (
    <div className="HomePage">
      
        <NavBar />
        <iframe id="kb-ifr" src="http://localhost:3000/gettoken.html"></iframe>
        <Banner />
      
      <button onClick={(e) => getToken()}></button>
     
      <Charities />
    </div>
  );
}

export default Home
