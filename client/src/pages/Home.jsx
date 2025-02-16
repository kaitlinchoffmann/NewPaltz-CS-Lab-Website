import Hero from '../components/HomePage/HeroSection';
import BentoBox from '../components/HomePage/BentoBox';

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <BentoBox />
    </div>
  );
};

export default Home;
