import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const CustomerInfo = ({ customer , setCustomer }) => {

    // Search database for existing customer
    // if matches render options or create new customer

    return (
        <div className='flexCol'>
            <label htmlFor="customerInput">Customer name: </label>
            <input 
                type='text'
                id='customerInput'
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
            />
        </div>
    )
}