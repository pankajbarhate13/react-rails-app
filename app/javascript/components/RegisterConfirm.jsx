import React from "react"
import PropTypes from "prop-types"

const url = "/users/sign_in";

class RegisterConfirm extends React.Component {
  render () {
    return (
      <div>
        <div className="card-block">
          <center>
            <h4><strong>Congratulations!</strong></h4>
            <h5 className="form-group margin-top-40">You have now registered Successfully.</h5>
            <p className="form-group margin-top-40"><b>Before you begin, please confirm your email address and then you're good to go.</b></p><br></br>
            <br></br>
          </center>
          
          <div className="form-group margin-top-40">
            <a href={url}><button className="btn btn-inverse-primary waves-effect waves-light m-r-30 sing-in-btn">LOGIN</button></a>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterConfirm
