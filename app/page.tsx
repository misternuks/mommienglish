import Banner from './components/banner';
import Concept from './components/concept';
import Mission from './components/mission';
import Service from './components/service';
import Fee from './components/fee';
import Contact from './components/contact';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function HomePage() {
  return (
    <main id="main-page">
      <Banner />
      <Navbar />
      <Concept />
      <Mission />
      <Service />
      <Fee />
      <Contact />
      <Footer />
    </main>
  );
}
