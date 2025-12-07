"use client"

import DecadeList from "../DecadeList"

export default function DecadeWidget({ onSelect, selectedItems }) {

    const availableDecades = ["1950","1960","1970","1980","1990","2000","2010","2020"]

    const toggleDecade = (decade) => {

        const exists = selectedItems.some(d => d === decade)

        if (exists) {
            onSelect(selectedItems.filter(d => d !== decade))
        } else {
            onSelect([...selectedItems,decade])
        }

    }

    
    return (
        <>
            <h2 className="text-2xl font-bold text-white text-center">Buscar Decadas</h2>
            <DecadeList decades={availableDecades} onSelect={toggleDecade} selectedDecades={selectedItems}/>
        </>
    )

}