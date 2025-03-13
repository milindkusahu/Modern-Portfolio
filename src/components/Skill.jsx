import SkillCard from "./SkillCard";

const skillItem = [
  // Frontend Fundamentals
  {
    imgSrc: "/images/html5.svg",
    label: "HTML5",
    desc: "Structure",
  },
  {
    imgSrc: "/images/css3.svg",
    label: "CSS",
    desc: "Styling",
  },
  {
    imgSrc: "/images/sass.svg",
    label: "Sass",
    desc: "CSS Preprocessor",
  },
  {
    imgSrc: "/images/javascript.svg",
    label: "JavaScript",
    desc: "Programming",
  },
  {
    imgSrc: "/images/typescript.svg",
    label: "TypeScript",
    desc: "Type-Safe JS",
  },

  // Frontend Frameworks & Libraries
  {
    imgSrc: "/images/react.svg",
    label: "React",
    desc: "UI Library",
  },
  {
    imgSrc: "/images/nextjs.svg",
    label: "Next.js",
    desc: "React Framework",
  },
  {
    imgSrc: "/images/tailwindcss.svg",
    label: "TailwindCSS",
    desc: "Utility Framework",
  },
  {
    imgSrc: "/images/bootstrap.svg",
    label: "Bootstrap",
    desc: "CSS Framework",
  },

  // Backend & Database
  {
    imgSrc: "/images/nodejs.svg",
    label: "Node.js",
    desc: "Runtime Environment",
  },
  {
    imgSrc: "/images/expressjs.svg",
    label: "Express.js",
    desc: "Backend Framework",
  },
  {
    imgSrc: "/images/mongodb.svg",
    label: "MongoDB",
    desc: "NoSQL Database",
  },
  {
    imgSrc: "/images/postgresql.svg",
    label: "PostgreSQL",
    desc: "SQL Database",
  },
  {
    imgSrc: "/images/firebase.svg",
    label: "Firebase",
    desc: "Backend Platform",
  },

  // Tools & Operations
  {
    imgSrc: "/images/figma.svg",
    label: "Figma",
    desc: "UI/UX Design",
  },
  {
    imgSrc: "/images/docker.svg",
    label: "Docker",
    desc: "Containerization",
  },
];

const Skill = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up">Essential Tools I use</h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          Discover the powerful tools and technologies I use to create
          exceptional, high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard
              key={key}
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              classes="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
