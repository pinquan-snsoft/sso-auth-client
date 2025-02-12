import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { SignInPage } from "./pages/auth";

const App = () => {
  console.log(import.meta.env.VITE_BASE_API_URL);
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </Suspense>
    </Router>
  );
};

export default App;
