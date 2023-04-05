//! Universal button function that was used in multiple locations
const FullWidthButton = (props) => {
    return <div className="d-grid gap-2 mb-4">{props.children}</div>;
  };
  
  export default FullWidthButton;