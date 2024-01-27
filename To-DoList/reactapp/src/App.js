import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ToDoList from './Component/ToDoList';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';

export default class App extends Component {
    constructor(props) {

        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

        handleLogin = () => {
            // Your authentication logic goes here
            this.setState({ isLoggedIn: true });
        };

        handleLogout = () => {
            // Your logout logic goes here
            this.setState({ isLoggedIn: false });
        };

        render() {
            const { isLoggedIn } = this.state;

            return (
                <Router>
                    <Routes>
                        <Route
                            path="/login"
                            element={isLoggedIn ? <Navigate to="/todos" /> : <SignIn onLogin={this.handleLogin} />}
                        />
                        <Route
                            path="/register"
                            element={isLoggedIn ? <Navigate to="/todos" /> : <SignUp />}
                        />
                        <Route
                            path="/todos"
                            element={isLoggedIn ? <ToDoList onLogout={this.handleLogout} /> : <Navigate to="/login" />}
                        />
                        {/* You can use Navigate to handle the default redirection */}
                        <Route index element={<Navigate to="/todos" />} />
                    </Routes>
                </Router>
            );
    }
}
