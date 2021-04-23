import {MemoryRouter} from "react-router";

export const withMemoryRouter = (story) => (
    <MemoryRouter>{story()}</MemoryRouter>
);