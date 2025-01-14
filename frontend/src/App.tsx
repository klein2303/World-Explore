import Router from "./Router";
import { RecoilRoot } from "recoil";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "./context/ThemeProvider"; // Import ThemeProvider

const client = new ApolloClient({
    uri: "http://localhost:3001/",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getjournals: {
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        },
                    },
                },
            },
        },
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                <ThemeProvider>
                    {" "}
                    {/* Wrap your app with ThemeProvider */}
                    <Router />
                </ThemeProvider>
            </RecoilRoot>
        </ApolloProvider>
    );
}

export default App;
