import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import styled from "styled-components";

import Title from "./shared/Title";

function SessionButton({sessionID, time}) {
    return (
        <Link to={"/assentos/" + sessionID}>
            <div>{time}</div>
        </Link>
    )
}

function Day({weekday, date, showtimes}) {
    return(
        <Container>
            <div>{weekday + " - " + date}</div>
            <Sections>
                {showtimes.map((time, index) => <SessionButton key={index} sessionID={time.id} time={time.name}/>)}
            </Sections>
        </Container>
    )
}

export default function MovieSessions() {
    const { idFilme: filmID } = useParams();
    const [days, setDays] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmID}/showtimes`);
        
        promise
            .then(response => setDays(response.data.days))
            .catch(error => console.log("Deu Ruim", error.response));
        
    }, [filmID]);

    return (
        <>
            <Title>Selecione o horário</Title>
            {days.map((day, index) => <Day key={index} weekday={day.weekday} date={day.date} showtimes={day.showtimes} />)}
        </>
    )
}

const Container = styled.div`
    padding-left: 24px;
    font-size: 20px;

    div {
        margin-bottom: 30px;
    }
`;

const Sections = styled.div`
    display: flex;
    flex-wrap: wrap;

    a {
        color: inherit;
        text-decoration: inherit;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #E8833A;
        width: 83px;
        height: 43px;
        font-size: 18px;
        color: white;
        border-radius: 3px;
        margin-right: 8px;
    }
`;