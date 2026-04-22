import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from "@tanstack/react-router";

import SaludoSamir from "./Components/SaludoSamir";
import QuizComponent from "./Components/QuizComponent";
import BuscarPoke from "./Components/BuscarPoke";
import App from "./App";
import  "./App.css";

const rootRoute = createRootRoute({
    component: function RootLayout () {
        return (
            <>
                <nav style={{display: 'flex', gap:'1rem',padding:'1rem'}}>
                    <Link to="/" activeProps={{style: {fontWeight:'bold'}}}>Home</Link>
                    <Link to="/saludo-samir" activeProps={{style: {fontWeight:'bold'}}}>
                    Saludo Samir
                    
                    </Link>
                    <Link to="/quiz" activeProps={{style: {fontWeight:'bold'}}}>
                    Quiz
                    </Link>
                    
                    <Link to="/buscar-poke" activeProps={{style: {fontWeight:'bold'}}}>
                    Buscar Poke
                    </Link>
                
                    </nav>
                    <section id="center">
                        <Outlet />
                    </section>
                </>
            );
        }
    });

    const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: App,
    });

    const saludoSamirRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/saludo-samir",
        component: SaludoSamir,
    });

    const quizRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/quiz",
        component: QuizComponent,
    });

    const buscarPokeRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/buscar-poke",
        component: BuscarPoke,
    });

    const routeTree = rootRoute.addChildren([
        indexRoute,
        saludoSamirRoute,
        quizRoute,
        buscarPokeRoute,
    ]);
    
    export const router = createRouter({
        routeTree,
    });