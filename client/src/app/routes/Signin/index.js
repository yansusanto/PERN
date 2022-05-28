import React, {useState} from "react";
import {useHistory, useLocation} from "react-router";
import axios from "axios";
import {useDispatch} from "react-redux";
import {signin} from "../../state/authSlice";

import "./index.scss";

const Signin = () => {
	let history = useHistory();
	let location = useLocation();
	let {from} = location.state || {
		from: {pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT},
	};

	const dispatch = useDispatch();

	const defaultLocalState = {
		loginId: "",
		password: "",
	};

	const [localState, setLocalState] = useState(defaultLocalState);

	const handleChange = (e) => {
		e.preventDefault();
		setLocalState({...localState, [e.target.name]: e.target.value});
	};

	const onClickSignin = async (e) => {
		try {
			e.preventDefault();

			if (localState.loginId === "" || localState.password === "") {
				window.alert("Login Id or Password cannot be blank.");
				return;
			}
			const res = await axios.post("/auth/local", {
				login_id: localState.loginId,
				password: localState.password,
			});

			setLocalState(defaultLocalState);

			if (res.status === 200) {
				const {expires, user} = res.data.payload;
				dispatch(signin({expires, user}));
				history.replace(from);
			}
		} catch (error) {
			console.error(error);
			if (error.response && error.response.data) {
				window.alert(error.response.data.message);
			}
		}
	};

	return (
		<div className="container">
			<div class="row align-items-center justify-content-center">
				<div class="col col-md-4">
					<h2>Sign In</h2>
					<hr />
					<div className="form-floating mb-3">
						<input
							type="email"
							placeholder="name@example.com"
							name="loginId"
							value={localState.loginId}
							onChange={handleChange}
							className="form-control"
						/>
						<label for="floatingInput">Email</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={localState.password}
							onChange={handleChange}
							className="form-control"
						/>
						<label for="floatingInput">Password</label>
					</div>
					<button
						onClick={onClickSignin}
						className="btn btn-lg btn-outline-primary w-100"
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signin;
