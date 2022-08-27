import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    const handleCategories = (e) => {
        setCat(e.target.value.split(","));
    };

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
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
                    const product = { ...inputs, img: downloadURL, categories: cat };
                    addProduct(dispatch, product);
                });
            }
        );
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Black T-shirt"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Product description"
                        name="desc"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="$"
                        name="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input
                        type="text"
                        placeholder="dress,jeans,tshirt..."
                        onChange={handleCategories}
                    />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" id="" onChange={handleChange}>
                        <option>Set Option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button className="addProductButton" onClick={handleClick}>Create</button>
            </form>
        </div>
    );
}
