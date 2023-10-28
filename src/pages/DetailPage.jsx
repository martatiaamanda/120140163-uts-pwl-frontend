import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import * as Icons from "react-icons/fa";
import TitlePageHeader from "../components/TitlePageHeader";
import useProduct from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import { useValidateImage } from "../hooks/useValidateImage";
import defaultImage from "../assets/default.jpg";
import { axiosInstance } from "../helpers/axios";
import { mutate } from "swr";

const DetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useProduct(id);

  const isImageValid = useValidateImage(data?.data?.gambar);

  const handledelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/produk?id=${id}`);
      alert("Produk berhasil dihapus");
      mutate("/api/v1/produk");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          <TitlePageHeader title={"Detail Produk"} />
          <div className=" mt-5 flex gap-2">
            <div className="bg-gray-500 w-72 h-52">
              <img
                src={isImageValid ? data?.data?.gambar : defaultImage}
                alt="product"
                className="object-cover w-full h-full rounded-sm"
              />
            </div>
            <div className="w-full ">
              <h2 className="font-semibold ">{data?.data?.nama}</h2>
              <h3 className="text-sm">{data?.data?.deskripsi}</h3>
              <h4 className="text-sm">Rp. {data?.data?.harga}</h4>
              <h4 className="text-sm">Stok : {data?.data?.stok}</h4>
              <div className="flex justify-between mt-3 ">
                <div className="flex gap-2">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/edit-product/${data?.data?.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handledelete(data?.data?.id);
                    }}
                  >
                    Hapus
                  </Button>
                </div>
                <Button>
                  <Icons.FaShoppingCart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
