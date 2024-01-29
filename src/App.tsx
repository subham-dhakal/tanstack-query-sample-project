import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsList from "./pages/products/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
