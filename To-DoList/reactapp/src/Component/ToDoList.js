import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

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
                    <a className="navbar-brand">UserName</a>
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
                            <tr>
                                <td>Develop</td>
                                <td><i className="bi bi-check bi-3x"></i></td>
                                <td>
                                    <button className="btn"><i className="bi bi-info bi-3x" style={{ color: 'blue' }}></i></button>
                                    <button className="btn"><i className="bi bi-trash bi-3x" style={{ color: 'red' }} ></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>Learn English</td>
                                <td><i className="bi bi-x bi-3x"></i></td>
                                <td>
                                    <button className="btn"><i className="bi bi-info bi-3x" style={{ color: 'blue' }}></i></button>
                                <button className="btn"><i className="bi bi-trash bi-3x" style={{ color: 'red' }} ></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>Develop Game</td>
                                <td><i className="bi bi-x bi-3x"></i></td>
                                <td>
                                    <button className="btn"><i className="bi bi-info bi-3x" style={{ color: 'blue' }}></i></button>
                                    <button className="btn"><i className="bi bi-trash bi-3x" style={{ color: 'red' }} ></i></button>
                                </td>
                            </tr>
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
                                    <Form.Control type="text" placeholder="Enter task name" />
                                </Form.Group>
                                {/* Add more form fields as needed */}

                                <Button variant="primary" type="submit">
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

