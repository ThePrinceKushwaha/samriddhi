import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import Cookies from 'js-cookie';
import {useState,useEffect} from 'react';




const ProductHistory = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('jwt');
        console.log(token);
  
        if (!token) {
          // Handle unauthorized access or redirect to login page
          console.error('JWT token not found. User not authenticated.');
          return;
        }
  
        const response = await fetch('http://127.0.0.1:8000/api/v1/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error('Error fetching product data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  console.log(productData);

  // {
  //   id: 298,
  //   quantity: 10,
  //   price: 100,
  //   transaction_date: '2024-01-20T12:49:03.904357+05:45',
  //   product: 'sugar',
  //   parent: null,
  //   seller: 'Ram ko company',
  //   buyer: 'Shyam ko company'
  // }

  return (
    <>
      <Breadcrumb pageName="Product History" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo data={productData}/>
        {/* <TableThree /> */}
      </div>
    </>
  );
};

export default ProductHistory;
