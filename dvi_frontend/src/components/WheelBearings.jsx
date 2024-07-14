import { useEffect, useState } from 'react'

export const WheelBearings = ({ addToConcerns }) => {
    // Play in wheel bearing?
    const [wheelBearingLF, setWheelBearingLF] = useState(1);
    const [wheelBearingRF, setWheelBearingRF] = useState(1);
    const [wheelBearingRR, setWheelBearingRR] = useState(1);
    const [wheelBearingLR, setWheelBearingLR] = useState(1);  

    // Wheel bearing level 1 === good, 2 === needs attention, 3 === safety concern

    const wheelBearings = [
        {
            name: 'LF wheel bearing',
            bearing: wheelBearingLF,
            setBearing: setWheelBearingLF, 
            id: 'lfWB'
        },
        {
            name: 'RF wheel bearing',
            bearing: wheelBearingRF,
            setBearing: setWheelBearingRF, 
            id: 'rfWB'     
        },
        {
            name: 'RR wheel bearing',
            bearing: wheelBearingRR,
            setBearing: setWheelBearingRR, 
            id: 'rrWB'
        },
        {
            name: 'LR wheel bearing',
            bearing: wheelBearingLR,
            setBearing: setWheelBearingLR, 
            id: 'lrWB'
        },
    ];

    const handleResults = () => {
        wheelBearings.map((item) => {
            let msg = ``

            if (item.bearing === 3) {                
                msg = `❌ ${item.name} wheel bearing has significant play.`;
                addToConcerns(3, msg);              
            } else if (item.bearing === 2) {
                msg = `🟡 ${item.name} wheel bearing has minor play.`;
                addToConcerns(2, msg);
            } else {
                msg = `✅ ${item.name} wheel bearing is good.`;
                addToConcerns(1, msg);
            }
        })        
    };

    return (
        <fieldset>
            <legend>Wheel Bearings</legend>
            {wheelBearings.map((item) => (
                <div key={item.id}>
                <h3>{item.name} play?</h3>
                <label>Pass
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={1} 
                            checked={item.bearing === 1} 
                            onChange={() => item.setBearing(1)} 
                        />
                    </label>
                    <label>Some concern
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={2} 
                            checked={item.bearing === 2} 
                            onChange={() => item.setBearing(2)} 
                        />
                    </label>
                    <label>Safety Concern
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={3} 
                            checked={item.bearing === 3} 
                            onChange={() => item.setBearing(3)} 
                        />
                    </label>
                </div>
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}