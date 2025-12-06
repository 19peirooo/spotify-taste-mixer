import PopularitySliderInput from "../PopularitySliderInput";

export default function PopularityWidget({ selectedItems, onSelect }) {

    return (
        <>
            <h2 className="text-2xl font-bold text-white text-center">Buscar por popularidad</h2>
            <PopularitySliderInput value={selectedItems} onChange={onSelect}/>
        </>
        
    )

}