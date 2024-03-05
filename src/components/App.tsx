import { Container } from "react-bootstrap";
import { Signup } from "./Signup";
import { Login } from "./Login";

import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

import { Forgot } from "./Forgot"
import { UpdateProfile } from "../pages/UpdateProfile";

function App() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Routes>
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/forgot-password" element={<Forgot/>} />
							<Route
								path="/"
								element={
									<AuthMiddleware>
										<Profile />
									</AuthMiddleware>
								}
							/>
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
										<UpdateProfile/>
									</AuthMiddleware>
								}
							/>
						</Routes>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
