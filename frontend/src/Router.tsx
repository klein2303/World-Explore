import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ExploreCountries from "./pages/ExploreCountries";
import MyJournals from "./pages/MyJournals";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import JournalPage from "./pages/JournalPage";
import Country from "./pages/Country";

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="*"
                    element={
                        <>
                            <NoPage />
                        </>
                    }
                />
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ExploreCountries" element={<ExploreCountries />} />
                <Route path="/MyJournals" element={<MyJournals />} />
                <Route path="/JournalPage/:countryName" element={<JournalPage />} />
                <Route path="/:name" element={<Country />} />
            </Routes>
        </HashRouter>
    );
};

export default Router;
