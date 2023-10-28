/* eslint-disable react/prop-types */
import defaultImage from "../assets/default.jpg";
import { useValidateImage } from "../hooks/useValidateImage";
import { useCartContext } from "../hooks/useCartContext";
import Button from "./Button";

const CardCart = ({ produk }) => {
  const isImageValid = useValidateImage(produk?.gambar);

  const { removeItemFromCart } = useCartContext();

  return (
    <div className="bg-rose-300 rounded-sm p-2 ">
      <div className="bg-gray-300 w-full h-36 rounded-sm">
        <img
          src={isImageValid ? produk?.gambar : defaultImage}
          alt="product"
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <h1 className="font-semibold mb-3">{produk?.nama}</h1>
      <p>Rp. {produk?.harga}</p>
      <div className="flex">
        <p>Stok: {produk?.quantity}</p>
        <Button>
          <div
            className="flex gap-2"
            onClick={() => {
              removeItemFromCart(produk);
            }}
          >
            <p>Hapus</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CardCart;
