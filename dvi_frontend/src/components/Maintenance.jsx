import { useEffect, useState } from 'react'

export const Maintenance = ({ setMaintenance }) => {

    const [servicesDue, setServicesDue] = useState('');
    const [servicesPastDue, setServicesPastDue] = useState('');
    const [nextServices, setNextServices] = useState('');

    const handleResults = () => {
        const msg = `Were these services performed? ${servicesPastDue}, Services due: ${servicesDue}, Next Services: ${nextServices}`
        setMaintenance(msg)
    };

    return (
        <fieldset>
            <legend>Scheduled Maintenance</legend>
            <label>Last Services
                <textarea 
                    value={servicesPastDue}
                    onChange={(e) => setServicesPastDue(e.target.value)}
                />
            </label>
            <label>Services Due
                <textarea 
                    value={servicesDue}
                    onChange={(e) => setServicesDue(e.target.value)}
                />
            </label>
            <label>Next Services
                <textarea 
                    value={nextServices}
                    onChange={(e) => setNextServices(e.target.value)}
                />
            </label>
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}