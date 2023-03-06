import React from "react";
import styled from "styled-components";


export const Header1 = ({text}) => {
	const Root = styled.h1`
        text-align: center;
		margin: 0px;
		filter: none;
	`;
    

	return <Root>{text}</Root>;
};
