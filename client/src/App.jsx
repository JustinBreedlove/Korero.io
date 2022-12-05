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

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Color } from "./meta/Color.ts";
import io from "socket.io-client";

const App = () => {
	const [isAuthed, setIsAuthed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [is500, setIs500] = useState(false);

	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {});
	const Root = styled.div`
		display: flex;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		background-color: ${Color.Background};
	`;
	const Container = styled.div`
		top: 25px;
		position: fixed;
		width: min(100% - 4rem, 70%);
		height: min(100% - 4rem);
		margin-inline: auto;
		box-shadow: 1px 0px 129px 27px rgb(153, 153, 153);
		-webkit-box-shadow: 1px 0px 129px 27px rgb(153, 153, 153);
		-moz-box-shadow: 1px 0px 129px 27px rgb(153, 153, 153);
	`;
	const Buttons = styled.div`
		display: flex;
		justify-content: space-between;
		width: max(15rem);
		align-items: center;
	`;
	const NavBarHeader = styled.div``;

	useEffect(() => {
		fetch("/live").then((res) => {
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
	}, [isLoading, is500]);
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
											<ProfilePic src={Cookies.get("userid")} />,
											<Spacer size={3} />,
											<Buttons>
												<NavButton goto="/inbox" text={"Inbox"} />
												<NavButton goto="/settings" text={"Settings"} />
												<NavButton
													onClickHandler={() => {
														{
															fetch("/session/logout");
															setIsAuthed(false);
															window.location.replace("http://localhost:3000/login")

														}
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
							<Route exact path="/inbox" element={isAuthed ? <Inbox /> : <Login />} />
							<Route exact path="/login" element={isAuthed ? <Inbox /> : <Login />} />
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

