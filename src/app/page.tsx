import { Header } from "@/components/Header"; // Import the Header component
import { Footer } from "@/components/Footer"; // Import the Footer component
import { ImageResizer } from "@/components/ImageResizer"; // Import the ImageResizer component

// Hero Section with functional image resizer
const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-gray-900 transition-colors duration-300">
    <div className="animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black dark:text-zinc-50 mb-4 sm:mb-6 transition-colors duration-300">
        Easily resize images online for free.
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl transition-colors duration-300">
        Upload your image (max 10 MB for free users) and transform it in seconds.
      </p>
    </div>
    
    {/* Functional Image Resizer Component */}
    <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl animate-fade-in-up animation-delay-200">
      <ImageResizer />
    </div>
    
    <p className="mt-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 animate-fade-in-up animation-delay-400 transition-colors duration-300">
      Upgrade to Pro for larger files and more features.
    </p>
  </section>
);

// Feature Highlights with responsive design and animations
const FeatureHighlights = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
    {[
      { title: "Perfect Quality", desc: "Maintain high image quality." },
      { title: "Lightning Fast", desc: "Cloud-hosted, quick processing." },
      { title: "Easy To Use", desc: "Simple upload and process workflow." },
      { title: "Works Anywhere", desc: "Browser-based, no installation." },
      { title: "Privacy Guaranteed", desc: "Secure SSL, images deleted within 6 hours." },
      { title: "It's Free", desc: "No cost, no software, no watermarks." }
    ].map((feature, index) => (
      <div 
        key={feature.title}
        className="text-center p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-gray-100 dark:border-gray-700"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
          {feature.desc}
        </p>
      </div>
    ))}
  </section>
);

// How-to Guide with responsive design and animations
const HowToGuide = () => (
  <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-center transition-colors duration-300">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up transition-colors duration-300">
      How it Works
    </h2>
    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-6 lg:gap-12 max-w-4xl mx-auto">
      {[
        { step: "1", title: "Upload Image", desc: "Select or drag & drop your image file." },
        { step: "2", title: "Choose Options", desc: "Enter desired dimensions or settings." },
        { step: "3", title: "Download Result", desc: "Get your processed image instantly." }
      ].map((item, index) => (
        <div 
          key={item.step}
          className="flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 shadow-lg transform hover:scale-110 transition-all duration-300">
            {item.step}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xs transition-colors duration-300">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

// Tool Categories with responsive design and animations
const ToolCategories = () => {
  const toolCategories = [
    {
      title: "Image Tools",
      tools: [
        { name: "Image Resizer", href: "/tools/resize" },
        { name: "Image Compressor", href: "/tools/compress" },
        { name: "Crop Image", href: "/tools/crop" },
        { name: "Flip Image", href: "/tools/flip" },
        { name: "Rotate Image", href: "/tools/rotate" },
        { name: "Image Enlarger", href: "/tools/enlarge" },
        { name: "Color Picker", href: "/tools/color-picker" },
        { name: "Meme Generator", href: "/tools/meme-generator" }
      ]
    },
    {
      title: "Conversion Tools",
      tools: [
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
        { name: "HEIC to JPG", href: "/tools/heic-to-jpg" },
        { name: "SVG Converter", href: "/tools/svg-converter" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" }
      ]
    },
    {
      title: "PDF Tools",
      tools: [
        { name: "Compress PDF", href: "/tools/compress-pdf" },
        { name: "PDF Converter", href: "/tools/pdf-converter" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
        { name: "JPG to PDF", href: "/tools/jpg-to-pdf" },
        { name: "PNG to PDF", href: "/tools/png-to-pdf" },
        { name: "PDF to GIF", href: "/tools/pdf-to-gif" }
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up transition-colors duration-300">
        All Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {toolCategories.map((category, categoryIndex) => (
          <div 
            key={category.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-gray-100 dark:border-gray-700"
            style={{ animationDelay: `${categoryIndex * 150}ms` }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              {category.title}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {category.tools.map((tool, toolIndex) => (
                <li key={tool.name}>
                  <a 
                    href={tool.href} 
                    className="block text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:translate-x-1 hover:font-medium"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main page component that uses all the sections
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlights />
        <HowToGuide />
        <ToolCategories />
      </main>
      <Footer />
    </div>
  );
}
