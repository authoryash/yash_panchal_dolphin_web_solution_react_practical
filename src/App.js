import { useEffect, useState } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
import Axios from "./utils/axios";
import Headers from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOrder, setSortingOrder] = useState("None");
  const [filteredProducts, setFilteredProducts] = useState([]);

  let currentProductList = !!filteredProducts.length
    ? filteredProducts
    : allProducts;

  if (sortingOrder !== "None") {
    const multiplier = sortingOrder === "Ascending" ? 1 : -1;
    currentProductList = [...currentProductList].sort(
      (a, b) => (parseFloat(a.price) - parseFloat(b.price)) * multiplier
    );
  }

  const currentProducts = currentProductList.slice(
    currentPage - 1,
    currentPage + 4
  );

  useEffect(() => {
    Axios.get("/products").then(({ data }) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((item) => {
      const regex = new RegExp(`^${searchValue}`, "i");
      return regex.test(item.name);
    });
    setFilteredProducts(filteredProducts);
  }, [allProducts, searchValue]);

  return (
    <>
      <Headers
        setSearchValue={setSearchValue}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      <Grid container spacing={2} padding={2}>
        {currentProducts.map(({ name, image, price, id, slug }) => (
          <ProductCard
            key={`${id}-${slug}`}
            name={name}
            image={image}
            price={price}
          />
        ))}
      </Grid>
      <Stack alignItems="center" paddingBottom={2}>
        <Pagination
          count={Math.ceil(currentProductList.length / 5)}
          showFirstButton
          showLastButton
          onChange={(_e, pageNumber) => setCurrentPage(pageNumber)}
        />
      </Stack>
    </>
  );
}

export default App;
