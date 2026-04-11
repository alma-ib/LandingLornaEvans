import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { SlidesSection } from './components/SlidesSection/SlidesSection';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <SlidesSection />
    </div>
  );
}

export default App;
