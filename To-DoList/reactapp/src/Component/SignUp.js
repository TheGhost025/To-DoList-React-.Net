import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
    };

    render() {
        const { username, password } = this.state;

        return (
            <div>
                <h2>Register</h2>
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
                    <button type="submit">SignUp</button>
                </form>
            </div>
        );
    }
}

export default SignUp;