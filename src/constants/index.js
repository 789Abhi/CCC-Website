import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  roadmap5,
  step1image,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";
import { links } from "../config";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "How It Works",
    url: "#roadmap",
  },
  {
    id: "2",
    title: "Comparison",
    url: "#comparison",
  },
  {
    id: "3",
    title: "Pricing",
    url: "#pricing",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const step1 = [
  "Natural language input",
  "No technical knowledge required",
  "AI understands context",
];
export const step2 = [
  "Auto-generated templates",
  "Responsive design",
  "Clean, maintainable code",
];
export const step3 = [
  "Visual customization",
  "Real-time preview",
  "One-click deployment",
];
export const step4 = [
  "Reusable components",
  "Multi-instance support",
  "Theme integration",
  "Import-Export to AnyWhere Globally",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Describe Your Component",
    text: "Simply tell CCC what you need in natural language. 'A testimonial section with image, name, and quote.'",
    points: [
      {
        title: "Natural language input",
      },
      {
        title: "No technical knowledge required",
      },
      {
        title: "AI understands context",
      },
    ],
    imageUrl: step1image,
    colorful: true,
  },
  {
    id: "1",
    title: "AI Generates Everything",
    text: "Our AI creates the complete component structure, fields, PHP templates, and responsive styling.",
    points: [
      {
        title: "Auto-generated templates",
      },
      {
        title: "Responsive design",
      },
      {
        title: "Clean, maintainable code",
      },
    ],
    imageUrl: roadmap2,
    colorful: true,
  },
  {
    id: "2",
    title: "Customize & Publish",
    text: "Fine-tune your component through our intuitive interface and publish instantly to your WordPress site.",
    points: [
      {
        title: "Visual customization",
      },
      {
        title: "Real-time preview",
      },
      {
        title: "One-click deployment",
      },
    ],
    imageUrl: roadmap3,
    colorful: true,
  },
  {
    id: "3",
    title: "Use Anywhere",
    text: "Add your component to any page, customize content, and watch your site come to life with minimal effort.",
    points: [
      {
        title: "Reusable components",
      },
      {
        title: "Multi-instance support",
      },
      {
        title: "Theme integration",
      },
      {
        title: "Import-Export to AnyWhere Globally",
      },
    ],
    imageUrl: roadmap2,
    colorful: true,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Personal",
    description: "Perfect for trying it out",
    price: "39/yr",
    features: [
      "1 Website",
      "50 Components",
      "Basic AI Assistance",
      "Standard Support",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Freelancer",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "125/yr",
    features: [
      "Up to 15 Websites",
      "200 Components",
      "Priority Support",
      "AI-Powered Workflow (unlimited AI usage + automation tools)",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Agency",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: "197/yr",
    features: [
      "Unlimited Websites",
      "Unlimited Components",
      "Premium Support",
      "AI-Powered Workflow (unlimited AI usage + automation tools)",
      "Future Add-ons Included",
    ],
    premium: true,
  },
];

export const benefits = [
  {
    id: "0",
    title: "AI-Assisted Generation",
    text: "Just describe what you need - CCC generates components, fields, templates, and styling automatically.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Lightning Fast",
    text: "Build complete WordPress components in seconds, not hours. Speed up your development workflow dramatically.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Complete Components",
    text: "Not just fields - builds entire sections with data binding, dynamic PHP code, and layout-ready HTML/CSS.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Developer Friendly",
    text: "Clean, maintainable code with customization-ready structure. Integrates seamlessly with any theme.",
    backgroundUrl: "/src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Reusable & Modular",
    text: "Create once, use everywhere. All components are modular and reusable across pages and projects.",
    backgroundUrl: "/src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Design System Ready",
    text: "Generated components follow modern design principles with responsive layouts and beautiful styling.",
    backgroundUrl: "/src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
