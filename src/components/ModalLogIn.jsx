import React, { useCallback, useContext, } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from "../firebase.js";
import { AuthContext } from "./Auth.js"
import { Form, Button, Card } from 'react-bootstrap'
import './ModalLogIn.css'

const ModalLogIn = ({active, setActive, children, history}) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");

            } catch (error) {
                alert (error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }


    return (
        <div className={active ? "login active" : "login"} onClick={() => setActive(false)}>
            <div className={active ? "login__content active" : "login__content"} onClick={e => e.stopPropagation()}>
                {children}
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group id="email" className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email"/>
                            </Form.Group>
                            <Form.Group id="password" className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" />
                            </Form.Group>
                            <Button className="w-100" type="submit">Log In</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default withRouter(ModalLogIn);