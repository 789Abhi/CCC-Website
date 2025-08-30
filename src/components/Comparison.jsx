import React from 'react';

// Mock components and assets for demonstration
const Section = ({ children, crosses, className, id }) => (
  <section className={className} id={id}>
    {children}
  </section>
);

const Heading = ({ children, className, title }) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
      {title}
    </h2>
    {children}
  </div>
);

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
      feature: "Advanced Features For Simple Fields",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
    {
      feature: "Metabox Support For Single Post Types",
      ccc: true,
      acf: false,
      metabox: false,
      pods: false,
    },
  ];

  const competitors = [
    { name: 'CCC', letter: 'C', badge: '👑 AI Powered', badgeColor: 'from-purple-500 to-pink-500', bgColor: 'from-purple-500 to-pink-500' },
    { name: 'ACF', letter: 'A', badge: 'Popular', badgeColor: 'from-orange-500 to-red-500', bgColor: 'from-gray-600 to-gray-700' },
    { name: 'MetaBox', letter: 'M', badge: 'Pro', badgeColor: 'from-orange-500 to-red-500', bgColor: 'from-gray-600 to-gray-700' },
    { name: 'Pods', letter: 'P', badge: 'Open Source', badgeColor: 'from-orange-500 to-red-500', bgColor: 'from-gray-600 to-gray-700' },
  ];

  const renderCheckmark = (supported) => {
    if (supported) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
            <span className="text-white text-xs md:text-sm font-bold">✓</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25">
            <span className="text-white text-xs md:text-sm font-bold">✗</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="py-10 lg:py-16 xl:py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" id="comparison">
      <div className="container px-4 sm:px-5 mx-auto">
        <Heading
          className="md:max-w-md lg:max-w-2xl mx-auto"
          title={
            <>
              Why{" "}
              <span className="inline-block relative font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                CCC{" "}
                <div className="absolute top-full left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-y-1"></div>
              </span>{" "}
              Leads
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              the Competition
            </>
          }
        />

        <div className="relative">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Mobile Comparison Cards (visible only on mobile) */}
            <div className="block md:hidden space-y-6">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden shadow-xl backdrop-blur-sm"
                >
                  <div className="p-4 bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-b border-gray-700">
                    <h4 className="text-sm font-semibold text-white">{item.feature}</h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* CCC */}
                      <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-white">C</span>
                          </div>
                          <span className="text-xs text-purple-300 font-semibold">CCC</span>
                          {renderCheckmark(item.ccc)}
                        </div>
                      </div>
                      
                      {/* Other Competitors */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { name: 'ACF', value: item.acf },
                          { name: 'MetaBox', value: item.metabox },
                          { name: 'Pods', value: item.pods }
                        ].map((comp, idx) => (
                          <div key={idx} className="text-center p-2 rounded-lg bg-gray-700/50 border border-gray-600">
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center border border-gray-500">
                                <span className="text-xs font-bold text-gray-300">{comp.name[0]}</span>
                              </div>
                              <span className="text-xs text-gray-400">{comp.name}</span>
                              <div className="scale-75">
                                {renderCheckmark(comp.value)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Comparison Table (hidden on mobile) */}
            <div className="hidden md:block bg-gray-800/50 rounded-3xl border border-gray-700 overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 p-6 lg:p-8 bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-b border-gray-700">
                <div className="text-center">
                  <h4 className="text-lg lg:text-xl font-bold text-white mb-2">Features</h4>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
                </div>
                
                {competitors.map((comp, idx) => (
                  <div key={idx} className="text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${comp.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <span className="text-xl lg:text-2xl font-bold text-white">{comp.letter}</span>
                      </div>
                      <h4 className={`text-sm lg:text-base font-semibold ${idx === 0 ? 'text-purple-300' : 'text-gray-300'}`}>
                        {comp.name}
                      </h4>
                      <div className={`px-2 lg:px-3 py-1 bg-gradient-to-r ${comp.badgeColor}/20 rounded-full border border-current/30`}>
                        <span className={`text-xs font-semibold ${idx === 0 ? 'text-purple-300' : 'text-orange-300'}`}>
                          {comp.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-4 p-4 lg:p-6 transition-all duration-300 hover:bg-gray-700/50 ${
                    index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-sm lg:text-base text-white font-medium">
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

            {/* Bottom Stats - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
              <div className="text-center p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl lg:text-2xl font-bold text-white">⚡</span>
                </div>
                <div className="text-2xl lg:text-4xl font-bold text-purple-400 mb-2">10x</div>
                <div className="text-xs lg:text-sm text-gray-300">Faster Development</div>
              </div>
              
              <div className="text-center p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl lg:text-2xl font-bold text-white">📝</span>
                </div>
                <div className="text-2xl lg:text-4xl font-bold text-pink-400 mb-2">90%</div>
                <div className="text-xs lg:text-sm text-gray-300">Less Code to Write</div>
              </div>
              
              <div className="text-center p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl lg:text-2xl font-bold text-white">🔄</span>
                </div>
                <div className="text-2xl lg:text-4xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-xs lg:text-sm text-gray-300">Reusable Components</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;