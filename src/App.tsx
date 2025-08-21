import './App.css';
import {useEffect} from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { TeamDirectory } from './components/TeamDirectory';
import database from "../database/team_database.json";

function App() {
  useEffect(() => {
    const data = database;
    console.log(data);
    console.log(data.toString());
    if (!localStorage.getItem('database')){
      localStorage.setItem('database', JSON.stringify(data));
      console.log('updating localstorage!')
    }
  }, [])

  return (
    <>
      {/* Optional: Modal (you can implement this later) */}
      {/* <Modal /> */}
      <RouterProvider router={router} />
      <footer className="footer">
      </footer>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <TeamDirectory/>,
  },
]);

export default App;
