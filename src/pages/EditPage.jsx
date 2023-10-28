import { useParams } from "react-router-dom";
import TitlePageHeader from "../components/TitlePageHeader";
import useProduct from "../hooks/useProduct";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../helpers/axios";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProduct(id);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.id = Number(id);
      data.harga = parseInt(data.harga);
      data.stok = parseInt(data.stok);
      await axiosInstance.put("/api/v1/produk", data);
      alert("Produk berhasil diedit");
      mutate("/api/v1/produk");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Produk gagal diedit");
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
          <TitlePageHeader title={"Edit Produk"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <div className="mb-3">
                <label htmlFor="nama">Nama Produk</label>
                <input
                  type="text"
                  id="nama"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  defaultValue={data?.data?.nama}
                  {...register("nama", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="harga">Harga</label>
                <input
                  type="number"
                  id="harga"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  defaultValue={data?.data?.harga}
                  {...register("harga", {
                    required: true,
                    min: 0,
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stok">Stok</label>
                <input
                  type="number"
                  id="stok"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  defaultValue={data?.data?.stok}
                  {...register("stok", {
                    required: true,
                    min: 0,
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="url-gambar">Link gambar produk</label>
                <input
                  type="text"
                  id="url-gambar"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  defaultValue={data?.data?.gambar}
                  {...register("gambar", {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deskripsi">Deskripsi</label>
                <textarea
                  id="deskripsi"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  defaultValue={data?.data?.deskripsi}
                  {...register("deskripsi", { required: true })}
                ></textarea>
              </div>
            </div>
            <input
              type="submit"
              className="cursor-pointer bg-red-500 px-4 py-1 rounded-sm text-white "
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPage;
