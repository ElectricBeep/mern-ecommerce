import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../redux/requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

export default function Product() {
    //To get product
    const [product, setProduct] = useState([]);

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    //For updating
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    //To display message
    const [successful, setSuccessful] = useState(false);

    //Fetch product
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await userRequest.get(`/products/find/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [productId]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    //For updating
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const dispatch = useDispatch();

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
                        const product = { ...inputs, img: downloadURL };
                        const id = productId;
                        updateProduct(dispatch, id, product);
                        setSuccessful(true);
                        setTimeout(function () {
                            setSuccessful(false);
                        }, 2500);
                    });
                }
            );
        } else {
            const id = productId;
            const product = { ...inputs };
            updateProduct(dispatch, id, product);
            setSuccessful(true);
            setTimeout(function () {
                setSuccessful(false);
            }, 2500);
        }
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.img} alt="" className="productInfoImg" />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product?.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={product?.title}
                            onChange={handleChange}
                        />
                        <label>Product Description</label>
                        <input
                            type="text"
                            name="desc"
                            placeholder={product?.desc}
                            onChange={handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder={product?.price}
                            onChange={handleChange}
                        />
                        <label>In Stock</label>
                        <select
                            name="inStock"
                            id="idStock"
                            onChange={handleChange}
                        >
                            <option>Choose Option</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <label>Set New Image</label>
                            {file && <img src={URL.createObjectURL(file)} alt="" className="productUploadImg" />}
                            <input
                                className="productUploadInput"
                                type="file"
                                id="img"
                                name="img"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button className="productButton" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </form>
                {successful && <div className="productMessage">Update Was Successful!</div>}
            </div>
        </div>
    );
}
