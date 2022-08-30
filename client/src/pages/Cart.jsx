import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useHistory } from "react-router-dom";
import { clearCart, removeProduct } from "../redux/cartRedux";
import { Clear } from '@mui/icons-material';
import { clearWishlist, removeWishlistProduct } from "../redux/wishlistRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 20px;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};

    &:hover {
        background-color: #f3f3f3;
    }
`;

const TopButtonEmptyCart = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background-color: red;
    color: white;

    &:hover {
        background-color: #ff0000c3;
    }
`;

const TopTexts = styled.div`

    ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    cursor: pointer;
    margin: 0px 10px;

    &:hover {
        text-decoration: underline;
    }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-around;
    position: relative;

    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`
    
`;

const ProductId = styled.span`
    
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
    
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;

    ${mobile({ marginBottom: "20px" })}
`;

const ClearIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: #f3f3f3;
    }
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span`

`;

const GoToProductButton = styled.div`
    padding: 5px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid black;
    background-color: transparent;
    text-align: center;

    &:hover {
        background-color: #f3f3f3;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #000000cf;
    }
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const [selected, setSelected] = useState("bag");
    const wishlist = useSelector((state) => state.wishlist);

    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                });
                console.log(res.data);
                //Passing data with history hook
                history.push("/success", {
                    stripeData: res.data,
                    products: cart,
                });
            } catch (err) {
                console.log(err);
            }
        };
        //If stripe token exists, make request
        stripeToken && makeRequest();
    }, [stripeToken, cart, history]);

    //To clear cart
    const dispatch = useDispatch();
    const handleEmptyCart = () => {
        dispatch(clearCart());
    };

    //To remove item from cart
    const handleRemoveItem = (id) => {
        dispatch(removeProduct(id));
    };

    //To clear wishlist
    const handleEmptyWishlist = () => {
        dispatch(clearWishlist());
    };

    //To remove item from wishlist
    const handleDeleteWishlistItem = (id) => {
        dispatch(removeWishlistProduct(id));
    }

    return (
        <Container>
            <Navbar />
            <Annoucement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to="/">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText onClick={() => setSelected("bag")}>
                            Shopping Bag ({cart.quantity})
                        </TopText>
                        <TopText onClick={() => setSelected("wishlist")}>
                            Your Wishlist ({wishlist?.products?.length})
                        </TopText>
                    </TopTexts>
                    {selected === "bag" ? (
                        <TopButtonEmptyCart onClick={handleEmptyCart}>
                            EMPTY CART
                        </TopButtonEmptyCart>
                    ) : (
                        <TopButtonEmptyCart onClick={handleEmptyWishlist}>
                            EMPTY WISHLIST
                        </TopButtonEmptyCart>
                    )}
                </Top>
                <Bottom>
                    {selected === "bag" ? (
                        <>
                            <Info>
                                {cart.products.map((item) => (
                                    <div key={item._id}>
                                        <Product>
                                            <ProductDetail>
                                                <Image src={item.img} />
                                                <Details>
                                                    <ProductName><b>Product:</b> {item.title}</ProductName>
                                                    <ProductId><b>ID:</b> {item._id}</ProductId>
                                                    <ProductColor color={item.color} />
                                                    <ProductSize><b>Size:</b> {item.size}</ProductSize>
                                                </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                                <ProductAmountContainer>
                                                    <Add />
                                                    <ProductAmount>{item.quantity}</ProductAmount>
                                                    <Remove />
                                                </ProductAmountContainer>
                                                <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                                            </PriceDetail>
                                            <ClearIcon onClick={() => handleRemoveItem(item._id)}>
                                                <Clear />
                                            </ClearIcon>
                                        </Product>
                                        <Hr />
                                    </div>
                                ))}
                            </Info>
                            <Summary>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>Subtotal</SummaryItemText>
                                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                                    <SummaryItemPrice>$ 4.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Shipping Discount</SummaryItemText>
                                    <SummaryItemPrice>$ -4.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type="total">
                                    <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                                </SummaryItem>
                                <StripeCheckout
                                    name="My Shop"
                                    image="https://1000logos.net/wp-content/uploads/2020/04/The-Body-Shop-Logo.png"
                                    billingAddress
                                    shippingAddress
                                    description={`Yout total is $${cart.total}`}
                                    amount={cart.total * 100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button>CHECKOUT NOW</Button>
                                </StripeCheckout>
                            </Summary>
                        </>
                    ) : (
                        <Info>
                            {wishlist.products.map((item) => (
                                <div key={item.title}>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={item.img} />
                                            <Details>
                                                <ProductName><b>Product:</b> {item.title}</ProductName>
                                                <ProductId><b>ID:</b> {item._id}</ProductId>
                                                <Link to={`/product/${item._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                    <GoToProductButton>
                                                        Go to Product
                                                    </GoToProductButton>
                                                </Link>
                                            </Details>
                                        </ProductDetail>
                                        <ClearIcon onClick={() => handleDeleteWishlistItem(item._id)}>
                                            <Clear />
                                        </ClearIcon>
                                    </Product>
                                    <Hr />
                                </div>
                            ))}
                        </Info>
                    )}
                </Bottom>
            </Wrapper>
            <Footer />
        </Container >
    )
}

export default Cart