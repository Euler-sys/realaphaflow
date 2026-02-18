
import CryptoMarketScreener from '../Home/crypto';
import Footer from '../Home/footer';
import Header from '../Home/header';

import HelpSection from '../Home/hero2';
import PartnersSection from '../Home/partner';
// import hero from '../assets/hero.jpg';
import AboutUs from '../components/about';
import ForexCrossRatesWidget from '../components/forex';
import InnovationSection from '../components/innovation';
import Promotions from '../components/promotions';
import RatesSection from '../components/ratesection';
// import SupportBot from '../components/support';


const Home: React.FC = () => {
 

  return (
    <>

    <Header/>

    
   
    <HelpSection/>
    
  <AboutUs/>
  <InnovationSection/>
    <Promotions/>
    <RatesSection/>
    <ForexCrossRatesWidget></ForexCrossRatesWidget>
    <CryptoMarketScreener/>
    <PartnersSection/>
    {/* <SupportBot/> */}

    <Footer/>

    
    </>
  
  );
};

export default Home;
