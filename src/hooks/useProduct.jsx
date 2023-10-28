import useSWR from "swr";
import { axiosInstance } from "../helpers/axios";

const useProduct = (id) => {
  const fethcer = (url) => axiosInstance.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(`/api/v1/produk?id=${id}`, fethcer);

  return { data, error, isLoading };
};

export default useProduct;
