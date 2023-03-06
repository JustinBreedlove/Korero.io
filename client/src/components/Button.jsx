import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { Link } from "react-router-dom";

export const Button = ({ text, onClickHandler, type = "primary" | "secondary", goto }) => {
	let isPrimary = type == "primary";
	const Root = styled(Link)`
		display: flex;

		background-color: ${isPrimary ? Color.Accent2 : Color.Accent1};
		color: ${Color.Font};
		box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
		-webkit-box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
		-moz-box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
		border: none;
		border-radius: 5px;
		width: max(25%);
		margin-inline: auto;
		height: max(30px);
		padding: 10px;

		&:focus,
		&:hover,
		&:visited,
		&:link,
		&:active {
			text-decoration: none;
		}
		justify-content: center;
		align-items: center;
		vertical-align: middle;

		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;

		&:hover {
			background-color: ${Color.Accent3};
			transition-duration: 250ms;
		}
	`;

	return (
		<Root to={goto} onClick={onClickHandler}>
			{text}
		</Root>
	);
};
