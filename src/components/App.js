import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationHead from "./ApplicationHead";
import GlobalStyle from "../theme/GlobalStyle";
import Home from "./Home";
import Header from "./Header";
import MovieSessions from "./MovieSessions";

export default function App() {
    return (
        <>
        <ApplicationHead />
        <GlobalStyle />
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessoes/:idFilme" element={<MovieSessions />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}