import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";

export const Select = ({ options, onChangeHandler}) => {
	const Root = styled.select`
    display: flex;

    background-color: ${Color.Secondary};

    box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
    -webkit-box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
    -moz-box-shadow: 1px 0px 400px -27px rgba(255, 118, 117, 1);
    border: none;
    border-radius: 5px;
    height: max(30px);
    padding: 10px;
    width: 100%;
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
        background-color: ${Color.Accent3};

        transition-duration: 250ms;
    }

	`;

	return <Root onChange={onChangeHandler}>{options}</Root>;
};
