
export default function MinMaxSliderInput ({ label,value, onChange, min, max, step }) {

    const minValue = value?.min ?? min;
    const maxValue = value?.max ?? max;

    const handleMinChange = (e) => {
        const minVal = Number(e.target.value);
        if (minVal <= maxValue) {
            onChange({
                min: minVal,
                max: maxValue
            });
        }
            
    };

    const handleMaxChange = (e) => {
        const maxVal = Number(e.target.value);
        if (maxVal >= minValue) {
            onChange({
                min: minValue,
                max: maxVal
            });
        }
        
    };


    return (
        <div className="flex flex-col w-full gap-6">
            <label className="text-white font-semibold mb-1">
                {label} Minima: {value.min}
            </label>
            <input type="range" min={min} max={max} step={step} value={minValue } onChange={handleMinChange} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>

            <label className="text-white font-semibold mb-1">
                {label} Maxima: {value.max}
            </label>
            <input type="range" min={min} max={max} step={step} value={maxValue} onChange={handleMaxChange} 
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer
                 appearance-none
                 slider-thumb-green"></input>
        </div>
    )

}