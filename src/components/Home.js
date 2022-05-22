import styled from "styled-components";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "./shared/Container";
import Title from "./shared/Title";

function Film({id, image}) {
    return (
        <FilmCard>
            <Link to={"/sessoes/" + id}>
                <img src={image} alt="film poster" width="129" height="193" />
            </Link>
        </FilmCard>
    )
}

export default function Home() {
    const [filmList, setFilmList] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise
            .then(response => setFilmList(response.data))
            .catch(error => console.log("deu ruim", error.response));

    }, [])

    return (
        <Container>
            <Title>Selecione o filme</Title>
            <FilmList>
                {filmList.map((film, index) => <Film key={index} id={film.id} image={film.posterURL} />)}
            </FilmList>
        </Container>
    )
}

const FilmList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    grid-auto-rows: 1fr;
    row-gap: 10px;
    margin: 0 auto;

    @media (min-width: 700px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FilmCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
`