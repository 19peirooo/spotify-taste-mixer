
export default function AccountMenu({username, onLogout, onClose}) {
    return (
        <div className="absolute right-0 mt-2 w-44 bg-[#191414] text-white rounded-xl 
            shadow-xl animate-fade z-9999">
                <p className="font-semibold mb-3 pl-3">{username}</p>
                <button onClick={onLogout} className="w-full text-left text-red-400 hover:text-red-300 hover:bg-[#1DB954] transition py-3 pl-3 hover:underline">Logout</button>
                <button className="w-full text-left hover:bg-[#1DB954] py-3 pl-3 hover:underline" onClick={onClose}>Close Menu</button>
        </div>
    );
}
