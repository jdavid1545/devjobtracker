import React from "react";
// import "./App.css";
import Dashboard from "./components/Dashboard";
// import { UserRecord } from "firebase-admin/auth";
// Define the props interface
interface AppProps {
  email: string;
}

const App: React.FC<AppProps> = ({ email }) => {
  return (
    <>
      <Dashboard email={email} />
    </>
  );
};

export default App;
