import React from 'react'
import styled from 'styled-components'
import { Color } from "../meta/Color.ts";

const Root = styled.div`
    width: 100%;
    height: min(100% - 4rem);
    display: flex;
    background-color: ${Color.Secondary};
`
export const Settings = () =>
{
    return(<Root>Settings</Root>)
}