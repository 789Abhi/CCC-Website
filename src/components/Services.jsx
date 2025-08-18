import { useState } from "react";
import { service1, service2, service3, check } from "../assets";
import {
  brainwaveServicesIcons,
  step1,
  step2,
  step3,
  step4,
} from "../constants";
import Generating from "./Generating";
import Heading from "./Heading";
import Section from "./Section";
import { curve } from "../assets";
import {
  Gradient,
  PhotoChatMessage,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

const Services = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
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
              </span>
              <br /> in Simple 4 Steps
            </>
          }
          text="Experience the magic of AI-powered WordPress development"
        />

        <div className="relative">
          {/* Step 1 */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Smartest AI"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[22rem] ml-auto">
              <h4 className="h4 mb-4">Describe Your Component</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Simply tell CCC what you need in natural language. 'A
                testimonial section with image, name, and quote.'
              </p>
              <ul className="body-2">
                {step1.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      width={24}
                      height={24}
                      src={check}
                      alt="check"
                      className="pointer-events-none select-none"
                    />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Step 2 */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Smartest AI"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[22rem] ml-auto">
              <h4 className="h4 mb-4">AI Generates Everything</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Our AI creates the complete component structure, fields, PHP
                templates, and responsive styling.
              </p>
              <ul className="body-2">
                {step2.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      width={24}
                      height={24}
                      src={check}
                      alt="check"
                      className="pointer-events-none select-none"
                    />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>
          {/* Step 3 */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Smartest AI"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[22rem] ml-auto">
              <h4 className="h4 mb-4">Customize & Deploy</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Fine-tune your component through our intuitive interface and
                deploy instantly to your WordPress site.
              </p>
              <ul className="body-2">
                {step3.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      width={24}
                      height={24}
                      src={check}
                      alt="check"
                      className="pointer-events-none select-none"
                    />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Step 4 */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Smartest AI"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[22rem] ml-auto">
              <h4 className="h4 mb-4">Use Anywhere</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Add your component to any page, customize content, and watch
                your site come to life with minimal effort.
              </p>
              <ul className="body-2">
                {step4.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      width={24}
                      height={24}
                      src={check}
                      alt="check"
                      className="pointer-events-none select-none"
                    />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>
          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
