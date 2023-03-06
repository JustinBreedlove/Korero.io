import React from "react";
import styled from "styled-components";


export const Header1 = ({text}) => {
	const Root = styled.h1`
        text-align: center;
	`;
    

	return <Root>{text}</Root>;
};
