import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link as ReactRouterLink } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("assets/login.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 3px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }

    &:hover {
        background-color: #008080d5;
    }
`;

const Error = styled.span`
    color: red;
`;

const Redirect = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AdminLink = styled.a`
    color: inherit;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin} disabled={isFetching}>
                        LOG IN
                    </Button>
                    {error && <Error>Something went wrong!</Error>}
                    <Redirect>
                        <ReactRouterLink to="/register" style={{ color: "inherit" }}>
                            CREATE A NEW ACCOUNT
                        </ReactRouterLink>
                        <AdminLink href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            ADMIN LOGIN
                        </AdminLink>
                    </Redirect>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login