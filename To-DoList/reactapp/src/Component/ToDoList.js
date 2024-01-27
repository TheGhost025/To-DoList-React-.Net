import React, { Component } from 'react';

class ToDoList extends Component {
    handleLogout = () => {
        // Add your logout logic here
        this.props.onLogout();
    };

    render() {
        return (
            <div>
                <h2>Todo List</h2>
                {/* Your TodoList component goes here */}
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default ToDoList;

