

interface Product {
  id: number;
  quantity: number;
  price: number;
  transaction_date: string;
  product: string;
  parent: string | null;
  seller: string;
  buyer: string;
}

interface TableTwoProps {
  data: Product[];
}

// const TableTwo = (data:any) => {
const TableTwo: React.FC<TableTwoProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        {/* <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div> */}
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
      </div>


      {data.map((product: any) => (
        <div key={product.id} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <h1 className="text-lg text-black font-bold dark:text-white">
                {product.product}
              </h1>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <h1 className="text-lg text-black dark:text-white">NRs. {product.price}</h1>
          </div>

          <div className="col-span-1 flex items-center">
            <h1 className="text-lg font-bold ">{product.quantity}</h1>
          </div>
        </div>

      ))
      }
    </div >
  );
};

export default TableTwo;
