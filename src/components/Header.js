import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    
    function goBack() {
        navigate(-1);
    }

    return (
        <Top>
            {location.pathname !== "/"? <Button onClick={goBack}>{"<"}</Button>: null}
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
    position: relative;

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
`;

const Button = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    width: 37px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: white;
    background-color: #E8833A;
    border-radius: 3px;
    cursor: pointer;
`