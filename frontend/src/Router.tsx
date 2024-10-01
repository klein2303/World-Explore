import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Explore from "./pages/Explore";
import MyJournals from "./pages/MyJournals";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

const Router = () => {
    return (
        <BrowserRouter basename="project2">
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
                <Route path="/Explore" element={<Explore />} />
                <Route path="/MyJournals" element={<MyJournals />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router