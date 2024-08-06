import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

import { VehicleInfo } from './components/VehicleInfo';
import { OwnerInfo } from './components/OwnerInfo';
import { TechSelector } from './components/TechSelect';
import { InspectionForm } from './components/InspectionForm';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  // Vehicle Info
  const [vin, setVin] = useState('');
  const [driveType, setDriveType] = useState('');
  const [license, setLicense] = useState('');
  const [state, setState] = useState('MT');
  const [vehicle, setVehicle] = useState(null);
  const [mileage, setMileage] = useState(0);

  // Vehicle Owner Info
  const [owner, setOwner] = useState('');
  
  // Inspecting Tech
  const [tech, setTech] = useState('');

  const [isInsp, setIsInsp] = useState(false);

  const [tireSize, setTireSize] = useState('');
  const [loadRange, setLoadRange] = useState('P');

  const startInsp = () => {
    let errorMsgs = []
    if (!owner) {
      errorMsgs.push('Vehicle Owner must be set. ')
    }
    if (!tech) {
      errorMsgs.push('Technician must be selected. ')
    }
    if (!vehicle) {
      errorMsgs.push('No decoded vehicle. ')
    }
    if (mileage === 0) {
      errorMsgs.push('Mileage required. ')
    }
    if (errorMsgs.length) {
      setMessage(errorMsgs)
      return
    } else {
      setIsInsp(true)
      setMessage('Inspection has begun')
    }

  }

  useEffect(() => {
    if (vehicle) {
      setVin(vehicle.vin)
      setDriveType(vehicle.driveType)
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


  useEffect(() => {
    const currentVehicle = {
        ...vehicle,
        tireSize,
    }
    setVehicle(currentVehicle)
}, [tireSize])

  return (
    <div className='flexCol'>
      <h1>{message}</h1>
      {isInsp ? 
      <>
        <div className='ownerDiv'>
          <p>Vehicle owner: {owner.name} <br />
          {vehicle.vin} <br />
          {vehicle.year} {vehicle.make} {vehicle.model} <br />
          Mileage: {mileage} <br />
          Inspecting Technician: {tech} <br />
          Drive Type: {driveType} <br />
          {vehicle.tireSize? `Tire Size: ${loadRange} ${vehicle.tireSize}` : ''}
          </p>
        </div>
        
        <InspectionForm 
          driveType={driveType} 
          setDriveType={setDriveType} 
          tireSize={tireSize} 
          setTireSize={setTireSize} 
          setLoadRange={setLoadRange}
          loadRange={loadRange}
        />
      </>
      :
      <>
          <OwnerInfo 
            owner={owner}
            setOwner={setOwner}
          />       
          <TechSelector 
            tech={tech}
            setTech={setTech}
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
            mileage={mileage}
            setMileage={setMileage}
          />
          <button type='button' onClick={() => startInsp()}>Start Inspection</button>
      </>
      }
      
     
      
    </div>     
  )
}

export default App
