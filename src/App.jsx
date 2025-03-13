import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LiveCodeEditor from "./components/LiveCodeEditor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Header from "./components/Header";
import About from "./components/About";
import Hero from "./components/Hero";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GithubCalender from "./components/GithubCalender";

function App() {
  useGSAP(() => {
    const elements = gsap.utils.toArray(".reveal-up");

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "-200 bottom",
          end: "bottom 80%",
          scrub: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });
  });

  return (
    <ReactLenis root>
      <Header />
      <main>
        <Hero />
        <About />
        <section className="section">
          <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">Proof of Work</h2>
            <div className="reveal-up w-full overflow-x-auto pb-4">
              <GithubCalender />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">Live Code Editor</h2>
            <div className="reveal-up">
              <LiveCodeEditor />
            </div>
          </div>
        </section>
        <Skill />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
}

export default App;
