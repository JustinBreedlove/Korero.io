import React from "react";
import styled from "styled-components";


export const Header2 = ({text}) => {
	const Root = styled.h2`
        text-align: center;
		font-size: 1px;
		filter: none;

	`;

	return <Root>{text}</Root>;
};
