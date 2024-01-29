import ProductList from "./components/ProductList";
import { ProductProvider } from "../../context/ProductContext";
function index() {
  return (
    <div>
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </div>
  );
}

export default index;
