"use client";
import React, { useState } from "react";
// Assuming you have these libraries. If not, run:
// npm install lucide-react framer-motion
// You'll also need Tailwind CSS set up in your project.
import { Star } from "lucide-react";
import { motion } from "motion/react";
type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
  rating: number;
  index: number;
};

/**
 * A reusable, high-quality, and animated testimonial card component.
 */
const TestimonialCard = ({
  quote,
  authorName,
  authorTitle,
  avatarUrl,
  rating,
  index,
}: TestimonialCardProps) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://placehold.co/48x48/E2E8F0/4A5568?text=${authorName.charAt(0)}`;
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Staggered delay based on index
        ease: [0.42, 0, 0.58, 1] as const, // easeOut curve
      },
    },
  };

  return (
    <motion.div
      className="flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-sm"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              fill="currentColor"
            />
          ))}
        </div>
        <blockquote className="mt-6 text-lg leading-relaxed text-gray-600 ">
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>
      </div>
      <footer className="mt-8">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
            src={imgError ? fallbackSrc : avatarUrl}
            alt={`Avatar of ${authorName}`}
            onError={() => setImgError(true)}
          />
          <div className="ml-4">
            <p className="font-semibold text-gray-900 ">{authorName}</p>
            <p className="text-sm text-gray-500 ">{authorTitle}</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
export default TestimonialCard;
