import About from "./components/About";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skill from "./components/Skill";
import Projects from "./components/Projects";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Skill />
        <Projects />
      </main>
    </div>
  );
}

export default App;
