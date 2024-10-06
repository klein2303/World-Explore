import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ExploreCountries from "./pages/ExploreCountries";
import MyJournals from "./pages/MyJournals";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

const Router = () => {
    return (
        <BrowserRouter basename="project2">
            <Routes>
                <Route
                    path="*"
                    element={
                        <>
                            <NoPage />
                        </>
                    }
                />
                <Route path="/Home" element={<Home />} />
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ExploreCountries" element={<ExploreCountries />} />
                <Route path="/MyJournals" element={<MyJournals />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
