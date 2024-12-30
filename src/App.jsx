import About from "./components/About";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skill from "./components/Skill";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Skill />
      </main>
    </div>
  );
}

export default App;
