import styled from "styled-components";
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`
    margin: 20px 0;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ display: "none" })}
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ backgroundColor: "#f0f0f0" })}
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 100%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>MyShop.</Logo>
                <Desc>
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Ipsam fuga et assumenda dolorum dolore quaerat
                    pariatur aliquid. Doloremque repudiandae laudantium.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} />
                    622 Lorem lorem, South Lorem 98
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} />
                    +1 23 456 789
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} />
                    contact@gmail.com
                </ContactItem>
                <Payment src="assets/payment3.png" />
            </Right>
        </Container>
    )
}

export default Footer