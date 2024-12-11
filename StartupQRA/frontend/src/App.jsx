import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClientFormPage from "./pages/ClientFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/clients/add" element={<ClientFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
