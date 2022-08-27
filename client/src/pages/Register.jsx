import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("assets/register.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    text-align: center;
`;

const Error = styled.span`
    color: red;
    padding: 5px;
    font-weight: 600;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin-top: 20px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #008080d5;
    }
`;

const Register = () => {
    const [input, setInput] = useState("");

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        validateInput(e);
    };

    const validateInput = (e) => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    };

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        register(dispatch, {
            name: input.name,
            lastname: input.lastname,
            username: input.username,
            email: input.email,
            password: input.password
        });
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={validateInput}
                    />
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={validateInput}
                    />
                    <Agreement>
                        By creating an account, I consent to the
                        processing of my personal data in accordance with
                        the <b>PRIVACY POLICY</b>
                        <br />
                        <br />
                        Already have account? Click <Link to="/login" style={{ color: "inherit" }}><b>here</b></Link> to Log In!
                    </Agreement>
                </Form>
                <ErrorWrapper>
                    {error.username && <Error>{error.username}</Error>}
                    {error.password && <Error>{error.password}</Error>}
                    {error.confirmPassword && <Error>{error.confirmPassword}</Error>}
                </ErrorWrapper>
                <ButtonWrapper>
                    <Button onClick={handleRegister}>CREATE</Button>
                </ButtonWrapper>
            </Wrapper>
        </Container>
    )
}

export default Register