import { useEffect, useState } from 'react'
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const plateToVinKey = import.meta.env.VITE_PLATE_TO_VIN_API_KEY
const authKey = import.meta.env.VITE_APP_CAR_MD_AUTH_KEY
const partnerToken = import.meta.env.VITE_APP_CAR_MD_PARTNER_TOKEN

import StateSelector from './StateSelect';

export const VehicleInfo = ({ vin, setVin, license, setLicense, state, setState, vehicle, setVehicle, mileage, setMileage, tireSize, setTireSize }) => {
    const [message, setMessage] = useState('')
    const [isVin, setIsVin] = useState(false)
    // if license and state, decode license and state to vehicle
    // check database for existing vin if no match add vehicle to database
    // decode vin setVehicle
    const plateToVin = async () => {  
        console.log(state, license)
       
        try {
            const res = await axios({
                method: 'post',
                url: 'https://platetovin.com/api/convert',
                headers: {
                    'Authorization': plateToVinKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: {
                    state: state,
                    plate: license,
                },
            });

            if (res.status === 200) {
                console.log(res.data);
                if (res.data.success) {
                    const currentVehicle = {
                        vin: res.data.vin.vin,
                        year: res.data.vin.year,
                        make: res.data.vin.make,
                        model: res.data.vin.model,
                        engine: res.data.vin.engine,
                        transmission: res.data.vin.transmission,
                        driveType: res.data.vin.driveType
                    }
                    setVehicle(currentVehicle);
                    setMessage('Vehicle data set')
                } else {
                    setMessage(`Failed to decode vehicle: ${res.data.message}`);
                }
            } 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const decodeVin = async () => {
       
        try {
                        
            const res = await axios({
                url: `http://api.carmd.com/v3.0/decode?vin=${vin}`,
                method: 'GET',
                headers: {
                    "content-type":"application/json",
                    "authorization": `Basic ${authKey}`,
                    "partner-token": partnerToken
                },
            })
            if (res.status === 200) {
                console.log(res.data)
                const currentVehicle = {
                    vin: vin,
                    year: res.data.data.year,
                    make: res.data.data.make,
                    model: res.data.data.model,
                    engine: res.data.data.engine,
                    transmission: res.data.data.transmission,
                    driveType: res.data.data.driveType
                }
                setVehicle(currentVehicle)
            } else {
                console.log(res)
            }
        } catch (error) {
            console.log('Error decoding vin:', error)
        }
      
    };


    return (
        <div className='flexCol'>
            <h3>{message}</h3>
            <label htmlFor='mileageInput'>Mileage: </label>
            <input 
                type='text'
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
            />
           <fieldset>
            <legend>Decode with</legend>
            <input type='radio' checked={!isVin} onChange={() => setIsVin(false)}/>
            <label>License Plate</label>
            <input type='radio' checked={isVin} onChange={() => setIsVin(true)} />
            <label>VIN</label>
           </fieldset>
            {isVin ? 
            <>
                <label htmlFor="vinInput">Vin: </label>
                <input 
                    type='text'
                    id='vinInput'
                    value={vin || ''}
                    onChange={(e) => setVin(e.target.value)}
                />
                <button type='button' onClick={() => decodeVin()}>Decode VIN</button>
            </>
            :
            <>
                <label htmlFor="licenseInput">License plate #</label>
                <input 
                    type="text"
                    id='licenseInput'
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}    
                />
                <StateSelector 
                    state={state}
                    setState={setState}    
                />
                <button type='button' onClick={() => plateToVin()}>Decode License Plate</button>
                
            </>
            }
            
        </div>
    )
};