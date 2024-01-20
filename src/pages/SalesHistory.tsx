import Breadcrumb from '../components/Breadcrumb';
import SalesHistoryTable from '../components/SalesHistoryTable';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SalesHistory = () => {

  const [salesData, setSalesData] = useState([]);
  const jwtToken = Cookies.get('jwt');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products/selling/', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, [jwtToken]);
  console.log(salesData);


  return (
    <>
      <Breadcrumb pageName="Saels History" />

      <div className="flex flex-col gap-10">
       
        <SalesHistoryTable sData={salesData} />
        
      </div>
    </>
  );
};

export default SalesHistory;
