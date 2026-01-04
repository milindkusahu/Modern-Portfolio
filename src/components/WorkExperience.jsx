import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import experiencesData from "../data/experiences.json";

const WorkExperience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">Work Experience</h2>

        <div className="text-zinc-400 mt-3 mb-8 max-w-[60ch] reveal-up">
          <p>My professional journey building exceptional web applications</p>
        </div>

        <div className="reveal-up">
          <VerticalTimeline lineColor="#3f3f46">
            {experiencesData.experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.id}
                contentStyle={{
                  background: "#27272a",
                  color: "#fafafa",
                  borderRadius: "1rem",
                  boxShadow: "0 0 0 1px rgba(250, 250, 250, 0.05)",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid #27272a",
                }}
                iconStyle={{
                  background: "#18181b",
                  boxShadow: "0 0 0 4px #38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={
                  <img
                    src={experience.icon}
                    alt={experience.company}
                    className="w-full h-full object-contain p-2 rounded-full"
                  />
                }
              >
                <h3 className="title-1 text-zinc-50">{experience.position}</h3>
                <h4 className="text-sky-400 font-medium mt-1">
                  {experience.company}
                </h4>
                <p className="text-zinc-400 text-sm mt-1">
                  {experience.duration} • {experience.location}
                </p>
                <p className="text-zinc-300 mt-4 leading-relaxed">
                  {experience.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {experience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center px-3 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
