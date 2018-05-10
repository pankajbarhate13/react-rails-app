// import React from "react"
// import PropTypes from "prop-types"
// import axios from 'axios'



// class Signin extends React.Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   handleEmailChange = (e) => {
//     this.setState({email: e.target.value})
//   }

//   handlePasswordChange = (e) => {
//     this.setState({password: e.target.value})
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     var email = this.state.email;
//     var password = this.state.password;
//     var handleToUpdate = this.props.errors;
//     axios.post('/users/sign_in.json', { user: { email: email, password: password, remember_me: 0 } })
//       .then((response) => {
//         window.location = '/home';
//       })
//       .catch(function(error){
//         console.log(error)
//       })
//   }
//   render () {
//     return (

//       <div>
//         <center>
//           <h4><strong>Welcome to Quote Shape</strong></h4>
//         </center>

//         <div>
//           <h2>Signin</h2>
//           <form>
//             <input id="email" onChange={this.handleEmailChange} placeholder="email"/>
//             <input id="password" onChange={this.handlePasswordChange} placeholder="password"/>
//             <button onClick={this.handleSubmit}>Submit</button>
//           </form>
//         </div>

//       </div>
//     );
//   }
// }

// export default Signin




import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

const text = "Let's take test drive your car ";
const url = "/forgot_password";
const url1 = "/users/sign_up";

const required = (value) => {
  if (!value.toString().trim().length) {
    return 'require';
  }
};
const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error">{value} is not a valid email.</span>
  }
};
const password = (value) => {
  if (value.toString().trim().length < 6 ) {
    return <span className="form-error">Password is too short</span>;
  }
};

class Signin extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formError: {}
    };
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    var handleToUpdate = this.props.errors;
    axios.post('/users/sign_in.json', { user: { email: email, password: password, remember_me: 0 } })
      .then((response) => {
        // fill out the api response
        // console.log("it worked!", response);
        window.location = '/home';
      }).catch((error) => {
        console.log("it error!", error.response)
        this.setState({formError: {id: 12345678, type: 'error', text: error.response.data.error}})
        handleToUpdate({id: 12345678, type: 'error', text: error.response.data.error})
      });
  }
  render () {
    return (

      <div>
        <center>
          <h4><strong>Welcome to Audi</strong></h4>
          <p><b>{text}</b></p>
        </center>

        <Form onSubmit={this.handleSubmit}>
          
          <div className="form-group margin-top-40">
            <label className="form-control-label">Enter Your Email Address</label>
            <Input name="email "onChange={this.handleEmailChange} type="text" className="form-control" id="Email" validations={[required, email]} />
          </div>
          
          <div className="form-group">
            <label className="form-control-label">Enter Your Password</label>
            <Input name="password" onChange={this.handlePasswordChange} type="password" className="form-control" id="Password" validations={[required, password]} />
          </div>
          
          <div className="form-group">
            <p><a href={url}> Forgot your password? </a></p>
          </div>

          <div className="form-group">
            <p>Need an account? <a href={url1}>Sign up</a></p>
          </div>
        
          <div className="form-group">
            <Button type="submit" className="btn btn-warning waves-effect waves-light m-r-30 sing-in-btn">SIGN IN</Button>
          </div>
        </Form>

      </div>
    );
  }
}

export default Signin
