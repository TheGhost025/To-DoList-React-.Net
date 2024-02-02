import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
        };
    }

     handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch('https://localhost:7184/api/User/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        confPassword : "dasf"
                    }),
                });

                if (response.ok) {
                    // Successful login, you can redirect or perform other actions
            const data = await response.json();

            // Extract userId from the response
                    const { userId, message } = data;
                    this.props.onLogin(userId, this.state.username);
                } else {
                    // Handle login failure
                    const errorData = await response.json(); // Assuming the server sends error details in JSON format
                    this.setState({ error: errorData.message || 'Login failed.' });
                }
            } catch (error) {
                // Handle network or unexpected errors
                console.error('An error occurred:', error.message);
                this.setState({ error: 'An error occurred while trying to log in.' });
            }
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="card-title text-center">Log In</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="exampleInputUserName1">UserName</label>
                                <input type="text" className="form-control" id="exampleInputUserName1" aria-describedby="usernameHelp" placeholder="Enter UserName" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="mt-3 text-center">
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;