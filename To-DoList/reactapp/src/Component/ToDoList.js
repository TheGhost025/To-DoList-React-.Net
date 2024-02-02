import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            toDoList: [],
            newTaskName: '',
            selectedTask: null,
        };
    }

    componentDidMount() {
        // Fetch the to-do list when the component mounts
        this.fetchToDoList();
    }

    fetchToDoList = async () => {
        try {
            // Get the user ID from the state or wherever you store it
            const userId = this.props.userId;

            const response = await fetch(`https://localhost:7184/api/ToDo?userId=${userId}`);

            if (response.ok) {
                const toDoList = await response.json();
                this.setState({ toDoList });
            } else {
                console.error('Failed to fetch to-do list');
            }
        } catch (error) {
            console.error('An error occurred while fetching the to-do list', error);
        }
    };

    handleAddTask = async () => {
        try {
            const userId = this.props.userId;

            const response = await fetch(`https://localhost:7184/api/ToDo?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.newTaskName,
                    status: false,
                    user_id: this.props.userId
                }),
            });

            if (response.ok) {
                this.fetchToDoList(); // Refresh the to-do list after adding a task
                this.handleClose();
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('An error occurred while adding the task', error);
        }
    };

    handleUpdateButtonClick = async (task) => {
        try {
            const userId = this.props.userId;

            const response = await fetch(`https://localhost:7184/api/ToDo/${task.id}`, {
                method: 'PUT',
                //headers: {
                //    'Content-Type': 'application/json',
                //},
                //body: JSON.stringify({
                //    Name: task.name,
                //    Status: !task.status,
                //}),
            });

            if (response.ok) {
                this.fetchToDoList(); // Refresh the to-do list after updating a task
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('An error occurred while updating the task', error);
        }
    };
    handleDeleteButtonClick = async (task) => {
        try {
            const userId = this.props.userId;

            const response = await fetch(`https://localhost:7184/api/ToDo/${task.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.fetchToDoList(); // Refresh the to-do list after deleting a task
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('An error occurred while deleting the task', error);
        }
    };

    handleLogout = () => {
        // Add your logout logic here
        this.props.onLogout();
    };

    handleShow = () => {
        this.setState({ showModal: true });
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">{this.props.username}</a>
                    <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
                </nav>

                <div>
                    <h2 class="text-center">Todo List</h2>
                    {/* Your TodoList component goes here */}

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th><button className="btn btn-success" onClick={this.handleShow}>Add</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.toDoList.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>
                                        {task.status ? (
                                            <i className="bi bi-check bi-3x" />
                                        ) : (
                                            <i className="bi bi-x bi-3x" />
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleUpdateButtonClick(task)}>
                                            <i className="bi bi-info bi-3x" style={{ color: 'blue' }} />
                                        </button>
                                        <button className="btn" onClick={() => this.handleDeleteButtonClick(task)}>
                                            <i className="bi bi-trash bi-3x" style={{ color: 'red' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal for Add Task */}
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Your form content goes here */}
                            <Form>
                                {/* Form fields go here */}
                                <Form.Group controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task name"
                                        value={this.state.newTaskName}
                                        onChange={(e) => this.setState({ newTaskName: e.target.value })} />
                                </Form.Group>
                                {/* Add more form fields as needed */}

                                <Button variant="primary" onClick={this.handleAddTask}>
                                    Add Task
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ToDoList;

