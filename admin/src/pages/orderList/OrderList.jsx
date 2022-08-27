import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteOrder, getAllOrders } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function OrderList() {
    const dispatch = useDispatch();

    //Get all orders
    useEffect(() => {
        getAllOrders(dispatch);
    }, [dispatch]);

    const orders = useSelector((state) => state.orders.orders);

    const handleDelete = (id) => {
        deleteOrder(dispatch, id);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "userId",
            headerName: "User",
            width: 200,
        },
        { field: "amount", headerName: "Amount $", width: 135 },
        {
            field: "address", headerName: "Address", width: 135,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.address.country},{" "}{params.row.address.city}
                    </div>
                );
            },
        },
        { field: "status", headerName: "Status", width: 135 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/order/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                getRowId={row => row._id}
            />
        </div>
    );
}
