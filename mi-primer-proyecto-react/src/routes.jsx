
import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from "@tanstack/react-router";


import SaludoMarimar from "./Components/SaludoMarimar";
import BuscarPokemon from "./Components/BuscarPokemon";
import Quiz from "./Components/Quiz";
import "./index.css";

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{display: "flex", gap: "1rem", padding: "1rem"}}>
                    <Link to="/" activeProps={{style:{fontWeight:'bold'}}}>index</Link>
                    <Link to="/buscar-pokemon" activeProps={{style:{fontWeight:'bold'}}}>Buscar Pokémon</Link>
                    <Link to="/quiz" activeProps={{style:{fontWeight:'bold'}}}>Quiz</Link>
                </nav>
              <section id="center">
                <Outlet />
              </section>
            </>
        )
    },
})
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: SaludoMarimar,
})
const buscarPokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/buscar-pokemon",
    component: BuscarPokemon,
})
const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/quiz",
    component: Quiz,
})
const routeTree= rootRoute.addChildren([
    indexRoute,
    buscarPokemonRoute,
    quizRoute
])
export const router = createRouter({
    routeTree
})