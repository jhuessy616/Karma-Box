// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useRef} from "react";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";
import "./donorSignUp.css"
import { useForm } from "react-hook-form";


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
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  
    console.log(data);
   
  
    //!Url our page is hosed on
    let url = `http://localhost:4000/user/signup`;
    let bodyObject = JSON.stringify({ email:data.email, password:data.password });

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
      console.log(data);
      if (data.message === "Success") {
        //We are free to navigate to another page
        props.updateToken(data.token);
        console.log("hi")
        navigate("/setupIntent");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
        <>
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup>
        <Label>Email</Label>
        <input
          class="form-control"
          type="email"
          {...register("email", {
            required: "You must enter an email",
            validate: (value) =>
              value.includes("@") || "Please provide a valid email",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <input
          class="form-control"
          type="password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </FormGroup>
      <FormGroup>
        <Label>Confirm password</Label>
        <input
          class="form-control"
          type="password"
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
      </FormGroup>

      <Input type="submit" onClick={handleSubmit(onSubmit)} />
      </Form>
      </>
  );
}
export default DonorSignUp;




