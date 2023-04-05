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
donor sign up original -------------------------------------------------------------------------
```js 
// //! Declaration of Vairables
// const DonorSignup = (props) => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const confirmPasswordRef = useRef();
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
// const email = emailRef.current.value;
//     const password = passwordRef.current.value;
    
//     //!Url our page is hosed on
//     let url = `http://localhost:4000/user/signup`;
//     let bodyObject = JSON.stringify({  email, password });

//     let myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       headers: myHeaders,
//       body: bodyObject,
//       method: "POST",
//     };
//     //! function that runs when the user hits the signup button, that then allows them to log in
//     try {
//       const response = await fetch(url, requestOptions);
//       const data = await response.json();
//       console.log(data);
//       if (data.message === "Success") {
//         //We are free to navigate to another page
//         props.updateToken(data.token);
//         navigate("/profile");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   //! Input field where user enters information
//   return (
//     <>
//       <h1>Begin earning your good karma today!</h1>
//       <h2>Sign up to be a donor!</h2>
//       <div>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label>Email: </Label>
//             <Input type="email" innerRef={emailRef} />
//           </FormGroup>
//           <FormGroup>
//             <Label>Password: </Label>
//             <Input type="password" innerRef={passwordRef} />
//           </FormGroup>
//           <FormGroup>
//             <Label>Confirm Password:</Label>
//             <Input type="password" innerRef={confirmPasswordRef} />
//           </FormGroup><br></br>
//           <FullWidthButton>
//             <Button type="submit" color="warning">
//               Sign Up
//             </Button>
//           </FullWidthButton>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default DonorSignup;
```

Backend update user old version 
```js
// Backup in case I mess it up
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    // finding the user by id
    const userToUpdate = await User.findById({ _id: req.params.id });
    // if user not found
    if (!userToUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(req.user._id);
    console.log(userToUpdate._id);
    console.log(req.user._id.toString() == userToUpdate._id.toString());
    // checking to see if the user is the creator or an admin. If they aren't, they get an error.
    if (
      !req.user.isAdmin &&
      req.user._id.toString() != userToUpdate._id.toString()
    ) {
      res
        .status(403)
        .json({ message: "You do not have permission to update that user." });
      return;
    }
    // Creating a filter to retrieve user
    const filter = { _id: req.params.id };
    // If a password is changed, it will be hashed.
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const update = req.body;
    const returnOptions = { new: true };
  
    // using method find one and update to make the appropriate changes.
    const user = await User.findOneAndUpdate(filter, update, returnOptions);

    res.status(202).json({ message: "User updated", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// material Ui in json
 "@mui/material": "^5.11.7",

 Buttons for login and forgot password 

<div className="loginbuttons">
            <Button onClick={() => navigate(`/forgotpassword`)} color="primary">
              Forgot Password
            </Button>

            <Button
              className="loginbtn"
              onClick={() => navigate(`/signup`)}
              color="primary"
            >
              Signup
            </Button>
            </div>
            ```
// card for total
<Card
              className="my-2"
              color="info"
              inverse
              //   style={{
              //     width: "18rem",
              //   }}
            >
              <CardHeader className="txtcenter donationamount">
                Total Amount Donated:
              </CardHeader>
              <CardBody>
                <CardTitle className="txtcenter donationamount" tag="h5">
                  $6,000
                </CardTitle>
                {/* <CardText>
        
      </CardText> */}
              </CardBody>
						</Card>

Profile table
```
 <Table style={{ marginTop: 20 }}>
              <tbody>
                <tr className="table-info">
                  <td>
                    <h2>Organization:</h2>
                  </td>
                  <td>
                    <h2>Amount:</h2>
                  </td>
                </tr>
                <tr className="table-info">
                  <td>Habitat for Humanity</td>
                  <td>$1,000</td>
                </tr>
                <tr className="table-info">
                  <td>Boys and Girls Club</td>
                  <td>$1,000</td>
                </tr>
                <tr className="table-info">
                  <td>Habitat for Humanity</td>
                  <td>$1,000</td>
                </tr>
                <tr className="table-info">
                  <td>Cancer Research Institute</td>
                  <td>$1,000</td>
                </tr>
                <tr className="table-info">
                  <td>Hope for the Warriors</td>
                  <td>$1,000</td>
                </tr>
                <tr className="table-info">
                  <td>The Alzheimer's Association</td>
                  <td>$1,000</td>
                </tr>
              </tbody>
            </Table>
                 ```       

                 ```form submit 
                  //   action={`http://localhost:4000/user/resetpassword/${id}/${token}`}
                  //   method="post"


                  <!-- Update form for update password -->
               ```   .logInForm{
    margin-top: 50px;
}```

                  
