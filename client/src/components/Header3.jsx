import React from "react";
import styled from "styled-components";

export const Header3 = ({text}) => {
	const Root = styled.h2`
   	 	text-align: center;
		justify-content: center;
		padding: 0px;
		margin: 0px;
		font-size: 1rem;
		height: auto;
		filter: none;

	`;

	return <Root>{text}</Root>;
};
