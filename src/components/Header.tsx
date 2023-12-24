 const Header = ()=> {
    return(
        <div className=" mx-auto flex items-center justify-between py-6 px-4 bg-opacity-80 backdrop-filter backdrop-blur-lg bg-black">
            <p className='text-white font-bold'> Logo Craft</p>
            <button className="bg-white text-black font-bold py-4 px-8 rounded-full border border-black hover:border-blue-500 hover:text-blue-500">
                Connect Wallet
            </button>    
        </div>
    )
}
export default Header;