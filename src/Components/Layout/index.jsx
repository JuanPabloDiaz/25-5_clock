import PropTypes from "prop-types";

const Layout = ({ children }) => {
  // const isSmallScreen = window.innerWidth <= 640; // Adjust the breakpoint as needed

  return (
    <div className="flex flex-col pt-[30%] md:pt-[0%] justify-start md:justify-center items-center w-screen h-screen bg-[#98C1D9] gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
