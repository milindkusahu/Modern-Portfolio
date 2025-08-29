import { ReactLenis } from "lenis/react";
import { lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Header from "./components/Header";
import About from "./components/About";
import Hero from "./components/Hero";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Lazy load heavy components
const LiveCodeEditor = lazy(() => import("./components/LiveCodeEditor"));
const GithubCalender = lazy(() => import("./components/GithubCalender"));
const MediumBlog = lazy(() => import("./components/MediumBlog"));

const LiveCodeEditorSkeleton = () => (
  <div className="bg-zinc-800/50 p-4 rounded-xl animate-pulse">
    <div className="h-6 bg-zinc-700/50 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-zinc-700/50 rounded mb-4"></div>
    <div className="h-32 bg-zinc-700/50 rounded mb-4"></div>
    <div className="h-10 bg-zinc-700/50 rounded w-24 mb-4"></div>
    <div className="h-24 bg-zinc-700/50 rounded"></div>
  </div>
);

const GithubCalenderSkeleton = () => (
  <div className="h-[250px] w-full bg-zinc-800/50 rounded-xl animate-pulse"></div>
);

const MediumBlogSkeleton = () => (
  <div className="space-y-8">
    <div className="h-10 bg-zinc-800/50 rounded w-1/3 animate-pulse"></div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-zinc-800/50 rounded-xl h-96 animate-pulse">
          <div className="h-48 bg-zinc-700/50"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-zinc-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700/50 rounded"></div>
            <div className="h-4 bg-zinc-700/50 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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

        {/* GitHub Calendar Section */}
        <section className="section">
          <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">Proof of Work</h2>
            <div className="reveal-up w-full overflow-x-auto pb-4">
              <Suspense fallback={<GithubCalenderSkeleton />}>
                <GithubCalender />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Live Code Editor Section */}
        <section className="section">
          <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">Live Code Editor</h2>
            <div className="reveal-up">
              <Suspense fallback={<LiveCodeEditorSkeleton />}>
                <LiveCodeEditor />
              </Suspense>
            </div>
          </div>
        </section>

        <Skill />
        <Projects />

        {/* Medium Blog Section */}
        <section id="blog" className="section">
          <div className="container">
            <div className="reveal-up">
              <Suspense fallback={<MediumBlogSkeleton />}>
                <MediumBlog />
              </Suspense>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
}

export default App;
