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
    image: "data:image/webp;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltbYGSTW2hsjq5J0DEr4EgSHctX1v2k3Gx8yI4E5W4=",
    bio: "A dynamic teacher of the Word with a passion for spiritual renewal and community development across Ghana."
  },
  {
    name: "Pastor Divine",
    role: "Executive Pastor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    bio: "Focused on youth empowerment and organizational excellence, driving the ministry's mission forward with divine vision."
  },
  {
    name: "Elder Grace Boateng",
    role: "Worship Director",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=800",
    bio: "Leading our congregation into divine encounters through heartfelt worship and professional excellence in the arts."
  }
];
export const MINISTRIES = [
  {
    id: "m1",
    title: "Hope Men",
    description: "Building men of integrity and hope who lead with divine vision in their families and Ghana's community.",
    color: "#E8A87C",
    icon: "Users"
  },
  {
    id: "m2",
    title: "Women of Grace",
    description: "Empowering daughters of the Way to walk in their divine purpose and nurture future generations of believers.",
    color: "#C4D7B2",
    icon: "Heart"
  },
  {
    id: "m3",
    title: "Wayfarers Youth",
    description: "A vibrant sanctuary for young people to discover Christ's path and influence their world with hope.",
    color: "#A7D397",
    icon: "Zap"
  },
  {
    id: "m4",
    title: "Hope Kids",
    description: "Providing a joyful and safe foundation for our little ones to grow in the hope and knowledge of God.",
    color: "#F3D7CA",
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
    description: "In-depth Bible study and theological exploration for spiritual growth."
  },
  {
    day: "Friday",
    title: "Solution Night",
    time: "10:00 PM - 1:00 AM",
    description: "All-night prayer and intercession for divine breakthroughs and spiritual warfare."
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
    description: "Our annual flagship convention bringing together thousands for spiritual restoration and powerful encounters with God."
  },
  {
    id: "e2",
    title: "Youth Impact Summit",
    date: "2024-11-20",
    time: "10:00 AM",
    location: "Main Sanctuary",
    category: "Youth",
    description: "Empowering the next generation to lead with faith and integrity in every sphere of life."
  }
];
export const GIVING_INFO = {
  whyWeGive: "Giving is an expression of our gratitude to God. Your support helps Hope Way Ministries impact lives in Accra and beyond.",
  momo: [
    { provider: "MTN Mobile Money", number: "054 321 0000", name: "Hope Way Ministries" },
    { provider: "Telecel Cash", number: "020 111 2222", name: "Hope Way Ministries" }
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
  },
  {
    id: "s2",
    title: "Kingdom Leadership",
    speaker: "Pastor Divine",
    date: "2024-06-09",
    category: "Leadership",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];
export const FEATURED_SERMONS = SERMONS.slice(0, 1);