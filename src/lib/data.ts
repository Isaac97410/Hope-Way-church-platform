export const CHURCH_INFO = {
  name: "Harvest Faith Chapel",
  location: "Accra, Ghana",
  tagline: "Sowing Seeds of Hope, Harvesting Lives for Christ.",
  pastor: "Rev. Dr. Kofi Asante",
  contact: {
    phone: "+233 24 000 0000",
    email: "welcome@harvestfaithghana.org",
    address: "123 Faith Lane, East Legon, Accra"
  }
};
export const LEADERSHIP = [
  {
    name: "Rev. Dr. Kofi Asante",
    role: "Lead Pastor",
    image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800",
    bio: "A visionary leader with over 20 years of ministry experience in Ghana and across Africa."
  },
  {
    name: "Pastor Mary Asante",
    role: "Co-Pastor & Women's Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    bio: "Dedicated to empowering women and building strong families through the Word of God."
  },
  {
    name: "Elder Samuel Mensah",
    role: "Head of Administration",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    bio: "Ensuring the smooth operation of church activities and community outreach programs."
  }
];
export const MINISTRIES = [
  {
    id: "m1",
    title: "Men of Valor",
    description: "Equipping men to lead with integrity in their homes and society.",
    color: "bg-[#E8A87C]",
    icon: "Users"
  },
  {
    id: "m2",
    title: "Daughters of Zion",
    description: "A sisterhood focused on spiritual growth and mutual support.",
    color: "bg-[#C4D7B2]",
    icon: "Heart"
  },
  {
    id: "m3",
    title: "The Harvest Youth",
    description: "Vibrant community for young people to discover their divine purpose.",
    color: "bg-[#A7D397]",
    icon: "Zap"
  },
  {
    id: "m4",
    title: "Children's Church",
    description: "Nurturing the next generation in a fun, safe, and biblical environment.",
    color: "bg-[#F3D7CA]",
    icon: "Smile"
  },
  {
    id: "m5",
    title: "Worship & Arts",
    description: "Leading the congregation into the presence of God through creative expression.",
    color: "bg-[#D2E9E9]",
    icon: "Music"
  }
];
export const SERVICE_TIMES = [
  {
    day: "Sunday",
    title: "Main Worship Service",
    time: "8:30 AM - 11:30 AM",
    description: "A time of vibrant praise, deep worship, and life-changing word."
  },
  {
    day: "Wednesday",
    title: "Mid-Week Breakthrough",
    time: "6:00 PM - 8:00 PM",
    description: "Intensive prayer and spiritual nourishment."
  },
  {
    day: "Friday",
    title: "Night of Power",
    time: "10:00 PM - 1:00 AM",
    description: "Monthly vigil for divine encounters."
  }
];
export const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Youth Impact Conference",
    date: "2024-06-15",
    time: "10:00 AM",
    location: "Main Auditorium",
    category: "Youth"
  },
  {
    id: "2",
    title: "Community Health Outreach",
    date: "2024-07-02",
    time: "9:00 AM",
    location: "Church Grounds",
    category: "Outreach"
  }
];
export const SERMONS = [
  {
    id: "s1",
    title: "The Power of Persistent Prayer",
    speaker: "Rev. Dr. Kofi Asante",
    date: "2024-05-12",
    category: "Faith",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "s2",
    title: "Living by Divine Grace",
    speaker: "Pastor Mary Asante",
    date: "2024-05-05",
    category: "Grace",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "s3",
    title: "Strengthening the Family Altar",
    speaker: "Rev. Dr. Kofi Asante",
    date: "2024-04-28",
    category: "Family",
    thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];
export const FEATURED_SERMONS = SERMONS.slice(0, 1);