import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        this.props.onLogin();
    };

    render() {
        const { username, password } = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <br />
                    <button type="submit">SignIn</button>
                </form>
            </div>
        );
    }
}

export default SignIn;