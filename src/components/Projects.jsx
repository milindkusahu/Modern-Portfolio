import ProjectCard from "./ProjectCard";

const projects = [
  {
    imgSrc: "/images/project-7.jpg",
    title: "StayFinder | Discover Your Perfect Stay",
    tags: ["React JS", "Redux", "Tailwind CSS", "JWT Token", "Axios"],
    projectLink: "https://stay-finder-iota.vercel.app/",
  },
  {
    imgSrc: "/images/project-1.jpg",
    title: "NetflixGPT | AI Powered Movie Recommendations",
    tags: ["React JS", "Redux", "Tailwind CSS", "Firebase", "GPT-3"],
    projectLink: "https://flix-gpt-seven.vercel.app/",
  },
  {
    imgSrc: "/images/project-2.jpg",
    title: "Medify | Medical Center Slot Booking",
    tags: ["React JS", "Material-UI", "Swiper JS", "Axios"],
    projectLink: "https://medify-three-puce.vercel.app/",
  },
  {
    imgSrc: "/images/project-3.jpg",
    title: "QKart | E-Commerce Platform",
    tags: ["ReactJS", "NodeJS", "Express", "Mongo DB", "Mongoose", "JWT Token"],
    projectLink: "https://qkart-frontend-opal-psi.vercel.app/",
  },
  {
    imgSrc: "/images/project-4.jpg",
    title: "Qtify | Music Browsing App",
    tags: [
      "ReactJS",
      "Material UI",
      "Swiper",
      "CSS Modules",
      "Flexbox",
      "CSS Variables",
    ],
    projectLink: "https://qtify-nine-rouge.vercel.app/",
  },
  {
    imgSrc: "/images/project-5.jpg",
    title: "QTrip | Travel Booking Platform",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "REST", "JSON"],
    projectLink: "https://qtrip-dynamic-omega.vercel.app/",
  },
  {
    imgSrc: "/images/project-6.jpg",
    title: "Expense Tracker App",
    tags: [
      "React.js",
      "Recharts",
      "React Modal/Icons",
      "Notistack",
      "LocalStorage",
    ],
    projectLink: "https://expense-tracker-phi-hazel.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">My portfolio highlights</h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {projects.map(({ imgSrc, title, tags, projectLink }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
