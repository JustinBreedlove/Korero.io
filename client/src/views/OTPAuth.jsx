import React from "react";
import styled from "styled-components";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Header1 } from "../components/Header1";
import { Header3 } from "../components/Header3";
import { Color } from "../meta/Color.ts";
import { useReadLocalStorage } from "usehooks-ts";

export const OTPAuth = () => {
	let otp = "";
	let localUsername = useReadLocalStorage("username");

	const onChangeOTPHandler = (e) => {
		otp = e.target.value;
	};

	const onClickValidateHandler = () => {
		let body = {
			otp,
			username: localUsername
		};

		fetch(`/createuser/checkotp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}).then((res) => {
			if (!res.ok) {
				return;
			}
			window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/inbox`);
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
		box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-webkit-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-moz-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
	`;
	const InputContainer = styled.div`
		display: flex;
		margin-inline: auto;
		flex-direction: column;
		width: 55%;
	`;
	return (
		<Root>
			<Container>
				<Header1 text={"Please enter the pin"} />
				<Header3 text={"to validate your account"} />

				<Divider size={3} />
				<InputContainer>
					<Input onChangeHandler={onChangeOTPHandler} type={"text"} text={"6-Digit Pin"} />
				</InputContainer>
				<Divider size={1} />

				<Button onClickHandler={onClickValidateHandler} text={"Validate"} type={"secondary"} />
			</Container>
		</Root>
	);
};
