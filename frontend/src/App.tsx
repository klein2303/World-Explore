import Router from "./Router";
import { RecoilRoot } from "recoil";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// change uri to if we want to get anything from the vm http://it2810-10.idi.ntnu.no:3001/ versus if we want to use the local server http://localhost:3001/
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
