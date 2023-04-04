import React, { FC } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-color">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
