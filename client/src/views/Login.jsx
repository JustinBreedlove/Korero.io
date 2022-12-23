import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Header1 } from "../components/Header1";
import { Header3 } from "../components/Header3";
import { Color } from "../meta/Color.ts";

export const Login = () => {
	let username = "";
	let password = "";
	const [error, setError] = useState("");
	const onChangeUsernameHandler = (e) => {
		username = e.target.value;
	};

	const onChangePasswordHandler = (e) => {
		password = e.target.value;
	};

	const onClickLoginHandler = (e) => {
		e.preventDefault();
		
		fetch(`/session/login`, {
			headers: {
				"x-korrero-username": username,
				"x-korrero-password": password
			}
		}).then((res) => {
			if (res.status === 403) {
				setError("Invalid credentials...");
				return;
			}
			setError("");
			window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/inbox`);

		});
	};

	const Root = styled.div`
		display: flex;
		height: max(100% - 1rem);
		align-items: center;
	`;

	const Container = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: max(100% - 78rem, 45%);
        padding-top; 0px;
		margin-inline: auto;
		background-color: ${Color.Primary};
        padding: 2rem 0rem 2rem 0rem;
		box-shadow: 0px 0px 21px 2px  ${ error ? "red" : "rgba(189,218,222,0.49)"} ;
		-webkit-box-shadow: 0px 0px 21px 2px ${ error ? "red" : "rgba(189,218,222,0.49)"};
		-moz-box-shadow: 0px 0px 21px 2px ${ error ? "red" : "rgba(189,218,222,0.49)"};
	`;
	const InputContainer = styled.div`
		box-color :
		display: flex;
		margin-inline: auto;
		flex-direction: column;
		width: 55%;
	`;
	const ErrorBox = styled.div`
		display: flex;
		margin-inline: auto;
		flex-direction: column;
		width: 55%;
	`;

	return (
		<Root>
			<Container>
				<Header1 text={"Please login"} />
				<Header3 text={"to continue to Korero"} />
				{error ? (
					<ErrorBox>
						<Header3 text={error} />
					</ErrorBox>
				) : (
					[]
				)}
				<Divider size={3} />
				<InputContainer>
					<Input onChangeHandler={onChangeUsernameHandler} text={"Username"} />
					<Input onChangeHandler={onChangePasswordHandler} type={"password"} text={"Password"} />
				</InputContainer>
				<Button onClickHandler={onClickLoginHandler} text={"Login"} type={"primary"} />
				<Divider size={1} />

				<Button goto={"/register"} text={"Register"} type={"secondary"} />
			</Container>
		</Root>
	);
};
