import { useState } from "react";
import "./login.css";
import { login } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        history.push("/")
    };

    return (
        <div className="login">
            <form className="loginForm">
                <h2 className="loginTitle">Hello, Admin!</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="loginInput"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="loginButton"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login