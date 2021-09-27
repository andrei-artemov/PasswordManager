import React, { useCallback, } from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Card } from 'react-bootstrap'
import './ModalReg.css'
import app from "../firebase"

    const ModalReg = (params) => {
        const {active, setActive, children, history} = params;

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
            
        } catch (error) {
            alert (error);
        }
    }, [history]);



    return (
        <div className={active ? "registration active" : "registration"} onClick={() => setActive(false)}>
            <div className={active ? "registration__content active" : "registration__content"} onClick={e => e.stopPropagation()}>
                {children}
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                        <Form onSubmit={handleSignUp}>
                            <Form.Group id="email" className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email"/>
                            </Form.Group>
                            <Form.Group id="password" className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" />
                            </Form.Group>
                            <Button className="w-100" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default withRouter(ModalReg);