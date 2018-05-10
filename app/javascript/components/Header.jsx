import React from "react"
import PropTypes from "prop-types"
// class Header extends React.Component {
//   render () {
//     return (
//       <React.Fragment>
//       </React.Fragment>
//     );
//   }
// }

// export default Header


class Header extends React.Component {

  constructor(props){
    super(props);
    if (this.props.currentUser == null){
      this.state = {
        page:"signin"
      }
    } else{
      this.state = {
        page: "delete"
      }
    }
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({
      page: newPage
    })
  }

  render() {
    switch(this.state.page) {
      case "signup":
        return <Signup changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
      case "login":
        return <Signin changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
      // case "delete":
      //   return <Logout changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
    }
  }
}

export default Header