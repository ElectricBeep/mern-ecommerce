import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    padding: 10px; 
    margin-top: 20px;
    background-color: teal;
    color: white;
    font-size: 18px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #008080d3;
    }
`;

const SuccesText = styled.div`
    font-size: 18px;
`;

const Success = () => {
    const location = useLocation();
    //Taking data from Cart.jsx
    const data = location.state.stripeData;
    const cart = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

    //Clear cart
    const dispatch = useDispatch();
    const handleEmptyCart = () => {
        dispatch(clearCart());
    };

    return (
        <Container>
            {orderId
                ? <SuccesText>
                    Order has been created successfully. Your order number is <b>{orderId}</b>
                </SuccesText>
                : <SuccesText>
                    Successfull. Your order is being prepared...
                </SuccesText>
            }
            <Link to="/">
                <Button onClick={handleEmptyCart}>Go to Homepage</Button>
            </Link>
        </Container>
    );
};

export default Success;