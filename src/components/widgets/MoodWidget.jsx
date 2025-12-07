import MoodSliderInput from "../MoodSliderInput";

export default function MoodWidget( {selectedItems, onSelect} ) {

    const applyHappy = () => {
        onSelect({
            energy: { min: 0.8, max: 0.9 },
            valence: { min: 0.8, max: 0.9 },
            danceability: { min: 0.7, max: 0.8 },
            acousticness: { min: 0.1, max: 0.3 }
        });
    }

    const applySad = () => {
        onSelect({
            energy: { min: 0.2, max: 0.4 },
            valence: { min: 0.2, max: 0.4 },
            danceability: { min: 0.3, max: 0.5 },
            acousticness: { min: 0.3, max: 0.5 }
        });
    }

    const applyEnergetic = () => {
        onSelect({
            energy: { min: 0.9, max: 1.0 },
            valence: { min: 0.6, max: 0.8 },
            danceability: { min: 0.8, max: 1.0 },
            acousticness: { min: 0.0, max: 0.2 }
        });
    }

    const applyCalm = () => {
        onSelect({
            energy: { min: 0.2, max: 0.4 },
            valence: { min: 0.4, max: 0.6 },
            danceability: { min: 0.3, max: 0.5 },
            acousticness: { min: 0.6, max: 0.8 }
        });
    }


    return (
        
        <>
            <h2 className="text-2xl font-bold text-white text-center">Buscar por tu estado de animo</h2>
            <MoodSliderInput value={selectedItems} onChange={onSelect}/>
            <div className="flex justify-center gap-4 mt-4">
                <button onClick={applyHappy} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Happy</button>
                <button onClick={applySad} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Sad</button>
                <button onClick={applyEnergetic} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Energetic</button>
                <button onClick={applyCalm} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Calm</button>
            </div>
        </>
        
        
    )

}