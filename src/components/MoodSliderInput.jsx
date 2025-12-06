

export default function MoodSliderInput ({ value, onChange }) {

    const changeEnergy = (e) => {
        const energyVal = Number(e.target.value)
        onChange(prev => ({...prev, energy: energyVal}))
    }

    const changeValence = (e) => {
        const valenceVal = Number(e.target.value)        
        onChange(prev => ({...prev, valence:valenceVal}))
    }

    const changeDanceability = (e) => {
        const danceVal = Number(e.target.value)
        onChange(prev => ({...prev, danceability:danceVal}))
    }

    const changeAcousticness = (e) => {
        const accVal = Number(e.target.value)
        onChange(prev => ({...prev, acousticness: accVal}))
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <label className="text-white font-semibold mb-1">
                Energy: {value.energy}
            </label>
            <input type="range" min={0} max={1} step={0.01} value={value.energy} onChange={changeEnergy} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>

            <label className="text-white font-semibold mb-1">
                Valence: {value.valence}
            </label>
            <input type="range" min={0} max={1} step={0.01} value={value.valence} onChange={changeValence} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>

            <label className="text-white font-semibold mb-1">
                Danceability: {value.danceability}
            </label>
            <input type="range" min={0} max={1} step={0.01} value={value.danceability} onChange={changeDanceability} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>

            <label className="text-white font-semibold mb-1">
                Acousticness: {value.acousticness}
            </label>
            <input type="range" min={0} max={1} step={0.01} value={value.acousticness} onChange={changeAcousticness} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>
        </div>
    )

}