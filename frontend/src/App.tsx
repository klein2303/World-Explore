import Router from "./Router";
import { RecoilRoot } from "recoil";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/",
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
