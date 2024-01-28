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
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="card-title text-center">Sign Up</h1>
                            <div className="form-group">
                                <label htmlFor="exampleInputUserName1">UserName</label>
                                <input type="email" className="form-control" id="exampleInputUserName1" aria-describedby="usernameHelp" placeholder="Enter UserName" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;