export const abrevNotes = (string) => {
    return string === '' ? '.' : `, ${string}`
 }

 export const reduceNotes = (array) => {
    return array.reduce((acc, item) => {
        if (item.notes !== '' ) {
            if (item.name) {
                const txt = `${item.name} ${item.notes}`
                acc.push(txt);
            } else {
                acc.push(item.notes)
            }                
        }
        return acc
    }, []).join(', ').replace(/\,(?=[^,]*$)/g, ', ');
};

export const formatTireSize = (tireSize) => {
    const regex = /^(\d{3})(\d{2})(\d{2})$/;
    const match = tireSize.match(regex)
    if (match) {
        return `${match[1]}/${match[2]}/${match[3]}`
    } else {
        return tireSize
    }
};
