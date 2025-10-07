import MyState from "./context/data/MyState";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./page/home/Home";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import UpdateNote from "./page/UpdateNote/UpdateNote";
import AddNote from "./page/addnote/AddNote";
import Profile from "./page/Profile/Profile";
import NoPage from "./page/nopage/NoPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <MyState>
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/addnote"
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
