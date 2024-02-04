import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            error: null,
            redirectToLogin: false,
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, confirmPassword } = this.state;

        // Check if the password and confirm password match
        if (password !== confirmPassword) {
            this.setState({ error: 'Password and confirm password do not match.' });
            return;
        }

        try {
            const response = await fetch('https://localhost:7184/api/User/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    confPassword: confirmPassword,
                }),
            });

            if (response.ok) {
                // Successful registration
                console.log('User registered successfully');
                // Redirect to login page
                this.setState({ redirectToLogin: true });
            } else {
                // Handle registration failure
                const data = await response.json();
                this.setState({ error: data.message || 'Registration failed.' });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            this.setState({ error: 'An error occurred while processing your request.' });
        }
    };

    render() {
        const { username, password, confirmPassword, error, redirectToLogin } = this.state;

        // Redirect to login page after successful signup
        if (redirectToLogin) {
            return <Navigate to="/login" />;
        }

        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="card-title text-center">Sign Up</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="exampleInputUserName1">UserName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUserName1"
                                    aria-describedby="usernameHelp"
                                    placeholder="Enter UserName"
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputConfirmPassword1"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;