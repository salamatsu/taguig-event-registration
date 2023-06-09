import { Route, Routes } from "react-router";
import AdminRoutes from "./routes/admin";
import NotFound from "./pages/NotFound";
import "./app.css";

function App() {
  return (
    <Routes>
      {AdminRoutes()}
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}

export default App;
