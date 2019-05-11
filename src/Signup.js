import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
import axios from 'axios';

class Signup extends Component{
    state = {
        users: [],
        newUserData:{
            name: '',
            username: '',
            password: ''
        }

    }
    handleClick(ele){
        this.setState({ [ele.target.name]: ele.target.value })
    }
    send(event){
        event.preventDefault();
        const logindata={
            name: this.state.name,
            username: this.state.usersname,
            password: this.state.password
        }

        axios.post('http://localhost:8383/api/v2/users/user', logindata).then(response =>{
            let { users } = this.state;

            users.push(response.data)
        })
    }

    render(){
        let users = this.state.users.map((user) => {
            return(
                <div>
                    <h2>Sign Up</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                type="text"
                                placeholder="Name"
                                value={this.state.name}
                                name="name"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                type="text"
                                placeholder="Username"
                                value={this.state.usernanme}
                                name="username"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                type="password"
                                placeholder="Password"
                                value={this.state.paswword}
                                name="password"/>
                            </FormGroup>
                        </Col>
                        <Button color="success" size="sm" onClick = {this.send.bind(
                            this, user.id, user.name, user.username, user.paswword
                        )}>Submit</Button>
                    </Form>
                </div>
                )
            });
        }

}
export default Signup;