import { useForm } from "react-hook-form";
import TitlePageHeader from "../components/TitlePageHeader";
import { axiosInstance } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";

const CreateProductPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.harga = parseInt(data.harga);
      data.stok = parseInt(data.stok);
      await axiosInstance.post("/api/v1/produk", data);
      alert("Produk berhasil ditambahkan");
      mutate("/api/v1/produk");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TitlePageHeader title={"Tambah Produk"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <div className="mb-3">
            <label htmlFor="nama">Nama Produk</label>
            <input
              type="text"
              id="nama"
              className="border border-gray-300 rounded-sm p-1 w-full"
              {...register("nama", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="harga">Harga</label>
            <input
              type="number"
              id="harga"
              className="border border-gray-300 rounded-sm p-1 w-full"
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
  );
};

export default CreateProductPage;
