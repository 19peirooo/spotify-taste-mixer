"use client"
import {useForm} from 'react-hook-form'

export default function SubmitForm({onSearch}) {
    
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        onSearch(data.name, data.descripcion)
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center justify-center bg-green-900 border border-[#1ed760] py-2 my-2 rounded-md'>
            <h1 className='text-xl font-bold text-white'>Guardar Playlist</h1>
            <input {...register('name')} placeholder="Introducir Nombre del Playlist" className='w-[90%] bg-[#212121] py-2 px-4 my-2'></input>
            <input {...register('descripcion')} placeholder="Introducir Descripcion" className='w-[90%] bg-[#212121] py-2 px-4 my-2'></input>
            <button className='bg-[#1DB954] text-black py-2 px-4 rounded-md ml-2'>Guardar</button>
        </form>
    );

}