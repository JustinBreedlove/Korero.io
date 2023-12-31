import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

import { ProfilePic } from "./components/ProfilePic";
import { NavBar } from "./components/NavBar";
import { NavButton } from "./components/NavButton";
import { Spacer } from "./components/Spacer";

import { Inbox } from "./views/Inbox";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Settings } from "./views/Settings";
import { OTPAuth } from "./views/OTPAuth";
import { ForgotPassword } from "./views/ForgotPassword";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Color } from "./meta/Color.ts";
import { Header3 } from "./components/Header3";
import { OTPReset } from "./views/OTPReset";
import { ResetPassword } from "./views/ResetPassword";

const App = () => {
	const [isAuthed, setIsAuthed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [is500, setIs500] = useState(false);


	const Root = styled.div`
		color: ${Color.Font};
		display: flex;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		background-color: ${Color.Background};
		background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, ${Color.Background} 40px ), repeating-linear-gradient( ${Color.Background}, ${Color.Secondary} );
	`;
	const Container = styled.div`
		top: 25px;
		position: fixed;
		width: min(100% - 4rem, 70%);
		height: min(100% - 4rem);
		margin-inline: auto;
		box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-webkit-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
		-moz-box-shadow: 0px 0px 21px 2px rgba(189,218,222,0.49);
	`;
	const Buttons = styled.div`
		display: flex;
		justify-content: space-between;
		width: max(15rem);
		align-items: center;
	`;
	const NavBarHeader = styled.div``;

	useEffect(() => {

		fetch(`/live`).then((res) => {
			if (res.status >= 200 && res.status <= 299) {
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setIs500(true);
			}
			if (Cookies.get("sessionid") == 0) {
				setIsAuthed(false);
			}
			else
			{
				setIsAuthed(true)
			}
		});
	}, []);
	return (
		<Root>
			{isLoading ? (
				"loading"
			) : is500 ? (
				"error 500"
			) : (
				<Router>
					<Container>
						<NavBar
							children={
								isAuthed
									? [
											<ProfilePic src={Cookies.get("userid")} label = {<Header3 text = {Cookies.get('username')}/>}/>,
											,

											<Spacer size={5} />,
											<Buttons>
												<NavButton goto="/inbox" text={"Inbox"} />
												<NavButton goto="/settings" text={"Settings"} />
												<NavButton
													onClickHandler={() => {
															fetch(`/session/logout`, {method: "GET"});
															setIsAuthed(false);
															window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/login`)

													}}
													goto="/logout"
													text={"Logout"}
												/>
											</Buttons>
									  ]
									: [<NavBarHeader>Korero.io</NavBarHeader>]
							}
						/>

						<Routes>
							<Route path="/" element={isAuthed ? <Inbox /> : <Login />} />
							<Route path="/otp" element={<OTPAuth/>} />
							<Route exact path="/inbox" element={isAuthed ? <Inbox /> : <Login />} />
							<Route exact path="/login" element={isAuthed ? <Inbox /> : <Login />} />
							<Route exact path="/forgot" element={isAuthed ? <Inbox /> : <ForgotPassword />} />
							<Route exact path="/otpreset" element={isAuthed ? <Inbox /> : <OTPReset />} />
							<Route exact path="/resetpassword" element={isAuthed ? <Inbox /> : <ResetPassword />} />
							<Route exact path="/register" element={isAuthed ? <Login /> : <Register />} />
							<Route exact path="/settings" element={isAuthed ? <Settings /> : <Login />} />
						</Routes>
					</Container>
				</Router>
			)}
		</Root>
	);
};

export default App;

