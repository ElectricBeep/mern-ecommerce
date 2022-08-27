import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { deleteProduct, getAllProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductList() {
    const dispatch = useDispatch();

    //Get all products
    useEffect(() => {
        getAllProducts(dispatch);
    }, [dispatch]);

    //So I can dislay products on the page
    const products = useSelector((state) => state.products.products);

    const handleDelete = (id) => {
        deleteProduct(dispatch, id);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 120 },
        { field: "price", headerName: "Price in $", width: 135 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={row => row._id}
            />
        </div>
    );
}
