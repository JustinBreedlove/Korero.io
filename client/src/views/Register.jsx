import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Header1 } from "../components/Header1";
import { Header3 } from "../components/Header3";
import { Color } from "../meta/Color.ts";

export const Register = () => {
	let username = "";
	let password = "";

	const onChangeUsernameHandler = (e) => {
		username = e.target.value;
	};

	const onChangePasswordHandler = (e) => {
		password = e.target.value;
	};

	const onClickLoginHandler = () => {
		console.log(username, password);
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
        align-items: center;
		width: max(100% - 78rem, 45%);
        padding-top; 0px;
		margin-inline: auto;
		background-color: ${Color.Primary};
		align-text: center;
        padding: 2rem 0rem 2rem 0rem;
	`;
	const InputContainer = styled.div`
		display: flex;
		flex-direction: row;
		width: max(100% - 3rem);
	`;
	return (
		<Root>
			<Container>
				<Header1 text={"Welcome to Korero"} />
				<Header3 text={"where your privacy matters"} />
				<InputContainer>
					<Input text={"First name"} />
					<Input text={"Last name"} />
				</InputContainer>
				<InputContainer>
					<Input text={"Email"} />
					<Input text={"Phone Number"} />
				</InputContainer>
				<InputContainer>
					<Input onChangeHandler={onChangeUsernameHandler} text={"Username"} />
					<Input onChangeHandler={onChangePasswordHandler} text={"Carrier"} />
				</InputContainer>
                <InputContainer>
					<Input onChangeHandler={onChangeUsernameHandler} type =  {"password"} text={"Password"} />
					<Input onChangeHandler={onChangePasswordHandler} type =  {"password"} text={"Confirm Password"} />
				</InputContainer>

				<Button onClickHandler={onClickLoginHandler} text={"Login"} type={"primary"} />
				<Divider size={1} />

				<Button goto={"/register"} text={"Register"} type={"secondary"} />
			</Container>
		</Root>
	);
};
