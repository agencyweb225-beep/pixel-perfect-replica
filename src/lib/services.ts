export type Service = {
  slug: string;
  no: string;
  title: string;
  short: string;
  items: string[];
  involves: string;
  receive: string[];
  why: string;
  process: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    no: "01",
    title: "Social Media Management",
    short:
      "We take care of your social presence, from planning and publishing to community engagement and consistent brand communication.",
    items: ["Social media management", "Content calendars", "Page management", "Audience engagement", "Brand consistency"],
    involves:
      "Day-to-day care of your pages: planning what goes out, publishing it on time, and talking with the people who show up.",
    receive: ["A monthly content calendar", "Scheduled and published posts", "Community replies and moderation", "A consistent brand voice across platforms"],
    why: "An active, consistent page tells people your business is alive, listening and worth following.",
    process: ["Audit your current pages", "Agree on tone and posting rhythm", "Plan and publish monthly", "Review and adjust together"],
  },
  {
    slug: "content-creation",
    no: "02",
    title: "Content Creation",
    short:
      "Content that catches attention, communicates your personality, and gives people a reason to remember your brand.",
    items: ["Creative posts", "Reels and short-form videos", "Graphic design", "Visual storytelling", "Campaign creatives"],
    involves: "Ideas, design and production of the posts, reels and visuals that make up your feed.",
    receive: ["Designed posts and carousels", "Short-form video and reels", "Campaign key visuals", "Ready-to-publish files for every platform"],
    why: "People scroll fast. Original, well-made content is what makes them stop.",
    process: ["Creative brief", "Concepts and moodboard", "Production", "Feedback and final delivery"],
  },
  {
    slug: "social-media-strategy",
    no: "03",
    title: "Social Media Strategy",
    short:
      "Every successful brand needs a direction. We develop content and marketing strategies designed around your business goals and audience.",
    items: ["Audience research", "Brand positioning", "Content planning", "Competitor analysis", "Growth strategy"],
    involves: "Research and planning that decides who you talk to, what you say, and where you say it.",
    receive: ["Audience and competitor insights", "Positioning and messaging pillars", "A content plan with clear goals", "A roadmap for the next quarter"],
    why: "Without a direction, content is just noise. Strategy makes every post pull its weight.",
    process: ["Discovery session", "Research and analysis", "Strategy document", "Hand-off or ongoing support"],
  },
  {
    slug: "paid-advertising",
    no: "04",
    title: "Paid Advertising",
    short:
      "Reach the right people with thoughtfully planned campaigns designed to generate awareness, engagement, and potential customers.",
    items: ["Meta advertising", "Campaign planning", "Audience targeting", "Ad creatives", "Campaign monitoring"],
    involves: "Planning, building and watching paid campaigns on Facebook and Instagram.",
    receive: ["Campaign plan and budget split", "Audience targeting setup", "Ad creatives and copy", "Regular performance check-ins"],
    why: "Paid reach puts your best work in front of people who would not have found it on their own.",
    process: ["Set objectives and budget", "Build audiences and creatives", "Launch and monitor", "Learn and refine"],
  },
  {
    slug: "brand-development",
    no: "05",
    title: "Brand Development",
    short: "Build a recognizable identity that makes your business feel consistent, memorable, and different.",
    items: ["Brand identity direction", "Visual consistency", "Creative direction", "Brand communication"],
    involves: "Shaping how your business looks, sounds and feels everywhere people meet it.",
    receive: ["Identity direction and visual rules", "Tone of voice guidance", "Templates for everyday content", "Creative direction for campaigns"],
    why: "A consistent identity makes you easier to recognise, remember and trust.",
    process: ["Brand workshop", "Direction and concepts", "Refinement", "Guidelines and rollout"],
  },
];
