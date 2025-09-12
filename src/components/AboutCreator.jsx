import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import { brainwave, ceo, check, curve } from "../assets";
import Button from "./Button";

const AboutCreator = () => {
  return (
    <Section crosses className="!py-10 lg:!py-16 xl:!py-20" id="about">
      <div className="container px-5 mx-auto">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title={
            <>
              Meet {" "}
              <span className="inline-block relative font-semibold">
                Abhishek
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </>
          }
        />

        <div className="relative">
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-10 lg:mb-16 lg:-mt-14 ">
            <p className="body-1 text-n-3 mb-6">
              Founder, CEO & Lead Developer behind <span className="text-color-1 font-semibold">CCC</span>
            </p>

            <div className="max-w-3xl mx-auto">
              <p className="body-2 text-n-4 mb-6">
                With over 3 years of experience in web development, he's
                dedicated his career to creating efficient, scalable solutions
                for WordPress developers. <span className="text-color-4 font-semibold">Custom Craft Components</span>  was born from
                the frustration of building the same components repeatedly
                across different projects.
              </p>

              <p className="body-2 text-n-4 mb-6">
                My mission is to streamline the WordPress development workflow
                by providing AI-powered tools that generate clean, maintainable
                code. I believe that developers should focus on solving unique
                problems, not reinventing common components.
              </p>
            </div>
          </div>
        </div>

         {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="max-w-2xl mx-auto">
                <h3 className="h3 mb-4">
                  Ready to revolutionize your WordPress development workflow?
                </h3>
                <p className="body-1 text-n-3 mb-8">
                  Join a Community of developers who are already building faster
                  with CCC
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className=" flex" href="/pricing">
                    Lets Get Started
                  </Button>
                </div>
              </div>
            </div>
      </div>
    </Section>
  );
};

export default AboutCreator;
