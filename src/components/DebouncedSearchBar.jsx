"use client"
import { useDebounce } from "@/lib/useDebounce"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function DebouncedSearchBar({ onSearch }) {

    const { register, watch } = useForm({
        defaultValues: {query: ""}
    })

    const query = watch("query")

    const debouncedQuery = useDebounce(query,200)

    useEffect(() => {
        onSearch(debouncedQuery)
    },[debouncedQuery])
    

    return (
        <div className="w-full">
            <input {...register('query')} placeholder="Introduce Nombre del Artista" className="w-full bg-[#212121] py-2 px-4 my-2"></input>
        </div>
    )

}