import { FakestoreIndex } from './Fakestore-Components/fakestore-index';
import { FakestoreCategories } from './Fakestore-Components/fakestore-Categories';
import { FakestoreProducts } from './Fakestore-Components/fakestoreProducts';
import { FakeStoreDetails } from './Fakestore-Components/fakestore-Deatils';
import { FakestoreLogin } from './Fakestore-Components/fakestore-Login';
import { CartPage } from './Fakestore-Components/fakestore-cartpage';
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const cartCount = useSelector(state => state.cart.items.length);

  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 fixed-top">
          <h1 className="m-0">Fakestore</h1>
          <Link to="/cart" className="position-relative text-white" style={{ textDecoration: "none" }}>
            <i className="bi bi-cart4 fs-3"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
        </header>

        <div style={{ paddingTop: "4rem" }}> {/* Prevents content from being hidden under fixed header */}
          <Routes>
            <Route path="/" element={<FakestoreIndex />} />
            <Route path="categories" element={<FakestoreCategories />} />
            <Route path="products/:category" element={<FakestoreProducts />} />
            <Route path="/details/:id" element={<FakeStoreDetails />} />
            <Route path="login" element={<FakestoreLogin />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;