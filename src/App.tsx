import './App.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { TeamDirectory } from './components/TeamDirectory';

function App() {

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
