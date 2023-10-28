import * as Icons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCartContext } from "../hooks/useCartContext";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCartContext();
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="bg-red-200 p-3 flex justify-between items-center">
      <h1
        className="font-semibold cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Gudang Sepatu
      </h1>
      <Button
        onClick={() => {
          navigate("/cart");
        }}
      >
        {totalQuantity}
        <Icons.FaShoppingCart />
      </Button>
    </header>
  );
};

export default HeaderLayout;
