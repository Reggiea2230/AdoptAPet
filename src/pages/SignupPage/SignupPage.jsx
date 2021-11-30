import React, {useState} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import userService from '../../utils/userService';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';


export default function SignUpPage(props) {

const navigate = useNavigate();  
const [error, setError] = useState('');
const[selectedFile, setSelectedFile] = useState('');
const [state, setState] = useState({
  username: '',
  email: '',
  password: '',
  passwordConf: '',
  bio: '',
});

  function handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', selectedFile);
    for(let key in state){
      formData.append(key, state[key])
    }
    try {
      await userService.signup(formData);
      props.handleSignUpOrLogin()
      navigate('/')
    }catch(err){
      console.log(err.message)
      setError(err.message)
    }
  }

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }
  
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image src="https://i.imgur.com/KX3MlSh.png" /> Sign Up
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
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
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
              label="Missing Pet Info"
              name="bio"
              value={state.bio}
              placeholder="Tell us about your pet that is missing"
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
