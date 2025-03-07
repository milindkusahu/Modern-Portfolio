import { ButtonPrimary, ButtonOutline } from "./Button";

const Hero = () => {
  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/images/avatar-1.jpg"
                width={40}
                height={40}
                alt="Milind Kumar Sahu portrait"
                className="img-cover"
              />
            </figure>

            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
            Building Scalable Modern Websites for the Future
          </h2>

          <div className="flex items-center gap-3">
            <ButtonPrimary
              label="Download CV"
              icon="download"
              href="./Milind_Kumar_Sahu_V1_Masked.pdf"
              rel="nofollow"
            />

            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <figure className="w-full max-w-[305px] ml-auto">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-400 opacity-50 blur-md animate-pulse"></div>

              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-500 opacity-30 blur-lg animate-spin-slow"></div>

              <img
                src="/images/milind-kumar-sahu.png"
                width={656}
                height={800}
                alt="Milind Kumar Sahu"
                className="relative w-full h-full object-cover rounded-full z-10"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
