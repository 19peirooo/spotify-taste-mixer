
export default function PopularitySliderInput ({ value, onChange }) {

    const handleMinChange = (e) => {
        const minVal = Number(e.target.value)
        if (minVal <= value.max) {
            onChange(prev => ({...prev, min: minVal}))
        }
    }

    const handleMaxChange = (e) => {
        const maxVal = Number(e.target.value)
        if (maxVal >= value.min) {
            onChange(prev => ({...prev, max: maxVal}))
        }
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <label className="text-white font-semibold mb-1">
                Popularidad Minima: {value.min}
            </label>
            <input type="range" min={0} max={100} step={1} value={value.min} onChange={handleMinChange} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>

            <label className="text-white font-semibold mb-1">
                Popularidad Maxima: {value.max}
            </label>
            <input type="range" min={0} max={100} step={1} value={value.max} onChange={handleMaxChange} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>
        </div>
    )

}