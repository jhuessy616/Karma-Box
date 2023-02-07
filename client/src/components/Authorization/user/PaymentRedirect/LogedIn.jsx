import {Button} from "reactstrap"

export default function LogedIn(props) {
    return(
        <>
      <h1
        className="txtcenter"
        style={{ paddingTop: "25vh", justifySelf: "center" }}
      >
        Thank you for donating through Karma Box! 
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
          <Button type="submit" onClick={() => window.location.href = props.return } color="warning">
            Head back to your previous website!
          </Button>
      </div>
        </>
    )
}
