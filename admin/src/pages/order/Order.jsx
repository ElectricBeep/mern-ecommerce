import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../redux/requestMethods";
import { updateOrder } from "../../redux/apiCalls";
import "./order.css";

const Order = () => {
    //To get order
    const [order, setOrder] = useState([]);

    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    //For updating
    const [inputs, setInputs] = useState({});

    //To display message
    const [successful, setSuccessful] = useState(false);

    //Fetch order
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await userRequest.get(`/orders/find/singleorder/${orderId}`);
                setOrder(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getOrder();
    }, [orderId]);

    //For updating
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        const id = orderId;
        const order = { ...inputs };
        updateOrder(dispatch, id, order);
        setSuccessful(true);
        setTimeout(function () {
            setSuccessful(false);
        }, 2500);
    };

    return (
        <div className="order">
            <div className="orderTitleContainer">
                <h1 className="orderTitle">Order</h1>
            </div>
            <div className="orderContainer">
                <div className="orderTop">
                    <div className="orderTopLeft">
                    </div>
                    <div className="orderTopRight">
                        <div className="orderInfoTop">
                            <span className="orderName">order id: {order?._id}</span>
                        </div>
                        <div className="orderInfoBottom">
                            <div className="orderInfoItem">
                                <span className="orderInfoKey">id:</span>
                                <span className="orderInfoValue">{order?.userId}</span>
                            </div>
                            <div className="orderInfoItem">
                                <span className="orderInfoKey">amount:</span>
                                <span className="orderInfoValue">${order?.amount}</span>
                            </div>
                            <div className="orderInfoItem">
                                <span className="orderInfoKey">address:</span>
                                <span className="orderInfoValue">
                                    {order?.address?.country},{" "}{order?.address?.city}
                                </span>
                            </div>
                            <div className="orderInfoItem">
                                <span className="orderInfoKey">status:</span>
                                <span className="orderInfoValue">{order?.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="orderBottom">
                    <form className="orderForm">
                        <div className="orderFormLeft">
                            <label>Order Amount</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder={`$${order?.amount}`}
                                onChange={handleChange}
                            />
                            <label>Order Status</label>
                            <select
                                name="status"
                                id="status"
                                onChange={handleChange}
                            >
                                <option>Choose Option</option>
                                <option value="pending">Pending</option>
                                <option value="declined">Declined</option>
                                <option value="approved">Approved</option>
                            </select>
                            <button className="orderUpdateButton" onClick={handleUpdate}>
                                Update
                            </button>
                        </div>
                    </form>
                    {successful && <div className="orderMessage">Update Was Successful!</div>}
                </div>
            </div>
        </div>
    )
}

export default Order