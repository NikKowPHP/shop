import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Forgot } from "./components/Forgot";
import { Profile } from "./pages/Profile";
import { UpdateProfile } from "./pages/UpdateProfile";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          <Navbar />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route
                path="/profile"
                element={
                  <AuthMiddleware>
                    <Profile />
                  </AuthMiddleware>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <AuthMiddleware>
                    <UpdateProfile />
                  </AuthMiddleware>
                }
              />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
