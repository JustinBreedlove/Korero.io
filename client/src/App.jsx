import React from "react";
import styled from "styled-components";

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

function App() {
	const Root = styled.div`
    display:flex;
    justify-content: center;
		height: 100vh;
		width: 100vw;
    background-color: ${Color.Background}
	`;
	const Container = styled.div`
    top: 25px;
    position:fixed;
    width: min(100% - 4rem, 45%);
    margin-inline: auto;

  `;
  const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: max(20rem);
    align-items: center;
  `
	return (
		<Root>
			<Router>
				<Container>
					<NavBar
						children={[
              <ProfilePic/>,
              <Spacer size = {3}/>,
              <Buttons>
							<NavButton goto = "/inbox" text={"Inbox"} />
							<NavButton goto = "/login" text={"Login"} />
							<NavButton goto = "/register" text={"Register"}/>
							<NavButton goto = "/settings" text={"Settings"}/>
              </Buttons>
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

