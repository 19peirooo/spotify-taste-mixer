"use client"
import {useForm} from 'react-hook-form'
import { FaSearch } from "react-icons/fa";

export default function SearchForm({onSearch}) {
    
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        onSearch(data.query)
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex items-center justify-center'>
            <input {...register('query')} placeholder="Introducir texto" className='w-[90%] bg-[#212121] py-2 px-4 my-2'></input>
            <button className='bg-[#1DB954] text-white py-2 px-4 rounded-md ml-2'><FaSearch></FaSearch></button>
        </form>
    );

}