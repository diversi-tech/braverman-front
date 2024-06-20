import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './Component/Main';
import AddUser from "./Component/addUser.component"
import ProjectsTable from './Component/costumers.component';

function App() {
  return (
    <div className="App">

      <Main></Main>
      <ProjectsTable/>
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
