import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { updateUser } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 20px;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.div`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Left = styled.div`
    flex: 1;
`;

const Right = styled.div`
    flex: 1;
    position: relative;
`;

const Label = styled.label`
    padding: 5px;
`;

const Input = styled.input`
    margin-bottom: 20px;
    width: 400px;
    height: 25px;
    border-radius: 3px;
    border: 1px solid lightgray;
`;

const FormWrapperRight = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
    padding: 20px;
`;

const InputImg = styled.input`
    margin-top: 10px;
`;

const SuccessText = styled.span`
    margin-top: 20px;
    text-align: center;
    color: green;
    font-size: 18px;
`;

const Button = styled.button`
    margin-top: 30px;
    width: 200px;
    height: 30px;
    background-color: teal;
    color: white;
    border: none;
    border-radius: 3px;
    font-weight: 700;
    position: absolute;
    bottom: 40px;
    cursor: pointer;

    &:hover{
        background-color: #008080d1;
    }
`;

const UserSettings = () => {
    //For fetching user
    const [user, setUser] = useState([]);
    //For text inputs
    const [inputs, setInputs] = useState({});
    //For image
    const [file, setFile] = useState(null);
    //To display message
    const [successful, setSuccessful] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    //Fetch user
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


    //For updating text inputs state
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    //Updating
    const dispatch = useDispatch();
    // const handleUpdate = () => {
    //     updateUser(dispatch, userId, inputs);
    // };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (file !== null) {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log("Upload is paused");
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const user = { ...inputs, img: downloadURL };
                        const id = userId;
                        updateUser(dispatch, id, user);
                        setSuccessful(true);
                        setTimeout(function () {
                            setSuccessful(false);
                        }, 4500);
                    });
                }
            );
        } else {
            const id = userId;
            const user = { ...inputs };
            updateUser(dispatch, id, user);
            setSuccessful(true);
            setTimeout(function () {
                setSuccessful(false);
            }, 4500);
        }
    };

    return (
        <Container>
            <Annoucement />
            <Navbar />
            <Wrapper>
                <Title>Update Your Profile</Title>
                <Form>
                    <Left>
                        <FormWrapper>
                            <Label>Name</Label>
                            <Input
                                placeholder={user.name ? user.name : "Your Name"}
                                type="text"
                                name="name"
                                onChange={handleChange}
                            />
                            <Label>Lastname</Label>
                            <Input
                                placeholder={user.lastname ? user.lastname : "Your Lastname"}
                                type="text"
                                name="lastname"
                                onChange={handleChange}
                            />
                            <Label>Username</Label>
                            <Input
                                placeholder={user.username}
                                type="text"
                                name="username"
                                onChange={handleChange}
                            />
                            <Label>Email</Label>
                            <Input
                                placeholder={user.email}
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                            <Label>Password</Label>
                            <Input
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                            <Label>Phone</Label>
                            <Input
                                placeholder="+123 456 789"
                                type="text"
                                name="phone"
                                onChange={handleChange}
                            />
                            <Label>Address</Label>
                            <Input
                                placeholder={user.address ? user.address : "Your Address"}
                                type="text"
                                name="address"
                                onChange={handleChange}
                            />
                        </FormWrapper>
                    </Left>
                    <Right>
                        <FormWrapperRight>
                            <Label>Change Profile Picture</Label>
                            {file ? (
                                <Image src={URL.createObjectURL(file)} />
                            ) : (
                                <Image src={user?.img ? user.img : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} />
                            )}
                            <InputImg
                                type="file"
                                name="img"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {successful && (
                                <SuccessText>
                                    Successful! You may need to log in again for changes to take effect.
                                </SuccessText>
                            )}
                            <Button onClick={handleUpdate}>UPDATE ACCOUNT</Button>
                        </FormWrapperRight>
                    </Right>
                </Form>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default UserSettings