import { useEffect, useState } from 'react'

export const Tires = ({ addToConcerns }) => {
    const [tireSize, setTireSize] = useState('');
    const [tireNotes, setTireNotes] = useState('');
    const [isAWD, setIsAWD] = useState(false);
    // LF
    const [lFDate, setLFDate] = useState('');
    const [lFTread, setLFTread] = useState(8);
    const [isUnevenLF, setIsUnevenLF] = useState(false);
    // RF
    const [rFDate, setRFDate] = useState('');
    const [rFTread, setRFTread] = useState(8);
    const [isUnevenRF, setIsUnevenRF] = useState(false);
    // RR
    const [rRDate, setRRDate] = useState('');
    const [rRTread, setRRTread] = useState(8);
    const [isUnevenRR, setIsUnevenRR] = useState(false);
    // LR
    const [lRDate, setLRDate] = useState('');
    const [lRTread, setLRTread] = useState(8);
    const [isUnevenLR, setIsUnevenLR] = useState(false);



    const tireInfo = [
      {
            name: 'Left front',
            date: lFDate,
            setDate: setLFDate,
            tread: lFTread,
            setTread: setLFTread,
            isUneven: isUnevenLF,
            setIsUneven: setIsUnevenLF
        },
        {
            name: 'Right front',
            date: rFDate,
            setDate: setRFDate,
            tread: rFTread,
            setTread: setRFTread,
            isUneven: isUnevenRF,
            setIsUneven: setIsUnevenRF
        },
        {
            name: 'Right rear',
            date: rRDate,
            setDate: setRRDate,
            tread: rRTread,
            setTread: setRRTread,
            isUneven: isUnevenRR,
            setIsUneven: setIsUnevenRR
        },
        {
            name: 'Left rear',
            date: lRDate,
            setDate: setLRDate,
            tread: lRTread,
            setTread: setLRTread,
            isUneven: isUnevenLR,
            setIsUneven: setIsUnevenLR
        },
    ];

 
    const handleResults = () => {

        const now = new Date();
        const twoDigitYear = now.getFullYear() - 2000;        

        const expiredTire = twoDigitYear > 7
        const marginalTire = twoDigitYear === 6      
        
        const getTireAge = (date) => twoDigitYear - (date % 100);

        tireInfo.map((item) => {
            const tireAge = getTireAge(item.date);            
            let msg = `${item.name}: ${item.tread}/32, ${expiredTire || marginalTire ? tireAge + ' years old,' : ''} ${item.isUneven ? 'Uneven wear' : '' }`
            // No date code info
            if (item.date === '') {
                msg = `${item.name}: ${item.tread}/32, ${item.isUneven ? 'Uneven wear' : '' }`
            }            
           // Sort by tire age, tread, and uneven wear
            if (tireAge >= 7 || item.tread < 3) {
                addToConcerns(3, `❌ ${msg}`)
            } else if ((item.tread <= 5 && item.tread >= 3) || (marginalTire) || item.isUneven) {
                addToConcerns(2, msg)
            } else {                    
                addToConcerns(1, `✅ ${msg}`)               
            } 
        })
    };



    return (
        <fieldset >
            <legend>Tires</legend>
            <label>Tire size: 
                <input 
                    type='text'
                    value={tireSize}
                    onChange={(e) => setTireSize(e.target.value)}
                />
            </label>
            <label> Tire Notes:
                <textarea 
                    value={tireNotes}
                    onChange={(e) => setTireNotes(e.target.value)}
                />
            </label>
            <h4>AWD</h4>
            <label>True
                <input type='radio' name='awdRadio' value={true} checked={isAWD} onChange={() => setIsAWD(true)}/>
            </label>
            <label>False   
                <input type='radio' name='awdRadio' value={false} checked={!isAWD} onChange={() => setIsAWD(false)}/>
            </label>
           
            {tireInfo.map((item, index) => (
                <div key={index} className='flexCol'>
                     <hr></hr>
                    <h4>{item.name}</h4>
                    <label> Tread depth:
                        <input 
                            type='number'
                            value={item.tread}
                            onChange={(e) => item.setTread(e.target.value)}
                        />
                    </label>
                    <label>Date code:
                        <input 
                            type='number'
                            value={item.date}
                            onChange={(e) => item.setDate(e.target.value)}
                        />
                    </label>
                    <h4>Uneven wear?</h4>
                    <label>True
                        <input type='radio'  value={true} name={item.name} checked={item.isUneven} onChange={() => item.setIsUneven(true) }/>
                    </label>
                    <label>False
                        <input type='radio' value={false} name={item.name} checked={!item.isUneven} onChange={() => item.setIsUneven(false) } />
                    </label>
                    
                </div>               
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}