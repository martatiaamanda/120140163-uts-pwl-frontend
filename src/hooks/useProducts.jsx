import useSWR from "swr";
import { axiosInstance } from "../helpers/axios";

const useProducts = () => {
  const fethcer = (url) => axiosInstance.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/v1/produk", fethcer);

  return { data, error, isLoading };
};

export default useProducts;
