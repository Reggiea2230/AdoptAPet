import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import userService from "../../utils/userService";
import { useNavigate } from 'react-router-dom';


export default function SignUpPage(props){

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio:'',
  });

  const [selectedFile, setSelectedFile] = useState('')

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e){
    e.preventDefault() 
    //forms with files only we have to do, evertything else can be json
    //take our state
    //create a formData object, for our fetch request
    const formData = new FormData();
    //adding our photo to the FormData, its key will be called Photo
    formData.append('photo', selectedFile)

    //now we must do the same thing with the rest of our state
    for(let key in state){
      formData.append(key, state[key])
    }

    //if you log out formData, you won't see anything
    console.log(formData, " <-This will show nothing")
    // you can look inside by doing this
    console.log(formData.forEach((item) => console.log(item)))



    try {
      // For Request that are sending over a photo, we must send formData
      await userService.signup(formData)
      
      props.handleSignUpOrLogin()
      navigate('/')

    } catch(err){
      setError(err.message)
    }

  }

  function handleFileInput(e){
    console.log(e.target.files)
    setSelectedFile(e.target.files[0])
  }
    
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://i.imgur.com/s4LrnlU.png" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Tell us what type of pet you're looking to adopt"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
      );
}
