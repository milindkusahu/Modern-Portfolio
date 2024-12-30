import About from "./components/About";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Skill />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
