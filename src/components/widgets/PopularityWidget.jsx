import PopularitySliderInput from "../PopularitySliderInput";

export default function PopularityWidget({ selectedItems, onSelect }) {

    const applyMainstream = () => {
        onSelect({min: 80, max:100})
    }

    const applyPopular = () => {
        onSelect({min: 50, max:80})
    }

    const applyUnderground = () => {
        onSelect({min: 0, max:50})
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-white text-center">Buscar por popularidad</h2>
            <PopularitySliderInput value={selectedItems} onChange={onSelect}/>
            <div className="flex justify-center gap-4 mt-4">
                <button onClick={applyMainstream} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Mainstream</button>
                <button onClick={applyPopular} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Popular</button>
                <button onClick={applyUnderground} className="px-4 py-2 bg-[#212121] text-white font-semibold rounded-lg hover:bg-[#1ed760] transition-colors">Underground</button>
            </div>
        </>
        
    )

}