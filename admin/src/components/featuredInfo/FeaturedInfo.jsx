import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../redux/requestMethods";

export default function FeaturedInfo() {
    //For orders
    const [income, setIncome] = useState([]);
    const [precentage, setPrecentage] = useState(0);
    //For users
    const [activeUsers, setActiveUsers] = useState([]);
    const [userPrecentage, setUserPrecentage] = useState(0);
    //For products
    const [products, setProducts] = useState([]);
    const [productsPrecentage, setProductsPrecentage] = useState(0);

    //Income
    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
                //Getting precentage by deviding this month's total with the last month's total
                setPrecentage((res.data[1]?.total * 100) / res.data[0]?.total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getIncome();
    }, []);

    //Users
    useEffect(() => {
        const getUsersStats = async () => {
            try {
                const res = await userRequest.get("users/stats");
                setActiveUsers(res.data);
                setUserPrecentage((res.data[1]?.total * 100) / res.data[0]?.total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getUsersStats();
    }, []);

    //Products
    useEffect(() => {
        const getProductsStats = async () => {
            try {
                const res = await userRequest.get("products/stats");
                setProducts(res.data);
                setProductsPrecentage((res.data[1]?.total * 100) / res.data[0]?.total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getProductsStats();
    }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">${income[0]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(precentage) || 0}{" "}
                        {precentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">New Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{activeUsers[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(userPrecentage)}{" "}
                        {userPrecentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">New Products</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{products[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(productsPrecentage)}{" "}
                        {productsPrecentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
