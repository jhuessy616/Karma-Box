drop down under sign up
```js
<UncontrolledDropdown nav inNavbar>
              <Nav.Link
                className={
                  activeLink === "signup" ? "active-navbar-link" : "navbar-link"
                }
                //   onClick={() => onUpdateActiveLink("signup")}
              >
                <DropdownToggle tag="span" className="crazy">
                  Sign Up
                </DropdownToggle>
              </Nav.Link>
              <DropdownMenu dark>
                <DropdownItem>
                  {" "}
                  <Nav.Link
                    href="http://localhost:3000/signup"
                    className={
                      activeLink === "donorsignup"
                        ? "active-navbar-link"
                        : "navbar-link"
                    }
                    //   onClick={() => onUpdateActiveLink("donorsignup")}
                  >
                    {" "}
                    Donor Signup
                  </Nav.Link>
                </DropdownItem>

                <DropdownItem>
                  <Nav.Link
                    href="http://localhost:3000/signup"
                    className={
                      activeLink === "nonprofitsignup"
                        ? "active-navbar-link"
                        : "navbar-link"
                    }
                    //   onClick={() => onUpdateActiveLink("charitysignup")}
                  >
                    {" "}
                    Non Profit Signup
                  </Nav.Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </Router>
  );
};
export default NavBar;
```

NavBAr react-bootstrap version--------------------------------------------------------------------------------------
```js
import { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";

// import { HashLink } from 'react-router-hash-link'
// import { BrowserRouter as Router } from "react-router-dom";

import "./navbar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
  return (
  
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img className="navbarlogo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
             
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/about"
              className={
                activeLink === "about" ? "active navbar-link" : "navbar-link"
              }
              
            >
              About
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/login"
              className={
                activeLink === "login" ? "active-navbar-link" : "navbar-link"
              }
            
            >
              Login
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/signup"
              className={
                activeLink === "signup"
                  ? "active-navbar-link"
                  : "navbar-link"
              }
                
            >
              {" "}
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </Router>
  );
};
export default NavBar;
```

navbar.css ----------------------------------------------
```js
/* navbar styling */
/* always fixed at top of page, want it to cover width of page, right at top, index so always visible.*/
.navbar{
    padding: 0;
    position: sticky;
    width: 100%;
    top:0;
    z-index: 9999;
    transition: 0.32 ease-in-out;
    /* background-color:purple */
}
/* once scrolled background color changes */
/* nav.navbar.scrolled{
    padding: 0px 0;
    background-color: #121212;
} */
/* logo size */
nav.navbar a.navbar-brand{
    width:9%;
    height: 9%;
    align-items: left;
}
.navbarlogo{
   max-width: 60%; 
   max-height: 50%;
   filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}
/* styling for links */
nav.navbar .navbar-nav .nav-link.navbar-link {
    font-weight: 400;
    color: #fff !important;
    letter-spacing: 0.8px;
    padding: 0 25px;
    font-size: 18px;
    opacity: 0.75;
}


/* styling for links if hovered or active */
nav.navbar .navbar-nav a.nav-link.navbar-link:hover,
nav.navbar .navbar-nav a.nav-link.navbar-link.active {
   opacity: 1;
}

/* centering the text */
span.navbar-text{
    display:flex;
    align-items:center;
}






/* designing the button */
.navbar-text button {
  font-weight: 700;
  color: #fff;

  /* border will allow us to see it's a button becuase it's transparent */
  border: 1px solid #fff;
  padding: 18px 34px;
  font-size: 18px;
  margin-left: 18px;
	position: relative;
	background-color: transparent;
	transition: 0.3s ease-in-out;
}
.navbar-text button span {
  z-index: 1;
}



nav.navbar .navbar-toggler:active,
nav.navbar .navbar-toggler:focus {
	outline: none;
    box-shadow: none;
}
/* icon gets smaller with toggler */
nav.navbar .navbar-toggler-icon {
  width: 24px;
  height: 17px;
  background-image: none;
  position: relative;
  border-bottom: 2px solid #fff;
  transition: all 300ms linear;
  top: -2px;
}
nav.navbar .navbar-toggler-icon:focus {
	border-bottom: 2px solid #fff;
}
nav.navbar .navbar-toggler-icon:after,
nav.navbar .navbar-toggler-icon:before {
	width: 24px;
	position: absolute;
	height: 2px;
	background-color: #fff;
	top: 0;
	left: 0;
	content: '';
	z-index: 1;
	transition: all 300ms linear;
}
nav.navbar .navbar-toggler-icon:after {
	top: 8px;
}
/* if expanded will rotate 45 degrees */
/* nav.navbar .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:after {
	transform: rotate(45deg);
	background-color: #fff;
	height: 2px;
} */
/* will rotate the other way */
/* nav.navbar .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:before {
	transform: translateY(8px) rotate(-45deg);
	background-color: #fff;
	height: 2px;
} */
/* nav.navbar .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
	border-color: transparent;
} */
/* #basic-navbar-nav Nav{
    display: inline;

} */
```