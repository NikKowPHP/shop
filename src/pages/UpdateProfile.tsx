import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function UpdateProfile() {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
	const {
		currentUser,
		updateEmailForCurrentUser,
		updatePasswordForCurrentUser,
	} = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		const promises = [];
		setLoading(true);
		setError("");
		if (passwordRef.current && passwordConfirmRef.current) {
			const passwordValue = passwordRef.current.value;
			const confirmPasswordValue = passwordConfirmRef.current.value;

			if (passwordValue !== confirmPasswordValue) {
				return setError("Password do not match");
			}
			promises.push(updatePasswordForCurrentUser(passwordValue));
		}

		if (emailRef.current && currentUser) {
			if (emailRef.current.value !== currentUser.email) {
				promises.push(updateEmailForCurrentUser(emailRef.current.value));
			}
		}

		Promise.all(promises)
			.then(() => {
				navigate("/profile");
			})
			.catch((e) => {
				setError(e.message);
				console.error(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<>
			{currentUser && (
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Update Profile</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									ref={emailRef}
									required
									defaultValue={currentUser.email}
								/>
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									ref={passwordRef}
									placeholder="Leave blank to keep the same"
								/>
							</Form.Group>
							<Form.Group id="password-confirm">
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type="password"
									ref={passwordConfirmRef}
									placeholder="Leave blank to keep the same"
								/>
							</Form.Group>
							<Button className="w-100 mt-2" type="submit" disabled={loading}>
								Update
							</Button>
						</Form>
					</Card.Body>
					<div className="w-100 text-center mt-2">
						<Link to="/">Cancel</Link>
					</div>
				</Card>
			)}
		</>
	);
}
