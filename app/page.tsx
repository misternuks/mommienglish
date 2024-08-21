import Banner from './components/banner';
import Concept from './components/concept';
import Mission from './components/mission';
import Service from './components/service';
import Fee from './components/fee';

export default function HomePage() {
  return (
    <main>
      <Banner />
      <Concept />
      <Mission />
      <Service />
      <Fee />
    </main>
  );
}
