import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Header1 } from "../components/Header1";
import { Header3 } from "../components/Header3";
import { Color } from "../meta/Color.ts";
import { Error } from "../components/Error"

/**
 * 
 * @returns 
 * 
 * Create two pages. OTP page, then password reset page.
 */

export const ResetPassword = () => {
	let username = "";
	const error = useRef([]);
	const [isError, setIsError] = useState(false)
	const onChangePasswordOneHandler = (e) => {
		username = e.target.value;
	};
	const onChangePasswordTwoHandler = (e) => {
		username = e.target.value;
	};

	const onClickResetPasswordHandler = (e) => {
		e.preventDefault();
		setIsError(false)

		let body = {
			username,
		}

		fetch(`/password/reset`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			  },
			body: JSON.stringify(body)
		}).then((res) => {
			if (res.status === 403) {
				error.current = [<Error errorMessage = {"Invalid Account Details"}/>]
				setIsError(true)

				return;
			}
			if (!res.status)
			{
				error.current = [<Error errorMessage = {"Unkown Error"}/>]
				setIsError(true)

				return;
			}
			setIsError(false);
			error.current = [];
			window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/login`);

		});
	};

	const Root = styled.div`
		display: flex;
		height: max(100% - 1rem);
		align-items: center;
		background-color: ${Color.Secondary};

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
		box-shadow: 0px 0px 21px 2px  ${ isError ? "red" : "rgba(189,218,222,0.49)"} ;
		-webkit-box-shadow: 0px 0px 21px 2px ${ isError ? "red" : "rgba(189,218,222,0.49)"};
		-moz-box-shadow: 0px 0px 21px 2px ${ isError ? "red" : "rgba(189,218,222,0.49)"};
	`;
	const InputContainer = styled.div`
		box-color :
		display: flex;
		margin-inline: auto;
		flex-direction: column;
		width: 55%;
	`;


	return (
		<Root>
			<Container>
				<Header1 text={"Password Reset"} />
				<Header3 text={"Please enter your username, email, or phone number associated with your account."} />
				{isError ? error.current : []}
				<InputContainer>
					<Input onChangeHandler={onChangePasswordOneHandler} text={"Password"} />
					<Input onChangeHandler={onChangePasswordTwoHandler} text={"Confirm Password"} />

				</InputContainer>
				<Button onClickHandler={onClickResetPasswordHandler} text={"Reset"} type={"primary"} />

			</Container>
		</Root>
	);
};
