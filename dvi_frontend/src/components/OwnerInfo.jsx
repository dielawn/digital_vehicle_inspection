import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const OwnerInfo = ({ owner , setOwner }) => {

    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
       
    const handleOwner = async () => {

    // Search database for existing owner
    // if matches render options 
    // else create new owner
    const newOwner = { name, email }
    setOwner(newOwner)
    

    }

    return (
        <div className='flexCol'>
            {!owner &&
            <>
                <label htmlFor="ownerInput">Owner name: </label>
                <input 
                    type='text'
                    id='ownerInput'
                    value={owner? owner.name : name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='emailInput'>Email: </label>
                <input
                    type='email'
                    id='emailInput'
                    value={owner? owner.email : email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='button' onClick={handleOwner}>Set Owner</button>
            </>
            }
           
        </div>
    )
}