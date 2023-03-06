import React from "react";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Header1 } from "../components/Header1";
import { Header3 } from "../components/Header3";
import { Color } from "../meta/Color.ts";
import { Select } from "../components/Select";
import { Option } from "../components/Option";

export const Register = () => {
	let firstname = "";
	let lastname = "";
	let email = "";
	let phone = "";
	let username = "";
	let carrier = "verizon";
	let password1 = "";
	let password2 = "";
	let [_, setUsernameLocal] = useLocalStorage('username', username)
	const onChangeFirstNameHandler = (e) => {
		firstname = e.target.value;
	};
	const onChangeLastNameHandler = (e) => {
		lastname = e.target.value;
	};
	const onChangeEmailHandler = (e) => {
		email = e.target.value;
	};
	const onChangePhoneHandler = (e) => {
		phone = e.target.value;
	};
	const onChangeUsernameHandler = (e) => {
		username = e.target.value;
	};
	const onChangeCarrierHandler = (e) => {
		carrier = e.target.value;
	};
	const onChangePassword1Handler = (e) => {
		password1 = e.target.value;
	};
	const onChangePassword2Handler = (e) => {
		password2 = e.target.value;
	};


	const onClickRegisterHandler = () => {
		if (password1 != password2) return;

		let body = {
			username,
			phone,
			email,
			firstname,
			lastname,
			carrier,
			password: password1
		}

		fetch(`/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			  },
			body: JSON.stringify(body)
		}).then((res) =>
		{
			if(!res.ok) return

			window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/otp`)
			
	
		});
		setUsernameLocal(username)

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
        align-items: center;
		width: max(100% - 78rem, 45%);
        padding-top; 0px;
		margin-inline: auto;
		background-color: ${Color.Primary};
		align-text: center;
        padding: 2rem 0rem 2rem 0rem;
		box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-webkit-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-moz-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
	`;
	const InputContainer = styled.div`
		display: flex;
		flex-direction: row;
		width: max(100% - 3rem);
	`;

	const carrierOptions = [<Option val="Verizon" />, <Option val="ATT" />, <Option val="TMobile" />, <Option val="Sprint" />];

	/**
	 * #TODO: Add a preferred method for 2fa (phone or email)
	 * #TODO: Send data to backend using /createuser endpoint
	 * #TODO: Redirect user to OTP verification after submitting form and
	 * 			verifying the 2XX response code from /createuser
	 * #TODO: Handle 4XX/5XX response codes from /createuser
	 */
	return (
		<Root>
			<Container>
				<Header1 text={"Welcome to Korero"} />
				<Header3 text={"where your privacy matters"} />
				<InputContainer>
					<Input onChangeHandler={onChangeFirstNameHandler} text={"First name"} />
					<Input onChangeHandler={onChangeLastNameHandler} text={"Last name"} />
				</InputContainer>
				<InputContainer>
					<Input onChangeHandler={onChangeEmailHandler} text={"Email"} />
					<Input onChangeHandler={onChangePhoneHandler} text={"Phone Number"} />
				</InputContainer>
				<InputContainer>
					<Input onChangeHandler={onChangeUsernameHandler} text={"Username"} />
					<Select onChangeHandler={onChangeCarrierHandler} options={carrierOptions} text={"Carrier"} />
				</InputContainer>
				<InputContainer>
					<Input onChangeHandler={onChangePassword1Handler} type={"password"} text={"Password"} />
					<Input onChangeHandler={onChangePassword2Handler} type={"password"} text={"Confirm Password"} />
				</InputContainer>
				{/** For 2FA implementation using phone number */}
				{/* <InputContainer>
				<p><b>Preferred 2FA Method:</b></p>
					<Input onChangeHandler={onChangeUsernameHandler} type =  {"radio"} text={"Password"} value = {"Phone"}/>
					<Input onChangeHandler={onChangeUsernameHandler} type =  {"radio"} text={"Password"} value = {"Email"}/>

				</InputContainer> */}
				<Button onClickHandler={onClickRegisterHandler} goto={"/register"} text={"Register"} type={"secondary"} />
				<Divider size={1} />
				<Button goto={"/login"} text={"Login"} type={"primary"} />

			</Container>
		</Root>
	);
};
