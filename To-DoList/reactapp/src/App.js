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
            userId: null,
            username:null
        };
    }

    handleLogin = (userId,username) => {
        // Your authentication logic goes here
        // You can store the user ID and auth token in the state or local storage
        this.setState({
            isLoggedIn: true,
            userId,
            username
        });
    };

        handleLogout = () => {
            // Your logout logic goes here
            this.setState({ isLoggedIn: false, userId: null });
        };

    render() {
        const { isLoggedIn, userId, username } = this.state;
        //Routing between pages
            return (
                <Router>
                    <Routes>
                        <Route
                            path="/login"
                            element={isLoggedIn ? <Navigate to="/todos" /> : <SignIn onLogin={this.handleLogin} />}
                        />
                        <Route
                            path="/signup"
                            element={isLoggedIn ? <Navigate to="/todos" /> : <SignUp />}
                        />
                        <Route
                            path="/todos"
                            element={isLoggedIn ? <ToDoList username={username} userId={userId} onLogout={this.handleLogout} /> : <Navigate to="/login" />}
                        />
                        {/* You can use Navigate to handle the default redirection */}
                        <Route index element={<Navigate to="/todos" />} />
                    </Routes>
                </Router>
            );
    }
}
