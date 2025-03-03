import { useEffect, useState } from 'react';
import labImage from '../../assets/homepage/lab-image.jpg';
import labImage2 from '../../assets/homepage/lab-image-2.jpg';
import labImage3 from '../../assets/homepage/lab-image-3.jpg';
import { IoMdArrowDown } from 'react-icons/io';

/**
 * HeroSection Component
 *
 * Primary landing section of the CS Lab website featuring:
 * - Auto-rotating image carousel with smooth transitions
 * - Responsive text overlay with main heading and subheading
 * - Location indicator with visual enhancement
 * - Interactive "Explore" button with smooth scroll functionality
 */

const HeroSection = () => {
  /* State Management
   * currentImageIndex: Tracks which image is currently displayed (0-2)
   * images: Array of imported background images for the carousel
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [labImage, labImage2, labImage3];

  /**
   * Image Carousel Effect
   * - Automatically rotates through background images every 4 seconds
   * - Includes cleanup function to prevent memory leaks
   * - Uses transform scale for subtle zoom effect during transition
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Images transition every 4 seconds

    return () => clearInterval(interval);
  }, []);

  /**
   * Smooth Scroll Handler
   * Provides smooth navigation to the bento box section when "Explore" is clicked
   * Uses native smooth scroll behavior for better performance
   */
  const handleScroll = () => {
    const targetSection = document.getElementById('bento-box-section');
    if (targetSection) {
      // Calculate position with offset
      const offset = 75; // Adjust this value to control scroll amount
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative mx-auto flex h-[90vh] w-full items-center justify-center overflow-hidden rounded-3xl text-center shadow-lg">
      {/* Dynamic Image Carousel
       * - Uses absolute positioning for overlay effect
       * - Implements smooth opacity transitions
       * - Includes subtle scale transform for visual interest
       */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transform bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImageIndex === index ? 1 : 0,
            transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)',
          }}
          aria-hidden={currentImageIndex !== index}
        ></div>
      ))}

      {/* Overlay Layer
       * - Adds depth and improves text readability
       * - Semi-transparent indigo creates consistent brand feel
       */}
      <div className="bg-opacity-60 absolute inset-0 bg-indigo-300"></div>

      {/* Content Container
       * - Centered layout with responsive spacing
       * - Maximum width constraint for larger screens
       * - Z-index ensures content stays above background layers
       */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-6 text-stone-700 md:px-12">
        {/* Primary heading - Add text shadow */}
        <h1 className="font-bold text-white drop-shadow-lg sm:text-4xl md:text-7xl">
          Welcome to the Computer Science Lab!
        </h1>

        {/* Subheading - Add subtle text shadow */}
        <p className="mt-4 text-2xl text-stone-700 drop-shadow-md">
          Code. Create. Collaborate.
        </p>

        {/* Location indicator */}
        <div className="mt-8 mr-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/30 px-4 py-2 text-xl shadow-lg backdrop-blur-sm">
          <span role="img" aria-label="location pin">
            📍
          </span>
          <span className="font-medium text-white">Science Hall 260</span>
        </div>

        {/* Navigation button with bouncing arrow animation */}
        <button
          onClick={handleScroll}
          className="mt-8 transform rounded-full bg-rose-400/80 px-6 py-3 text-lg font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-rose-400 hover:shadow-xl"
          aria-label="Scroll to explore more content"
        >
          <p className="flex items-center gap-3 text-white">
            Explore
            <IoMdArrowDown
              size={20}
              className="animate-bounce transition-transform"
            />
          </p>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
