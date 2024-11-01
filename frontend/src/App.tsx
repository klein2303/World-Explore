import Router from "./Router";
import { RecoilRoot } from "recoil";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://it2810-10.idi.ntnu.no:3001/",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                <Router />
            </RecoilRoot>
        </ApolloProvider>
    );
}

export default App;
