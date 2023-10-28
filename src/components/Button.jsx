/* eslint-disable react/prop-types */
const Button = ({ children, icon, onClick, className }) => {
  return (
    <button
      className={`bg-red-500 text-white py-1 px-2 rounded-sm ml-auto text-sm flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {children ? children : ""}
      {icon ? icon : ""}
    </button>
  );
};

export default Button;
