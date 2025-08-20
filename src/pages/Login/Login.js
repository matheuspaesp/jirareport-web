import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "stores/ducks/auth";

import { AuthService, NotificationService } from "services";

import { Button, Col, InputField, Panel, Row } from "components/ui";

import "./Login.scss";

function Login(props) {
    const [state, setState] = useState({
        username: "",
        password: "",
        isLoading: false
    });

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = useCallback(() => {
        const { from } = location.state || { from: { pathname: "/boards" } };
        navigate(from);
    }, [location.state, navigate]);

    useEffect(() => {
        if (props.isLoggedIn) {
            redirect();
        }
    }, [props.isLoggedIn, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(prev => ({
            ...prev,
            isLoading: true
        }));

        try {
            const response = await AuthService.login(state.username, state.password);
            props.login(response.token, response.userConfig);

            redirect();

            NotificationService.notifySuccess("Login realizado com sucesso");
        } catch (e) {
            const response = e.response;
            const reason = response.headers['x-auth-fail-reason'];

            if (reason) {
                NotificationService.notifyError(reason);
            } else {
                NotificationService.notifyError("Usuário e/ou senha inválido(s)");
            }
        } finally {
            setState(prev => ({
                ...prev,
                isLoading: false
            }));
        }
    };

    const handleChange = (event) => {
        setState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const { password, username, isLoading } = state;

    return <div className="container login__container">
        <Row>
            <Col s={12} l={6} offsetL={3}>
                <Panel loading={isLoading}>
                    <div className="login-panel__header-container">
                        <h4 className="login-panel__header center-align">Login</h4>
                    </div>

                    <Row>
                        <InputField s={12}
                                    name="username"
                                    onChange={handleChange}
                                    label="Usuário"
                                    value={username}
                        />

                        <InputField s={12}
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    label="Senha"
                                    value={password}
                        />

                        <Col s={12}>
                            <Button type="submit" block onClick={handleSubmit}>
                                Entrar
                            </Button>
                        </Col>
                    </Row>
                </Panel>
            </Col>
        </Row>
    </div>;
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...authActions
    }, dispatch);

const mapStateToProps = state => ({
    ...state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
