import MinMaxSliderInput from "./MinMaxSliderInput"


export default function MoodSliderInput ({ value, onChange }) {

    const changeEnergy = (energyVal) => {
        onChange(prev => ({...prev, energy: energyVal}))
    }

    const changeValence = (valenceVal) => {   
        onChange(prev => ({...prev, valence:valenceVal}))
    }

    const changeDanceability = (danceVal) => {
        onChange(prev => ({...prev, danceability:danceVal}))
    }

    const changeAcousticness = (accVal) => {
        onChange(prev => ({...prev, acousticness: accVal}))
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <MinMaxSliderInput label="Energy" value={value.energy} onChange={changeEnergy} min={0} max={1} step={0.01} />

            <MinMaxSliderInput label="Valence" value={value.valence} onChange={changeValence} min={0} max={1} step={0.01}/>

            <MinMaxSliderInput label="Danceability" value={value.danceability} onChange={changeDanceability} min={0} max={1} step={0.01}/>

            <MinMaxSliderInput label="Acousticness" value={value.acousticness} onChange={changeAcousticness} min={0} max={1} step={0.01}/>
        </div>
    )

}