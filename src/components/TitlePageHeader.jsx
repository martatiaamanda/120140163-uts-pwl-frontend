/* eslint-disable react/prop-types */
import * as Icons from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TitlePageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Icons.FaArrowLeft
        className="cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      />
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default TitlePageHeader;
