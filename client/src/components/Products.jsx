import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); //When I change filter I'll updated this state

    //Get products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `${process.env.REACT_APP_BASE_URL}products?category=${cat}`
                        : `${process.env.REACT_APP_BASE_URL}products`
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [cat]);

    //Setting filteredProducts when filters change
    useEffect(() => {
        cat && setFilteredProducts(
            //Checking if item in products contains selected filters
            products.filter((item) =>
                //I check every objects key (color || size) and value (green || M)
                Object.entries(filters).every(([key, value]) =>
                    //Displaying if item key contains value
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters]);

    //For sorting
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        };
    }, [sort]);

    return (
        <Container>
            {cat
                ? filteredProducts.map((item) => (
                    <Product item={item} key={item._id} />
                ))
                : products.slice(0, 12).map((item) => (
                    <Product item={item} key={item._id} />
                ))}
        </Container>
    )
}

export default Products