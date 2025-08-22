import './App.css';
import {useEffect} from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { TeamDirectory } from './components/TeamDirectory';
import { Profile } from './components/profile'
import database from "../database/team_database.json";
// import type { databaseObject } from './types';

function App() {
  //this grabs the "database" from local storage, otherwise it uses the json file to initialize the local storage (for new sessions)
  useEffect(() => {
    const data = database;
    if (!localStorage.getItem('database')){
      localStorage.setItem('database', JSON.stringify(data));
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <footer className="footer">
      </footer>
    </>
  );
}

//Data Mode used for react-router just for practice; declarative probably better for an app like this
const router = createBrowserRouter([
  {
    path: "/",
    element: <TeamDirectory />,
  },
  {
    path: "profile/:email",
    element: <Profile />,
  }
]);

export default App;
