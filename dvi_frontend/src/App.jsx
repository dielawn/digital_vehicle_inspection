import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { VehicleInfo } from './components/VehicleInfo';
import { CustomerInfo } from './components/CustomerInfo';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState(null)

  // Vehicle Info
  const [vin, setVin] = useState('');
  const [license, setLicense] = useState('');
  const [state, setState] = useState('MT');
  const [vehicle, setVehicle] = useState(null)

  // Customer Info
  const [customer, setCustomer] = useState('')
  
  // Tech
  const [tech, setTech] = useState('')

  useEffect(() => {
    if (vehicle) {
      setVin(vehicle.vin)
    }    
  }, [vehicle])


  const getMessage = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/`);
      console.log('Response:', res); // Log the response to inspect it
      setMessage(res.data.message); // Set the message from response data
      setResponse(res)
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };
  useEffect(() => {
    getMessage()
  }, [])

  useEffect(() => {
    console.log(response)
  }, [response])

  return (
      <div className='flexCol'>
        <h1>{message}</h1>
        <CustomerInfo 
          customer={customer}
          setCustomer={setCustomer}
        />
        <VehicleInfo 
          vin={vin}
          setVin={setVin}
          license={license}
          setLicense={setLicense}
          state={state}
          setState={setState}
          vehicle={vehicle}
          setVehicle={setVehicle}
        />
        
      </div>     
  )
}

export default App
