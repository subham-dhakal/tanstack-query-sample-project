import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsList from "./pages/products/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </Router>
  );
}

export default App;
