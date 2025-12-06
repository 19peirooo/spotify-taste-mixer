import MoodSliderInput from "../MoodSliderInput";

export default function MoodWidget( {selectedItems, onSelect} ) {

    const applyHappy = () => {
        onSelect({
            energy: 0.8,
            valence: 0.8,
            danceability: 0.7,
            acousticness: 0.2
        });
    }

    const applySad = () => {
        onSelect({
            energy: 0.3,
            valence: 0.3,
            danceability: 0.4,
            acousticness: 0.3
        });
    }

    const applyEnergetic = () => {
        onSelect({
            energy: 0.9,
            valence: 0.7,
            danceability: 0.8,
            acousticness: 0.1
        });
    }

    const applyCalm = () => {
        onSelect({
            energy: 0.25,
            valence: 0.5,
            danceability: 0.4,
            acousticness: 0.7
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