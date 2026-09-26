import "./App.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { WeatherCard } from "./components/WeatherCard";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    return (
        <>
            <ThemeSwitcher />

            <div id="card-container">
                <WeatherCard />
            </div>

            <GitHubLink />
        </>
    );
};
