import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import * as Icons from "react-icons/fa";
import useProducts from "../hooks/useProducts";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useProducts();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>error</p>
      ) : (
        <div>
          <div className="flex items-center mb-5">
            <h1 className="text-xl font-bold">Produk</h1>
            {/* button tambah produk */}
            <Button
              onClick={() => {
                navigate("/create-product");
              }}
            >
              Tambah Produk
              <Icons.FaPlus />
            </Button>
          </div>
          <div className="grid gap-2 grid-cols-2">
            {data?.data?.map((item) => {
              return <Card key={item.id} produk={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
