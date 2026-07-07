import pcmLogo from "../img/pcm_logo.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-center mx-auto w-full mb-8 mt-2 print:mt-0">
      <img src={pcmLogo} alt="pcm logo" className="size-24 mr-4" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">P.C.M. COSMETIC PRODUCTS TRADING</h1>
        <h1>BlK 16 LOT 1A, BRGY. SAN DIONISIO, DASMARIÑAS CITY, CAVITE</h1>
        <h1>0464234844 / 09238713111 / 09399336243</h1>
      </div>
    </div>
  );
};

export default Header;
