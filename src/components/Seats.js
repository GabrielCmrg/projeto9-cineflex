import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import styled from "styled-components";

import Footer from "./shared/Footer";
import Title from "./shared/Title";

function Seat({
    seatNumber, 
    seatID, 
    isAvailable, 
    selectedSeats, 
    setSelectedSeats,
    selectedSeatsIDs,
    setSelectedSeatsIDs
}) {

    const [selected, setSelected] = React.useState(false);
    React.useEffect(() => {
        if (selected) {
            setSelectedSeatsIDs([...selectedSeatsIDs, seatID]);
            setSelectedSeats([...selectedSeats, seatNumber]);
        } else {
            setSelectedSeatsIDs(selectedSeatsIDs.filter(seat => seat !== seatID));
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const colors = { bgColor: "", borderColor: "" };
    if (isAvailable) {
        if (selected) {
            colors.bgColor = "#8DD7CF";
            colors.borderColor = "#1AAE9E";
        } else {
            colors.bgColor = "#C3CFD9";
            colors.borderColor = "#7B8B99";
        }
    } else {
        colors.bgColor = "#FBE192";
        colors.borderColor = "#F7C52B";
    }

    function selectSeat() {
        if (isAvailable) {
            setSelected(!selected);
        } else {
            alert("Esse assento não está disponível");
        }
    }

    return (
        <SeatButton bgColor={colors.bgColor} borderColor={colors.borderColor} onClick={selectSeat}>
            {seatNumber}
        </SeatButton>
    )
}

function Hint() {
    return (
        <Flex>
            <div>
                <ButtonHint bgColor="#8DD7CF" borderColor="#1AAE9E" />
                <div>Selecionado</div>
            </div>
            <div>
                <ButtonHint bgColor="#C3CFD9" borderColor="#7B8B99" />
                <div>Disponível</div>
            </div>
            <div>
                <ButtonHint bgColor="#FBE192" borderColor="#F7C52B" />
                <div>Indisponível</div>
            </div>
        </Flex>
    )
}

export default function Seats({ movieSectionInfo }) {
    const { idSessao: sessionID } = useParams();
    const [seats, setSeats] = React.useState([]);
    const [sessionInfo, setSessionInfo] = React.useState({});
    const [selectedSeatsIDs, setSelectedSeatsIDs] = React.useState([]);
    const [selectedSeats, setSelectedSeats] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);

        promise
            .then(response => {
                setSeats(response.data.seats);
                setSessionInfo({
                    filmImage: response.data.movie.posterURL,
                    filmName: response.data.movie.title,
                    weekday: response.data.day.weekday,
                    time: response.data.name
                })
                movieSectionInfo.movie = response.data.movie.title;
                movieSectionInfo.time = response.data.name;
                movieSectionInfo.date = response.data.day.date;
            });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionID])

    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const navigate = useNavigate();

    function sendToServer(e) {
        e.preventDefault();
        if (selectedSeats.length > 0) {
            const obj = {
                ids: selectedSeatsIDs,
                name,
                cpf: cpf.replaceAll('.', '').replaceAll('-', '')
            }
    
            movieSectionInfo.seats = selectedSeats;
            movieSectionInfo.buyerName = name;
            movieSectionInfo.buyerCPF = cpf;
    
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", obj);
            promise.then(() => navigate("/sucesso"));
        } else {
            alert("Selecione um assento.");
        }
    }

    function cpfMask(e) {
        const value = e.target.value;
        const lastCharIndex = value.length - 1;

        // only numbers condition
        if (isNaN(value[lastCharIndex])) {
            setCpf(value.substring(0, lastCharIndex));
            return;
        }

        // add '.' to separate sets of numbers
        if (value.length === 3 || value.length === 7) {
            setCpf(value + '.');
            return;
        }

        // add '-' to separate digit
        if (value.length === 11) {
            setCpf(value + '-');
            return;
        }

        // update state and input
        setCpf(value);
    }

    return (
        <Body>
            <Title>Selecione o(s) assento(s)</Title>
            <div>
                <SeatsLayout>
                    {seats.map((seat, index) => (
                        <Seat 
                            key={index} 
                            seatNumber={seat.name} 
                            seatID={seat.id}
                            isAvailable={seat.isAvailable} 
                            selectedSeats={selectedSeats} 
                            setSelectedSeats={setSelectedSeats}
                            selectedSeatsIDs={selectedSeatsIDs}
                            setSelectedSeatsIDs={setSelectedSeatsIDs}
                        />
                    ))}
                </SeatsLayout>
                <Hint />
                <Form onSubmit={sendToServer}>
                    <label htmlFor="name">Nome do comprador:</label>
                    <input
                        id="name"
                        name="buyerName"
                        type="text"
                        placeholder="Digite seu nome..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="cpf">CPF do comprador:</label>
                    <input
                        id="cpf"
                        name="buyerCPF"
                        type="text"
                        maxLength="14"
                        minLength="14"
                        placeholder="Digite seu CPF..."
                        value={cpf}
                        onChange={cpfMask}
                        required
                    />
                    <Button type="submit">Reservar assento(s)</Button>
                </Form>
            </div>
            <Footer
                filmImage={sessionInfo.filmImage}
                filmName={sessionInfo.filmName}
                weekday={sessionInfo.weekday}
                time={sessionInfo.time}
            />
        </Body>
    )
}

const Body = styled.div`
    margin-bottom: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SeatsLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 7px;
    grid-auto-rows: 1fr;
    row-gap: 18px;
`;

const SeatButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    color: black;
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
    cursor: pointer;
`;

const ButtonHint = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 16px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #4E5A65;
        font-size: 13px;

        div {
            margin-bottom: 8px;
        }
    }
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8833A;
    width: 225px;
    height: 42px;
    font-size: 18px;
    color: white;
    border: none;
    border-radius: 3px;
    margin: 56px auto 0;
    cursor: pointer;
`;

const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    label {
        font-size: 18px;
        color: #293845;
        margin-top: 10px;
    }

    input {
        width: 100%;
        font-size: 18px;
        color: #293845;
        padding: 18px;
        border: 1px solid #D4D4D4;
        border-radius: 3px;
        box-sizing: border-box;
    }

    input::placeholder {
        font-style: italic;
        color: #AFAFAF;
        opacity: 1;
    }
`;