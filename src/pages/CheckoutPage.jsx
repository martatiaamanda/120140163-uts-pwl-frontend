import { useEffect } from "react";
import TitlePageHeader from "../components/TitlePageHeader";
import { useCartContext } from "../hooks/useCartContext";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../helpers/axios";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCartContext();

  // const navigate = useNavigate();

  const [totalHargaServer, setTotalHargaServer] = useState(0);
  const [cartItemDev, setCartItemDev] = useState([]);

  useEffect(() => {
    // if (cartItems.length === 0) {
    //   alert("Keranjang Kosong");
    //   navigate("/");
    // }

    setCartItemDev(cartItems);

    const cekHargaServer = async () => {
      try {
        const ids = [];

        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          for (let j = 0; j < item.quantity; j++) {
            ids.push(item.id);
          }
        }
        const res = await axiosInstance.post("/api/v1/produk/jumlah_harga", {
          id: ids,
        });

        setTotalHargaServer(res.data.harga);
      } catch (error) {
        console.log(error);
      }
    };

    cekHargaServer();

    return () => {
      clearCart();
    };
  }, []);

  return (
    <div>
      <TitlePageHeader title={"Checkout"} />
      {/* create table for item in cart */}
      <table className="table-auto w-full mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nama Produk</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* if cartItems length is 0 */}
          {cartItemDev?.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Keranjang Kosong
              </td>
            </tr>
          )}
          {/* map item in cart */}
          {cartItemDev?.map((item) => {
            return (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2 text-center">{item.harga}</td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
                <td className="px-4 py-2 text-center">
                  {item.quantity * item.harga}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* total harga */}
      <div className="mt-5">
        <div className="flex justify-between">
          <div>Total Harga</div>
          <div>Rp. {totalHargaServer}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
