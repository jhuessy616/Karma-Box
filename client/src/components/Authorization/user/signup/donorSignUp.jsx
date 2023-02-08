// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label, InputGroup } from "reactstrap";
import { useRef, useState } from "react";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";
import "./donorSignUp.css"
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import sanitize from "../../../../utils/sanitizeinput"



function DonorSignUp(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_repeat: "",
    },
  });
  console.log(errors);
  const email = useRef({});
  const password = useRef({});
  password.current = watch("password", "");
  email.current = watch("email", "");
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const [state, setState] = useState(false);
  const toggleBtn = (e) => {
    e.preventDefault();
    setState((prevState) => !prevState);
  };


  const onSubmit = async (data) => {
let email=sanitize(data.email)
    //!Url our page is hosed on
    let url = `http://localhost:4000/user/signup`;
    let bodyObject = JSON.stringify({ email: email, password: data.password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    //! function that runs when the user hits the signup button, that then allows them to log in
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
     
      if (data.message === "Success") {
        //We are free to navigate to another page
        props.updateToken(data.token);
        console.log("hi")
        navigate("/setupIntent");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className="donorSignUp">
        
          <FormGroup floating >
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              className="form-control emailinputgroup "
              {...register("email", {
                required: "You must enter an email",
                // validate: (value) =>
                //   value.includes("@") || "Please provide a valid email",
                validate: (value) =>
                  value.length >= 5 &  value.includes("@") || "Please provide a valid email" 
              })}
            />
            <Label for="email">Email</Label>
            {errors.email && <p>{errors.email.message}</p>}
          </FormGroup>
      

        <InputGroup className="signupinputgroup">
          <FormGroup floating>
            <input
              class="form-control"
              id="password"
              name="password"
              placeholder="Password"
              type={state ? "text" : "password"}
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 6,
                  message: "Password must have at least six characters",
                },
              })}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <Button className="eyebtn input-group-text" onClick={toggleBtn}>
            {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </Button>
        </InputGroup>
        {errors.password && <p>{errors.password.message}</p>}

        <InputGroup className="signupinputgroup">
          <FormGroup floating>
            <input
              class="form-control"
              id="examplConfirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type={state ? "text" : "password"}
              {...register("password_repeat", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            <Label for="exampleConfirmPassword">Confirm Password</Label>
          </FormGroup>
          <Button className="eyebtn input-group-text" onClick={toggleBtn}>
            {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </Button>
        </InputGroup>
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

        <FullWidthButton>
          <Button
            type="submit"
            color="warning"
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
        </FullWidthButton>
        {/* <Input type="submit" onClick={handleSubmit(onSubmit)} /> */}
      </Form>
      <p className="txtcenter">{message}</p>
      <p className="txtcenter" style={{ marginTop: -15 }}>
        Already have a Karma Box account? <br></br>
        <a href="/login"> Log in here </a>
      </p>
    </>
  );
}
export default DonorSignUp;




