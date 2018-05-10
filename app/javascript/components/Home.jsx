import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {file: '',imagePreviewUrl: ''};
//   }

//   _handleSubmit(e) {
//     e.preventDefault();
//     // TODO: do something with -> this.state.file
//     console.log('handle uploading-', this.state.file);
//     axios.post('/items.json', { item: { picture: this.state.files } })
//       .then((response) => {
//         // fill out the api response
//         // console.log("it worked!", response);
//         window.location = '/';
//       }).catch((error) => {
//         console.log("it error!", error.response)
//       });
//   }

//   _handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//   }

//   render() {
//     let {imagePreviewUrl} = this.state;
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} />);
//     } else {
//       $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
//     }

//     return (
//       <div className="previewComponent">
//         <form onSubmit={(e)=>this._handleSubmit(e)}>
//           <input className="fileInput" 
//             type="file" 
//             onChange={(e)=>this._handleImageChange(e)} />
//           <button className="submitButton" 
//             type="submit" 
//             onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
//         </form>
//         <div className="imgPreview">
//           {$imagePreview}
//         </div>
//       </div>
//     )
//   }
// }
  
// export default Home


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = '/items.json';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    // return  post(url, formData,config)
    axios.post('/items.json', { item: { picture: formData } })
      .then((response) => {
        // fill out the api response
        // console.log("it worked!", response);
        window.location = '/';
      }).catch((error) => {
        console.log("it error!", error.response)
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default Home
