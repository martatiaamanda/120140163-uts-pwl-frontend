import Button from "../components/Button";
import * as Icons from "react-icons/fa";
import TitlePageHeader from "../components/TitlePageHeader";
import { useCartContext } from "../hooks/useCartContext";
import CardCart from "../components/CardCart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useCartContext();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex items-center mb-5">
          <TitlePageHeader title={"Keranjang"} />
          {/* button tambah produk */}
          <Button
            onClick={() => {
              if (cartItems.length === 0) {
                alert("Keranjang Kosong");
                return;
              }
              navigate("/checkout");
            }}
          >
            Check Out
            <Icons.FaArrowRight />
          </Button>
        </div>
        <div className="grid gap-2 grid-cols-2">
          {cartItems?.length === 0 && (
            <div className="text-center">Keranjang Kosong</div>
          )}
          {cartItems?.map((item) => {
            return <CardCart key={item.id} produk={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CartPage;
