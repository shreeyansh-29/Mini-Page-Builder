import React, {useState} from "react";
import HomeLayout from "components/homeLayout";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return <HomeLayout handleToggle={handleToggle} isOpen={isOpen} />;
};

export default HomePage;
