import { useEffect, useState } from "react";
import UserData from './components/UserData.jsx'
const API = 'https://canopy-frontend-task.vercel.app/api/holdings';
const App = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async (url) => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.payload) {
        const payloadObject = data.payload;
        console.log(payloadObject);
      if(payloadObject.length > 0){
          setUsers(payloadObject);
        }
    }
  }
    catch(e){
      console.error(e);
    }
  }
  useEffect(()=>{
    fetchData(API);
  }, [])
  return (
    <>
        <UserData users={users}/>
    </>
  );
}

export default App;