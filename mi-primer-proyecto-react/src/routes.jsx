import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from "@tanstack/react-router";


import SaludoYeisson from "./Components/SaludoYeisson";
import Quiz from "./Components/QuizComponent";
/*import "./index.css";*/

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{display: "flex", gap: "1rem", padding: "1rem"}}>
                    <Link to="/" activeProps={{style:{fontWeight:'bold'}}}>index</Link>
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
    component: SaludoYeisson,
})

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/quiz",
    component: Quiz,
})
const routeTree= rootRoute.addChildren([
    indexRoute,
    quizRoute
])
export const router = createRouter({
    routeTree
})