import { FavoriteBorder, Favorite, SearchOutlined, } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/wishlistRedux";

const Title = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: white;
    padding: 5px;
    border-radius: 20px;
    font-weight: 500;
`;

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 15px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Price = styled.div`
    background-color: white;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
`;

const Message = styled.div`
    background-color: white;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 20px;
`;

const Product = ({ item }) => {
    const [liked, setLiked] = useState(false);
    //Added to wishlist message
    const [message, setMessage] = useState(false);

    //To dispatch redux action
    const dispatch = useDispatch();

    const handleClick = () => {
        if (liked === false) {
            setLiked(true);
            dispatch(addProduct({
                ...item
            }));
            setMessage(true);
            setTimeout(function () {
                setMessage(false);
            }, 2500);
        } else {
            setLiked(false);
        }
    };


    return (
        <Container>
            <Title>{item.title}</Title>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ color: "inherit" }}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon onClick={handleClick}>
                    {liked ? <Favorite /> : <FavoriteBorder />}
                </Icon>
            </Info>
            <Price>$<b>{item.price}</b></Price>
            {message && <Message>Added to wishlist!</Message>}
        </Container>
    )
}

export default Product