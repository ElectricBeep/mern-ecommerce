import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;

    ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
    flex: 1;
    padding: 0 50px;
`;

const Image = styled.img`
    width: 100%;
`;

const InfoContainer = styled.div`
    flex: 1;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;

    ${mobile({ textAlign: "center" })}
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;

    ${mobile({ width: "100%" })}
`;

const ColorFilterContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #e7e7e7;
    padding: 3px 5px;
    border-radius: 20px;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`
    
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    border-radius: 3px;

    &:hover{
        background-color: #d6f9fa;
    }
`;

const WarningText = styled.div`
    padding: 40px;
`;

const SelectedColorContainer = styled.div`
    display: flex;
`;

const SelectedColorText = styled.div`
    margin-bottom: 20px;
    margin-right: 10px;
`;

const SelectedColorColor = styled.div`

`;

const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    //For wardning message
    const [warning, setWarning] = useState(false);

    //To dispatch redux action
    const dispatch = useDispatch();

    //Get product
    useEffect(() => {
        const getProduct = async () => {
            const res = await publicRequest.get("https://mernecommerce-backend.herokuapp.com/api/products/find/" + productId);
            setProduct(res.data);
        };
        getProduct();
    }, [productId]);

    const handleQuantity = (type) => {
        if (type === "decrease") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    //Sending product, quantity and price to the cart
    const handleClick = () => {
        dispatch(addProduct({
            ...product,
            quantity,
            color,
            size
        }));
    };

    const user = useSelector((state) => state.user.currentUser);

    const handleClickWaring = () => {
        setWarning(true);
        setTimeout(function () {
            setWarning(false);
        }, 2500);
    };

    return (
        <Container>
            <Navbar />
            <Annoucement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product?.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>${product?.price}</Price>
                    <FilterContainer>
                        <ColorFilterContainer>
                            <FilterTitle>Color</FilterTitle>
                            {product?.color?.map((c) => (
                                <FilterColor
                                    color={c}
                                    key={c}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </ColorFilterContainer>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product?.size?.map((s) => (
                                    <FilterSizeOption key={s}>
                                        {s}
                                    </FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <SelectedColorContainer>
                        <SelectedColorText>Selected Color: </SelectedColorText>
                        <SelectedColorColor>{color}</SelectedColorColor>
                    </SelectedColorContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("decrease")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("increase")} />
                        </AmountContainer>
                        {user ? (
                            <Button onClick={handleClick}>ADD TO CART</Button>
                        ) : (
                            <Button onClick={handleClickWaring}>ADD TO CART</Button>
                        )}
                    </AddContainer>
                    {warning && <WarningText>Sign in to add items to the cart!</WarningText>}
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product