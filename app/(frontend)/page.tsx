import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/Product/ProductList";

const HomePage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="New Arrivals" />
    </>
  );
};

export default HomePage;
