import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LandingPage from "../components/LandingPage";
import CustomData from "../components/CustomData";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const api = process.env.REACT_APP_BACKEND_API;
  const [dataList, setDataList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/dynamicdata`);
        setDataList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="app">

        {/* Navbar */}
        <NavBar />


        {/* Landing Page */}
        <LandingPage />

        {/* Custom Data */}
        {dataList ? dataList.map((data) => (
          <CustomData
            key={data.id}  // Assuming each data item has a unique id
            imageSrc={data.image_url}
            title={data.title}
            description={data.description}
          />
        )) : (
          <>{message}</>
        )}
        
        {/* Footer */}
        <Footer admin_page_active={true} />

      </div>
    </>
  );
};

export default Home;
