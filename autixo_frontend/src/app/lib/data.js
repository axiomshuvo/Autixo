import { FiMapPin, FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineTag,
} from "react-icons/hi2";
import {
  TbCar,
  TbHeartHandshake,
  TbShieldCheck,
  TbUsers,
} from "react-icons/tb";

/**
 * Central content store for static UI copy, media, and reusable page sections.
 * Keep content here instead of hard-coding it inside components so updates stay
 * simple and consistent across the app.
 *
 * Sections:
 * - Home / landing page content
 * - About page content
 * - Contact page content
 * - FAQ content
 * - Auth layout content
 */

// --- Home / landing page content ---
export const sliderImages = [
  {
    id: 1,
    imageUrl: "/assets/images/slider-image1.jpg",
    title: "Explore the World of Cars",
    description:
      "Discover a wide range of cars for sale, from sleek sports cars to reliable family vehicles. Find your perfect ride today!",
  },
  {
    id: 2,
    imageUrl: "/assets/images/slider-image2.jpg",
    title: "Your Dream Car Awaits",
    description:
      "Browse our extensive collection of cars and find the one that matches your style and needs. Start your journey to owning your dream car now!",
  },
  {
    id: 3,
    imageUrl: "/assets/images/slider-image3.jpg",
    title: "Drive in Style and Comfort",
    description:
      "Experience the thrill of driving with our premium selection of cars. From luxury sedans to powerful SUVs, we have the perfect vehicle for you.",
  },
  {
    id: 4,
    imageUrl: "/assets/images/slider-image4.jpg",
    title: "Unleash Your Driving Passion",
    description:
      "Get behind the wheel of your favorite car and feel the excitement of the open road. Explore our inventory and find the car that ignites your passion for driving.",
  },
];

// --- About page content ---
export const carStats = [
  {
    id: 1,
    title: "Luxury Cars",
    value: "500+",
  },
  {
    id: 2,
    title: "Road Assistance",
    value: "24/7",
  },
  {
    id: 3,
    title: "Service Guarantee",
    value: "100%",
  },
  {
    id: 4,
    title: "Pickup Locations",
    value: "60+",
  },
  {
    id: 5,
    title: "Satisfied Customers",
    value: "800+",
  },
];

export const ourValues = [
  {
    icon: TbShieldCheck,
    title: "Trust & Transparency",
    description:
      "No hidden fees, no surprises — just honest pricing and clear terms on every rental.",
  },
  {
    icon: TbCar,
    title: "Quality Fleet",
    description:
      "Every vehicle is inspected and maintained to the highest standards before it reaches you.",
  },
  {
    icon: TbHeartHandshake,
    title: "Customer First",
    description:
      "Our 24/7 support team is always ready to help, whether you're booking or on the road.",
  },
  {
    icon: TbUsers,
    title: "Community Driven",
    description:
      "Built by renters, for renters — your feedback shapes every feature we ship.",
  },
];

export const whyChooseUsFeatures = [
  {
    title: "Flexible booking",
    description:
      "Reserve in minutes with instant confirmation and simple pickup options.",
  },
  {
    title: "Premium fleet",
    description:
      "Choose from stylish sedans, SUVs, and luxury rides tailored to your trip.",
  },
  {
    title: "Trusted support",
    description:
      "Enjoy responsive assistance from booking to return, every step of the way.",
  },
];

export const howItWorksSteps = [
  {
    title: "1. Browse",
    description: "Explore a curated collection of premium cars in your city.",
  },
  {
    title: "2. Book",
    description:
      "Select your dates, confirm your pickup, and lock in your ride.",
  },
  {
    title: "3. Drive",
    description: "Pick up your car and enjoy the freedom of a seamless trip.",
  },
];

export const aboutPageContent = {
  hero: {
    title: "About Autixo",
    description:
      "We're on a mission to make car rental simple, transparent, and accessible for everyone — whether it's a quick city trip or a cross-country adventure.",
  },
  story: {
    heading: "Our Story",
    paragraphs: [
      "Autixo started with a simple idea: renting a car should be as easy as ordering a coffee. Tired of clunky booking systems, hidden fees, and inconsistent service, we set out to build a platform that puts the renter first.",
      "Since launching, we've grown to serve thousands of customers across 60+ pickup locations, with a fleet of over 500 verified vehicles — from compact city cars to premium SUVs.",
      "Every car on Autixo is vetted, every price is upfront, and every booking is confirmed instantly. No paperwork, no waiting — just pick your car and go.",
    ],
    quote:
      "Autixo turned what used to be a stressful rental process into a five-minute experience. I'll never go back to traditional agencies.",
    quoteAuthor: "Sarah M., loyal customer since 2024",
  },
  values: {
    heading: "What We Stand For",
    description:
      "These principles guide every decision we make — from the cars we list to the support we provide.",
  },
  cta: {
    title: "Ready to hit the road?",
    description:
      "Browse our fleet and find the perfect car for your next journey. Booking takes less than a minute.",
  },
};

// --- Contact page content ---
export const contactItems = [
  {
    icon: FiPhone,
    label: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: HiOutlineMail,
    label: "support@autixo.com",
    href: "mailto:support@autixo.com",
  },
  {
    icon: FiMapPin,
    label: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

export const contactPageContent = {
  hero: {
    title: "Get in Touch",
    description:
      "Have a question, need help with a booking, or want to partner with us? We'd love to hear from you.",
  },
  form: {
    heading: "Send us a message",
    description: "Fill out the form and we'll get back to you within 24 hours.",
  },
  info: {
    heading: "Contact Information",
    description: "Prefer to reach out directly? Here's how to find us.",
  },
  businessHoursTitle: "Business Hours",
  businessHours: [
    "Monday – Friday: 9:00 AM – 8:00 PM",
    "Saturday: 10:00 AM – 6:00 PM",
    "Sunday: Closed",
  ],
  note: "24/7 roadside assistance is always available for active rentals.",
  successMessage: "Thanks for reaching out! Support will be in touch soon.",
};

// --- FAQ content ---
export const faqItems = [
  {
    key: "booking",
    title: "How quickly can I book a car?",
    content:
      "Most bookings are confirmed instantly after you choose your car and complete the checkout. You’ll receive your trip details right away.",
  },
  {
    key: "pickup",
    title: "Can I pick up my car at a different location?",
    content:
      "Yes. You can select a pickup location that fits your trip, and our team will confirm the details before your trip begins.",
  },
  {
    key: "support",
    title: "What if I need help during my rental?",
    content:
      "Our support team is available throughout your rental. If you run into any issues, we’ll help you resolve them quickly.",
  },
];

// --- Auth layout content ---
export const authLayoutContent = {
  brandName: "Autixo",
  heading: "Rent the perfect car for any journey",
  description:
    "Browse, compare, and book with confidence — Autixo makes car rental simple.",
  footerNote: "Drive more, worry less.",
  features: [
    {
      icon: HiOutlineCheckCircle,
      label: "Wide selection of verified vehicles",
    },
    {
      icon: HiOutlineClock,
      label: "Instant booking confirmation",
    },
    {
      icon: HiOutlineShieldCheck,
      label: "24/7 customer support",
    },
    {
      icon: HiOutlineTag,
      label: "Transparent, no-surprise pricing",
    },
  ],
};
