import React from "react";
import styled from "styled-components";

import { NavBar } from "./components/NavBar";
import { NavButton } from "./components/NavButton";

import { Inbox } from "./views/Inbox";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Settings } from "./views/Settings";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Color } from "./meta/Color.ts";
import { ProfilePic } from "./components/ProfilePic";

function App() {
	const Root = styled.div`
    display:flex;
    justify-content: center;
		height: 100vh;
		width: 100vw;
	`;
	const Container = styled.div`
    display: flexbox;
    width: 45%;
    align-content: flex-start;
  `;
	return (
		<Root>
			<Router>
				<Container>
					<NavBar
						children={[
              <ProfilePic></ProfilePic>,
							<NavButton goto = "/inbox" text={"Inbox"} />,
							<NavButton goto = "/login" text={"Login"} />,
							<NavButton goto = "/register" text={"Register"}/>,
							<NavButton goto = "/settings" text={"Settings"}/>
						]}
					/>

					<Routes>
						<Route path="/" element={<Inbox />} />
						<Route exact path="/inbox" element={<Inbox />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/settings" element={<Settings />} />
					</Routes>
				</Container>
			</Router>
		</Root>
	);
}

export default App;

