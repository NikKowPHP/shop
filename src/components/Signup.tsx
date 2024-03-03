import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current && passwordConfirmRef.current) {
			const passwordValue = passwordRef.current.value;
			const confirmPasswordValue = passwordConfirmRef.current.value;

			if (passwordValue !== confirmPasswordValue) {
				return setError("Password do not match");
			}
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current?.value, passwordRef.current?.value);
			navigate("/profile");
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button className="w-100" type="submit" disabled={loading}>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
				<div className="w-100 text-center mt-2"></div>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account?<Link to="/login">Log In</Link>
			</div>
		</>
	);
}
