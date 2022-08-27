import "./newUser.css";
import { useState } from "react";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewUser() {
    const [inputs, setInputs] = useState({});

    const [successful, setSuccessful] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        addUser(dispatch, inputs);
        setSuccessful(true);
        setTimeout(function () {
            setSuccessful(false);
        }, 2500);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="john"
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="john@gmail.com"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="+1 123 456 78"
                        name="phone"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="New York, USA"
                        name="address"
                        onChange={handleChange}
                    />
                </div>
                <button className="newUserButton" onClick={handleClick}>
                    Create
                </button>
            </form>
            {successful && <div className="newUserMessage">User has been created!</div>}

        </div>
    );
}
