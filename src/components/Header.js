import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Top>
            <Link to="/">
                CINEFLEX
            </Link>
        </Top>
    )
}

const Top = styled.div`
    background-color: #C3CFD9;
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 67px;
    color: #E8833A;

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
`