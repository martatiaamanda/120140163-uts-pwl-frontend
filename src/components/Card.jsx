/* eslint-disable react/prop-types */
import * as Icons from "react-icons/fa";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/default.jpg";
import { useValidateImage } from "../hooks/useValidateImage";
import { axiosInstance } from "../helpers/axios";
import { mutate } from "swr";
import { useCartContext } from "../hooks/useCartContext";

const Card = ({ produk }) => {
  const navigate = useNavigate();

  const isImageValid = useValidateImage(produk?.gambar);

  const { addItemToCart } = useCartContext();

  const handledelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/produk?id=${id}`);
      alert("Produk berhasil dihapus");
      mutate("/api/v1/produk");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-rose-300 rounded-sm p-2 cursor-pointer"
      onClick={() => {
        navigate(`/detail-product/${produk?.id}`);
      }}
    >
      <div className="bg-gray-300 w-full h-36 rounded-sm">
        <img
          src={isImageValid ? produk?.gambar : defaultImage}
          alt="product"
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <h1 className="font-semibold mb-3">{produk?.nama}</h1>
      <p>Rp. {produk?.harga}</p>
      <p>Stok: {produk?.stok}</p>
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          <Button
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/edit-product/${produk?.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handledelete(produk?.id);
            }}
          >
            Hapus
          </Button>
        </div>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            addItemToCart(produk);
          }}
        >
          <Icons.FaShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Card;
