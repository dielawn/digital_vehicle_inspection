import { useEffect, useState } from 'react'

export const Maintenance = ({ addToConcerns }) => {

    const [servicesDue, setServicesDue] = useState('');
    const [servicesPastDue, setServicesPastDue] = useState('');
    const [nexServices, setNextServices] = useState('');

    const handleResults = () => {
        addToConcerns(1, nexServices)
        addToConcerns(2, servicesDue)
        addToConcerns(3, servicesPastDue)
    }

    return (
        <fieldset>
            <legend>Schedualed Maintenance</legend>
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
                    value={nexServices}
                    onChange={(e) => setNextServices(e.target.value)}
                />
            </label>
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}