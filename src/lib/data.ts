export const CHURCH_INFO = {
  name: "Hope Way Ministries",
  location: "Accra, Ghana",
  tagline: "Walking in Faith, Living in Hope, Leading in Love.",
  pastor: "Rev. Martha Allottey",
  contact: {
    phone: "+233 24 555 1234",
    email: "welcome@hopewayministries.org",
    address: "Plot 45, Victory Plaza, East Legon, Accra"
  }
};
export const LEADERSHIP = [
  {
    name: "Rev. Martha Allottey",
    role: "General Overseer",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=800",
    bio: "A dynamic teacher of the Word with a passion for spiritual renewal and community development across Ghana."
  },
  {
    name: "Pastor David Mensah",
    role: "Executive Pastor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    bio: "Focused on youth empowerment and organizational excellence within the ministry."
  },
  {
    name: "Elder Grace Boateng",
    role: "Worship Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    bio: "Leading our congregation into divine encounters through heartfelt worship and arts."
  }
];
export const MINISTRIES = [
  {
    id: "m1",
    title: "Hope Men",
    description: "Building men of integrity who lead with vision in their families and community.",
    color: "bg-hope-gold",
    icon: "Users"
  },
  {
    id: "m2",
    title: "Women of Grace",
    description: "Empowering women to walk in their divine purpose and nurture the next generation.",
    color: "bg-[#C4D7B2]",
    icon: "Heart"
  },
  {
    id: "m3",
    title: "Wayfarers Youth",
    description: "A vibrant space for young people to discover Christ and influence their world.",
    color: "bg-[#A7D397]",
    icon: "Zap"
  },
  {
    id: "m4",
    title: "Hope Kids",
    description: "Providing a joyful and safe foundation for children to grow in the knowledge of God.",
    color: "bg-[#F3D7CA]",
    icon: "Smile"
  }
];
export const SERVICE_TIMES = [
  {
    day: "Sunday",
    title: "Prophetic Worship Service",
    time: "9:00 AM - 12:00 PM",
    description: "A transformative encounter with the Holy Spirit through praise and deep teaching."
  },
  {
    day: "Tuesday",
    title: "School of the Word",
    time: "6:30 PM - 8:30 PM",
    description: "In-depth Bible study and theological exploration."
  },
  {
    day: "Friday",
    title: "Solution Night",
    time: "10:00 PM - 1:00 AM",
    description: "All-night prayer and intercession for divine breakthroughs."
  }
];
export const EVENTS_CALENDAR = [
  {
    id: "e1",
    title: "Grace Encounter 2024",
    date: "2024-12-15",
    time: "5:00 PM",
    location: "Hope City Grounds",
    category: "Convention",
    description: "Our annual flagship convention bringing together thousands for spiritual restoration."
  }
];
export const GIVING_INFO = {
  whyWeGive: "Giving is an expression of our gratitude to God. Your support helps Hope Way Ministries impact lives in Accra and beyond.",
  momo: [
    { provider: "MTN Mobile Money", number: "054 321 0000", name: "Hope Way Ministries" },
    { provider: "Vodafone Cash", number: "020 111 2222", name: "Hope Way Ministries" }
  ],
  bank: {
    bankName: "Zenith Bank Ghana",
    branch: "East Legon",
    accountName: "Hope Way Ministries Ghana",
    accountNumber: "9876543210"
  }
};
export const SERMONS = [
  {
    id: "s1",
    title: "The Way of Hope",
    speaker: "Rev. Martha Allottey",
    date: "2024-06-02",
    category: "Foundation",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  }
];
export const FEATURED_SERMONS = SERMONS.slice(0, 1);