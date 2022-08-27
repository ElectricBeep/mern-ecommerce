import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authRedux";

export default function Topbar() {
    const user = useSelector((state) => state.user.currentUser)

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">E-commerceAdmin.</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topbarNotificationsText">No notifications</span>
                    </div>
                    <span className="logoutButton" onClick={handleLogout}>
                        Log out
                    </span>
                    <img src={user?.img || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
