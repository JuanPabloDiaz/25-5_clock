import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#98C1D9] gap-6">
      {/* Colors:           colors: #1D2B53 #354274 #4E5A95 #6871B6 */}

      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
