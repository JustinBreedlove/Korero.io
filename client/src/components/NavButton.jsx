import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const NavButton = ({ text, goto }) => {
	const Root = styled(Link)`
		display: flex;

		background-color: ${Color.Primary};
		color: ${Color.Accent2};

		border: none;
		width: auto;
        height: min(100% - 25px);
		padding: 10px;

		&:focus,
		&:hover,
		&:visited,
		&:link,
		&:active {
			text-decoration: none;
		}

		align-items: center;
		text-align: center;
		vertical-align: middle;

	
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;

		&:hover {
			background-color: ${Color.Accent2};
			color: ${Color.Primary};
			transition-duration: 250ms;
		}
	`;

	return <Root to={goto}>{text}</Root>;
};
