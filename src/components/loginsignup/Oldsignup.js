import { Component } from 'react';

export default class MyTestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            hashedPswd: "",
            userRole: 0,
            isUserActive: 1
        }
        this.handleAddUser = this.handleAddUser.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onPswdChange = this.onPswdChange.bind(this);
    }

    onUserNameChange(e) {
        this.setState({ username: e.target.value });
    }
    onFirstNameChange(e) {
        this.setState({ firstname: e.target.value });
    }

    onLastNameChange(e) {
        this.setState({ lastname: e.target.value });
    }

    onPswdChange(e) {
        this.setState({ hashedPswd: e.target.value });
    }

    async handleAddUser(e) {
        e.preventDefault();
        console.log('VALUES', this.state.username);
        var userData = {
            userName: this.state.username,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            hashedPswd: this.state.hashedPswd
        }

        try {
            let res = await fetch("http://localhost:3000/api/addUser", {
                method: "POST",
                headers : new Headers({'content-type':'application/json'}),     //else will give reuest {} in server
                body: JSON.stringify({
                    userData: userData
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log('user added')
            }
            else {
                console.log('user not added')
            }


        }
        catch (err) {
            console.log(err);
        }
    }
        render()
        {
            return (
                <form onSubmit={this.handleAddUser}>
                    <label>Enter username:
                        <input
                            type="text"
                            name="userName"
                            value={this.state.username}
                            onChange={this.onUserNameChange}
                        />
                    </label>
                    <label>Enter firstname:
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.firstname}
                            onChange={this.onFirstNameChange}
                        />
                    </label>
                    <label>Enter lastname:
                        <input
                            type="text"
                            name="lastName"
                            value={this.state.lastname}
                            onChange={this.onLastNameChange}
                        />
                    </label>
                    <label>Enter your pswd:
                        <input
                            type="password"
                            name="hashedPswd"
                            value={this.state.hashedPswd}
                            onChange={this.onPswdChange}
                        />
                    </label>
                    <button type="submit" className="btn-block btn-primary"><b>Add user</b></button>

                </form>
            )
        }
    }

