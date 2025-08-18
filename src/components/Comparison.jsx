import Section from "./Section";
import Heading from "./Heading";
import { check, brainwave, curve } from "../assets";
import Button from "./Button";

const Comparison = () => {
  const comparisonData = [
    {
      feature: "AI-Powered Component Generation",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Built-in Layout Generator",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Natural Language Prompts",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Auto-Generated Templates",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Complete Component Builder",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Custom Field Support",
      ccc: true,
      acf: true,
      metabox: true,
      pods: true,
    },
    {
      feature: "Theme Integration",
      ccc: true,
      acf: true,
      metabox: true,
      pods: true,
    },
    {
      feature: "Developer API",
      ccc: true,
      acf: true,
      metabox: true,
      pods: true,
    },
    {
      feature: "Multi-Instance Support",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Zero Coding Required",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
  ];

  const renderCheckmark = (supported) => {
    if (supported) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25">
            <span className="text-white text-sm font-bold">✗</span>
          </div>
        </div>
      );
    }
  };

  return (
    <Section crosses className="!py-10 lg:!py-16 xl:!py-20" id="comparison">
      <div className="container px-5 mx-auto">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Why{" "}
              <span className="inline-block relative font-semibold">
                CCC{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>{" "}
              Leads
              <br />
              the Competition
            </>
          }
        />

        <div className="relative">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-color-1/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-color-2/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-1 max-w-[80rem] mx-auto">
            {/* Comparison Table */}
            <div className="bg-n-7/50 rounded-3xl border border-n-6 overflow-hidden shadow-2xl shadow-n-8/50">
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 p-8 bg-gradient-to-r from-n-6/80 to-n-7/80 border-b border-n-6">
                <div className="text-center">
                  <h4 className="h4 text-n-1 mb-2">Features</h4>
                  <div className="w-16 h-1 bg-gradient-to-r from-color-1 to-color-2 rounded-full mx-auto" />
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-color-1 to-color-2 rounded-2xl flex items-center justify-center shadow-lg shadow-color-1/25">
                      <span className="text-2xl font-bold text-n-8">C</span>
                    </div>
                    <h4 className="h5 text-color-1">CCC</h4>
                    <div className="flex items-center gap-2 px-3 py-1 bg-color-1/20 rounded-full border border-color-1/30">
                      <span className="text-xs text-color-1">👑</span>
                      <span className="text-xs text-color-1 font-semibold">
                        AI Powered
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-n-6 rounded-2xl flex items-center justify-center border border-n-5">
                      <span className="text-2xl font-bold text-n-3">A</span>
                    </div>
                    <h4 className="h5 text-n-3">ACF</h4>
                    <div className="px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">
                      <span className="text-xs text-orange-400 font-semibold">
                        Popular
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-n-6 rounded-2xl flex items-center justify-center border border-n-5">
                      <span className="text-2xl font-bold text-n-3">M</span>
                    </div>
                    <h4 className="h5 text-n-3">MetaBox</h4>
                    <div className="px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">
                      <span className="text-xs text-orange-400 font-semibold">
                        Pro
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-n-6 rounded-2xl flex items-center justify-center border border-n-5">
                      <span className="text-2xl font-bold text-n-3">P</span>
                    </div>
                    <h4 className="h5 text-n-3">Pods</h4>
                    <div className="px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">
                      <span className="text-xs text-orange-400 font-semibold">
                        Open Source
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rows */}
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-4 p-6 transition-all duration-300 hover:bg-n-7/70 ${
                    index % 2 === 0 ? "bg-n-7/30" : "bg-n-7/50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="body-2 text-n-1 font-medium">
                      {item.feature}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCheckmark(item.ccc)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCheckmark(item.acf)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCheckmark(item.metabox)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCheckmark(item.pods)}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-n-7/50 to-n-6/50 border border-n-6 hover:border-color-1/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-color-1 to-color-2 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-color-1/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-n-8">⚡</span>
                </div>
                <div className="text-4xl font-bold text-color-1 mb-2">10x</div>
                <div className="text-sm text-n-3">Faster Development</div>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-n-7/50 to-n-6/50 border border-n-6 hover:border-color-1/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-color-2 to-color-3 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-color-2/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-n-8">📝</span>
                </div>
                <div className="text-4xl font-bold text-color-2 mb-2">90%</div>
                <div className="text-sm text-n-3">Less Code to Write</div>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-n-7/50 to-n-6/50 border border-n-6 hover:border-color-1/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-color-3 to-color-4 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-color-3/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-n-8">🔄</span>
                </div>
                <div className="text-4xl font-bold text-color-3 mb-2">100%</div>
                <div className="text-sm text-n-3">Reusable Components</div>
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
                  <Button className="hidden lg:flex" href="" external>
                    Lets Started Free
                  </Button>
                  <Button className="hidden lg:flex" href="" external white>
                     View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Comparison;
