import pcmLogo from '../img/2.png'

const Header = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center min-h-[20vh] p-4'>
        <img src={pcmLogo} alt="pcm logo" className='w-64 h-64' />
        <h1 className='text-4xl' >P.C.M. COSMETIC PRODUCTS TRADING</h1>
        <h1>BlK 16 LOT 1-A ,BRGY SAN DIONISIO DASMARINAS CAVITE</h1>
        <h1>0464234844 / 09238713111 / 09053429588</h1>
    </div>
  )
}

export default Header
