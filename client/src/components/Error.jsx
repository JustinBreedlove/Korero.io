import React from "react";
import styled from "styled-components";
import { Header3 } from "./Header3";

export const Error = ({errorMessage}) => {

    const Root = styled.div`
    display: flex;
    margin-inline: auto;
    flex-direction: column;
    background-color: red;
    backdrop-filter: blur(50px);
    
    box-shadow: 0px 0px 21px 2px "red"  ;
    -webkit-box-shadow: 0px 0px 21px 2px "red" ;
    -moz-box-shadow: 0px 0px 21px 2px "red";		
    border-radius: 10px;
    padding: 3px;
    margin: 10px;
`;

	return (<Root>
    <Header3 text={errorMessage} />
    </Root>);
};


