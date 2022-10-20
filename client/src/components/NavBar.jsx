import React from 'react'
import styled from 'styled-components'
import { Color } from "../meta/Color.ts"

export const NavBar = ({children}) =>
{
    const Root = styled.nav`
        display: flex;
        justify-content: space-between;
        background-color: ${Color.Secondary};
        width: min(100%);
        padding: 8px;
    `
    return(<Root>{children}</Root>)
}