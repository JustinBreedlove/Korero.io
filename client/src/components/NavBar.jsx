import React from 'react'
import styled from 'styled-components'
import { Color } from "../meta/Color.ts"

export const NavBar = ({children}) =>
{
    const Root = styled.nav`
        
        display: flex;
        background-color: ${Color.Secondary};
        justify-content: space-evenly;
        width: 100%;
        max-height: 70px;
    `
    return(<Root>{children}</Root>)
}