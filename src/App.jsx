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
import ErrorBoundary from "./components/ErrorBoundary";

import {
  LiveCodeEditorSkeleton,
  GithubCalenderSkeleton,
  MediumBlogSkeleton,
} from "./components/LoadingSkeletons";

// Lazy load heavy components
const LiveCodeEditor = lazy(() => import("./components/LiveCodeEditor"));
const GithubCalender = lazy(() => import("./components/GithubCalender"));
const MediumBlog = lazy(() => import("./components/MediumBlog"));

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
              <ErrorBoundary fallbackMessage="Unable to load GitHub calendar. Please try again later.">
                <Suspense fallback={<GithubCalenderSkeleton />}>
                  <GithubCalender />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* Live Code Editor Section */}
        <section className="section">
          <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">Live Code Editor</h2>
            <div className="reveal-up">
              <ErrorBoundary fallbackMessage="Unable to load code editor. Please try again later.">
                <Suspense fallback={<LiveCodeEditorSkeleton />}>
                  <LiveCodeEditor />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        <Skill />
        <Projects />

        {/* Medium Blog Section */}
        <section id="blog" className="section">
          <div className="container">
            <div className="reveal-up">
              <ErrorBoundary fallbackMessage="Unable to load blog posts. Please try again later.">
                <Suspense fallback={<MediumBlogSkeleton />}>
                  <MediumBlog />
                </Suspense>
              </ErrorBoundary>
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
