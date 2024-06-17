import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
import { Routing } from "./Routing";


export const Main = () => {
    return <>
        <BrowserRouter>
        
            <Nav ></Nav>
            <h1>שלום</h1>
            <Routing></Routing>

        </BrowserRouter>
    </>
}