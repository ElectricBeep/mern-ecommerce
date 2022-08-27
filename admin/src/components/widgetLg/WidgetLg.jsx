import "./widgetLg.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../redux/requestMethods";
import moment from "moment";

export default function WidgetLg() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            const getOrders = async () => {
                const res = await userRequest.get("orders");
                setOrders(res.data);
            };
            getOrders();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                    {orders.slice(0, 8).map((order) => (
                        <tr className="widgetLgTr" key={order._id}>
                            <td className="widgetLgUser">
                                <span className="widgetLgName">{order.userId}</span>
                            </td>
                            <td className="widgetLgDate">{moment(order.createdAt).fromNow()}</td>
                            <td className="widgetLgAmount">${order.amount}</td>
                            <td className="widgetLgStatus">
                                <Button type={order.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}