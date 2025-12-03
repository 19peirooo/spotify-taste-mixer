import NavBarSearch from "@/components/NavBarSearch";

export default function SearchLayout ({children}) {
    return (
        <>
            <NavBarSearch />
            {children}
        </>
    )
}