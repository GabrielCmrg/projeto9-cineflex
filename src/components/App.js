import { BrowserRouter, Route, Routes } from "react-router-dom";

import ApplicationHead from "./ApplicationHead";
import GlobalStyle from "../theme/GlobalStyle";
import Home from "./Home";
import Header from "./Header";
import MovieSessions from "./MovieSessions";
import Seats from "./Seats";
import Success from "./Success";

export default function App() {
    const movieSectionInfo = {
        movie: "",
        time: "",
        date: "",
        seats: [],
        buyerName: "",
        buyerCPF: ""
    }

    return (
        <>
        <ApplicationHead />
        <GlobalStyle />
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessoes/:idFilme" element={<MovieSessions />} />
                <Route path="/assentos/:idSessao" element={<Seats movieSectionInfo={movieSectionInfo} />} />
                <Route path="/sucesso" element={<Success movieSectionInfo={movieSectionInfo} />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}