import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { WarningLights } from './WarningLights';
import { ExteriorLights } from './ExteriorLights';
import { UnderHood } from './UnderHood';

export const InspectionForm = () => {

    // Levels of concern
    const [lowConcern, setLowConcern] = useState([]);
    const [someConcern, setSomeConcern] = useState([]);
    const [safetyConcern, setSafetyConcern] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);

    
    // Inspection data
    const [warningLights, setWarningLights] = useState(''); 
    const [exteriorLights, setExteriorLights] = useState('');
    const [wiperWasher, setWiperWasher] = useState('');
    // under hood
    const [airFilter, setAirFilter] = useState('');
    const [battery, setBattery] = useState('');
    const [belts, setBelts] = useState('');
    const [hoses, setHoses] = useState('');
    const [underHoodFluids, setUnderHoodFluids] = useState('');
    const [underHoodNotes, setUnderHoodNotes] = useState('');
    // under car
    const [tires, setTires] = useState('');
    const [brakes, setBrakes] = useState('');
    const [suspension, setSuspension] = useState('');
    const [underCarFluids, setUnderCarFluids] = useState('');
    const [underCarNotes, setUnderCarNotes] = useState('');
    // maintenance
    const [maintenance, setMaintenance] = useState('');

    const condition = ['Good', 'Needs Attention', 'Safety Concern']
    const recommendation = ['Diagnose', 'Repair', 'Replace', '']

    const addToConcerns = (level, note) => {
        switch (level) {
            case 1:
                setLowConcern(prevLowConcern => [...prevLowConcern, note]);
                break;
            case 2:
                setSomeConcern(prevSomeConcern => [...prevSomeConcern, note]);
                break;
            case 3:
                setSafetyConcern(prevSafetyConcern => [...prevSafetyConcern, note]);
                break;
            default:
                setLowConcern(prevLowConcern => [...prevLowConcern, note]);
        }
    }

    const steps = [
        <WarningLights addToConcerns={addToConcerns} />,
        <ExteriorLights addToConcerns={addToConcerns}/>,
        <UnderHood addToConcerns={addToConcerns} />
    ]   


    const scrollBack = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    const scrollNext = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));

  

    return (
        <div>
           <div className='inspectionDiv'>
                <button type='button' onClick={scrollBack} disabled={currentStep === 0}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button type='button' onClick={scrollNext} disabled={currentStep === steps.length - 1}><FontAwesomeIcon icon={faChevronRight} /></button>
                <div className="inspComponent">
                    {steps[currentStep]}
                </div>
               
           </div>
            <div className="resultsDiv">
                <h3>Pass</h3>
                <ul className='lowConcernList'>
                {lowConcern && lowConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Needs attention</h3>
                <ul className='someConcernList'>
                {someConcern && someConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Safety concern</h3>
                <ul className='safetyConcernList'>
                {safetyConcern && safetyConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
            </div>

        </div>
    )
}