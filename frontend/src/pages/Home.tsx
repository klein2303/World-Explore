import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Countrys from "../data/Countrys";

const Home = () => {
    return (
        <>
            <Navbar />
            <CountryCardList countries={Countrys} />
        </>
    );
};

export default Home;
