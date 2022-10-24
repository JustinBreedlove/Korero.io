import React from 'react'
import styled from 'styled-components'
import { Color } from "../meta/Color.ts"

export const NavBar = ({children}) =>
{
    const Root = styled.nav`
        display: flex;
        justify-content: space-between;
        background: linear-gradient(70deg, ${Color.Primary} 24%, ${Color.Secondary} 90%);
        padding: 8px;

    `
    return(<Root>{children}</Root>)
}