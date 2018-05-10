// import React from "react"
// import PropTypes from "prop-types"
// import axios from 'axios'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { Redirect } from 'react-router'

// class Signup extends React.Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       password_confirmation: "",
//     };

//     this.handleSignup = this.handleSignup.bind(this);
//   }

//   handleEmailChange = (e) => {
//     this.setState({email: e.target.value})
//   }

//   handlePasswordChange = (e) => {
//     this.setState({password: e.target.value})
//   }

//   handleConfirmPasswordChange = (e) => {
//     this.setState({password_confirmation: e.target.value})
//   }

//   handleSignup(e) {
//     e.preventDefault();
//     let that = this
//     var email = this.state.email;
//     var password = this.state.password;
//     var password_confirmation = this.state.password_confirmation;

//     // axios.post('/users', {
//     //   user: {
//     //     email: document.getElementById("email").value,
//     //     password: document.getElementById("password").value,
//     //     password_confirmation: document.getElementById("password_confirmation").value
//     //   }
//     // })

//     axios.post('/users', { user: {email: email, password: password, password_confirmation: password_confirmation } })
    

//     .then(function(response){
//       that.props.changePage("delete");
//       that.props.updateCurrentUser(email);
//     })
//     .catch(function(error){
//       console.log(error)
//     })

// }

// render() {
//   return (
//       <div>
//         <h2>Signup</h2>
//         <form>
//           <input id="email" onChange={this.handleEmailChange} placeholder="email"/>
//           <input id="password" onChange={this.handlePasswordChange} placeholder="password"/>
//           <input id="password_confirmation" onChange={this.handleConfirmPasswordChange} placeholder="retype password"/>
//           <button onClick={this.handleSignup}>Submit</button>
//         </form>
//         <button onClick={() => this.props.changePage("login")}>Back to Login</button>
//       </div>
//     );
//   };
// };


// export default Signup

// ==================================================================================


import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import RegisterConfirm from './RegisterConfirm'
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

const text = "Let's Get Started";
const url = '/';
const url1 = "/users/sign_in";
const required = (value) => {
  if (!value.toString().trim().length) {
    return ' ';
  }
};
const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error">{value} is not a valid email.</span>
  }
};
const password = (value,props,components) => {
  if (components['confirm'][0].value.length > 0 && value !== components['confirm'][0].value) {
    return <span className="form-error">Passwords are not equal.</span>;
  }
};

class Signup extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      pageFrom: "",
      loading: '',
      isRedirect: false
    };
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({password_confirmation: e.target.value})
  }

  handleSubmit = (e) => {
    let that = this
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    var password_confirmation = this.state.password_confirmation;
    this.setState({ loading: 'true' }, () => {
      axios.post('/users.json', { user: {email: email, password: password, password_confirmation: password_confirmation } })
        .then((response) => this.setState({
          pageFrom: 'Signup',
          isRedirect: true,
          loading: ''
        }))
        .catch((error) => {
          console.log("it worked!", error.response)
        });
    });
  }

  render () {
    if (this.state.isRedirect){
      return (
        <Router>
          <Switch>
            <Route exact={true} path='/home' render={()=><Home />}/>
            <Redirect to={url}/>
          </Switch>
        </Router>
      );
    }else{
      return (
        <div>
          <div className="card-block">
            <center>
              <h4><strong>{text}</strong></h4>
            </center>
            
            <Form onSubmit={this.handleSubmit}>
              
              <div className="form-group">
                <label className="form-control-label">Enter Your Email Address</label>
                <Input name="email" onChange={this.handleEmailChange} type="text" className="form-control" id="Email" placeholder="info@company.com" validations={[required, email]} />
              </div>
              
              <div className="form-group">
                <label className="form-control-label">Password</label>
                <Input name="password" onChange={this.handlePasswordChange} type="password" className="form-control" id="Password" validations={[required, password]} />
              </div>

              <div className="form-group">
                <label className="form-control-label">Confirm password</label>
                <Input name="confirm" onChange={this.handleConfirmPasswordChange} type="password" className="form-control" id="Confirm-password" validations={[required, confirm]} />
              </div>

              <div className="form-group">
                <Button type="submit" className="btn btn-warning waves-effect waves-light m-r-30 sing-in-btn">Signup</Button>
              </div>

              <div className="form-group">
                <p><a href={url1}>Signin</a></p>
              </div>

            </Form>

          </div>
        </div>
      );
    }
  }
}

export default Signup
