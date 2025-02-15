import pcmLogo from '../img/2.png'

const Header = () => {
  return (
    <div className='flex min-h-[20vh] p-4 items-center mx-auto header-div'>
      <img src={pcmLogo} alt="pcm logo" className='size-24 mr-4' />
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>P.C.M. COSMETIC PRODUCTS TRADING</h1>
        <h1>BlK 16 LOT 1A ,BRGY SAN DIONISIO DASMARINAS CAVITE</h1>
        <h1>0464234844 / 09238713111 / 09053429588</h1>
      </div>
    </div>
  )
}

export default Header