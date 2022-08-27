import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useDispatch } from "react-redux"
import { updateUser } from "../../redux/apiCalls";
import { userRequest } from "../../redux/requestMethods";

export default function User() {
    const [user, setUser] = useState({});
    //For updating
    const [inputs, setInputs] = useState({});
    //To display message
    const [successful, setSuccessful] = useState(false);

    const location = useLocation();

    const userId = location.pathname.split("/")[2];

    const dispatch = useDispatch();

    //Get user
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await userRequest.get(`/users/find/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [userId]);

    //For updating
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleUpdate = () => {
        updateUser(dispatch, userId, inputs);
        setSuccessful(true);
        setTimeout(function () {
            setSuccessful(false);
        }, 2500);
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={user?.img ? user.img : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user?.username}</span>
                            <span className="userShowUserTitle">Software Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user?.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">10.12.1999</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">+1 123 456 67</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user?.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">New York | USA</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder={user?.username}
                                    className="userUpdateInput"
                                    name="username"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={user?.email}
                                    className="userUpdateInput"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+1 123 456 67"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="New York | USA"
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={user?.img ? user.img : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
                                    alt=""
                                />
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton" onClick={handleUpdate}>
                                Update
                            </button>
                        </div>
                    </form>
                    {successful && <div className="userUpdateMessage">Update Was Successful!</div>}
                </div>
            </div>
        </div>
    );
}
