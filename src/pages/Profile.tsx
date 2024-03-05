import { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Profile() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/login");
		} catch (e) {
			setError(e.message);
			console.error(e);
		}
	}
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email:</strong> {currentUser.email}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						Update Profile
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
}
