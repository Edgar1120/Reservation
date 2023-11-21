import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Restaurant } from './Restaurant';
import { Tour } from './Tour';
import { Footer } from './Footer';
import { Contact } from "./Contact";





export function Home() {
  return (
    <div className="App">

      <NavBar />
      <Banner />
      <Restaurant />
      <Tour />
      <Contact />
      <Footer />

    </div>
  );

}

export default Home;