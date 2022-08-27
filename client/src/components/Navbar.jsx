import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useState } from "react";

const Container = styled.div`
    height: 60px;

    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

// const Language = styled.span`
//     font-size: 14px;
//     cursor: pointer;

//     ${mobile({ display: "none" })}
// `;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    outline: none;

    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${mobile({ justifyContent: "center" })}
`;

const MenuItemText = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    padding: 5px 7px;
    border-radius: 5px;

    &:hover {
        background-color: #f3f3f3;
    }

    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemIcon = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    padding: 5px 7px;
    border-radius: 50%;

    &:hover {
        background-color: #f3f3f3;
    }

    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const WarningText = styled.div`
    position: absolute;
    right: 0;
    padding: 15px;
    width: 230px;
    background-color: white;
`;

const UserImg = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`;

const Navbar = () => {
    //Pulling from redux 
    const quantity = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const wishlistQuantity = useSelector((state) => state.wishlist?.products?.length);

    //For warning
    const [warning, setWarning] = useState(false);

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleClick = () => {
        setWarning(true);
        setTimeout(function () {
            setWarning(false);
        }, 2500);
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    {/* <Language>EN</Language> */}
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "grey", fontSize: "16px" }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                        <Logo>MyShop.</Logo>
                    </Link>
                </Center>
                <Right>
                    {user ? (
                        <>
                            <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
                                <MenuItemText>
                                    WISHLIST ({wishlistQuantity})
                                </MenuItemText>
                            </Link>
                            <MenuItemText onClick={handleLogout}>
                                LOGOUT
                            </MenuItemText>
                            <Link to={`/usersettings/${user._id}`}>
                                <UserImg src={user?.img ? user.img : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} />
                            </Link>
                        </>
                    ) : (
                        <><Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                            <MenuItemText>REGISTER</MenuItemText>
                        </Link>
                            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                                <MenuItemText>SIGN IN</MenuItemText>
                            </Link>
                        </>
                    )}
                    {user ? (
                        <Link to="/cart" style={{ color: "inherit" }}>
                            <MenuItemIcon>
                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </MenuItemIcon>
                        </Link>
                    ) : (
                        <MenuItemIcon>
                            <ShoppingCartOutlined onClick={handleClick} />
                        </MenuItemIcon>
                    )}
                </Right>
                {warning && <WarningText>Sign in to use cart!</WarningText>}
            </Wrapper>
        </Container>
    )
}

export default Navbar;