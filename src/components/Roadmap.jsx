import { curve, grid, check } from "../assets";
import { roadmap } from "../constants";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading
        tag="Ready To Get Started"
        className="md:max-w-md lg:max-w-2xl"
        title={
          <>
            From Idea to{" "}
            <span className="inline-block relative font-semibold">
              Reality
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>{" "}
            <br /> in Simple 4 Steps
          </>
        }
      />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {roadmap.map((item) => {
          const stepNumber = `Step`;

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <img
                    className="w-full pointer-events-none select-none"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <div className="flex items-center px-4 py-1 bg-color-1 rounded text-n-8">
                      <div className="tagline text-white font-semibold">
                        {stepNumber}
                      </div>
                      <div className="w-10 h-10 bg-n-8 ml-2 rounded-full flex items-center justify-center mr-2.5">
                        <span className="text-color-1  font-bold text-sm">
                          {parseInt(item.id) + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-10 -my-10 -mx-15">
                    <img
                      className={`w-full ${
                        item.status !== "done" && "animate-pulse"
                      } pointer-events-none select-none`}
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>

                  <h4 className="h4 mb-4">{item.title}</h4>
                  <p className="body-2 text-n-4 mb-6">{item.text}</p>

                  {/* Points List */}
                  {item.points && (
                    <ul className="space-y-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-color-1 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <img
                              width={12}
                              height={12}
                              src={check}
                              alt="check"
                              className="pointer-events-none select-none"
                            />
                          </div>
                          <span className="body-2 text-n-2">{point.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <Gradient />
      </div>

      <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
        <Button href="#">Our roadmap</Button>
      </div>
    </div>
  </Section>
);

export default Roadmap;
