import { Link } from "react-router-dom";
import styled from "styled-components"

export default function Success({ movieSectionInfo }) {
    return (
        <Body>
            <SuccessMessage>Pedido feito<br/>com sucesso!</SuccessMessage>
            <Section>
                <Title>Filme e sessão</Title>
                <Info>{movieSectionInfo.movie}</Info>
                <Info><span>{movieSectionInfo.date + ' '}</span><span>{movieSectionInfo.time}</span></Info>
            </Section>

            <Section>
                <Title>Ingressos</Title>
                {movieSectionInfo.seats.map((seat, index) => <Info key={index}>{"Assento " + seat}</Info>)}
            </Section>

            <Section>
                <Title>Comprador</Title>
                <Info>{"Nome: " + movieSectionInfo.buyerName}</Info>
                <Info>{"CPF: " + movieSectionInfo.buyerCPF}</Info>
            </Section>
            <Link to="/">
                <Button>Voltar pra Home</Button>
            </Link>
        </Body>
    )
}

const Body = styled.div`
    a {
        text-decoration: none;
        color: inherit;
    }
`

const Section = styled.div`
    font-size: 22px;
    color: #293845;
    margin: 30px;
`;

const Title = styled.div`
    font-size: 24px;
    color: #293845;
    margin-bottom: 12px;
    font-weight: 700;
`;

const Info = styled.div`
    margin-bottom: 8px;
`;

const SuccessMessage = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #247A6B;
    text-align: center;
    margin: 24px;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8833A;
    width: 255px;
    height: 42px;
    font-size: 18px;
    color: white;
    border-radius: 3px;
    margin-right: 8px;
    margin: 60px auto;
`;