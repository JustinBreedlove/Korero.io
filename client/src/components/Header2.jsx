import React from "react";
import styled from "styled-components";


export const Header2 = ({text}) => {
	const Root = styled.h2`
        text-align: center;

	`;

	return <Root>{text}</Root>;
};
