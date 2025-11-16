import { Header } from "@/components/Header"; // Import the Header component
import { Footer } from "@/components/Footer"; // Import the Footer component
import { ImageResizer } from "@/components/ImageResizer"; // Import the ImageResizer component

// Hero Section with functional image resizer
const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-zinc-50 dark:bg-gray-900">
    <h2 className="text-5xl font-bold leading-tight text-black dark:text-zinc-50 mb-4">
      Easily resize images online for free.
    </h2>
    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
      Upload your image (max 10 MB for free users) and transform it in seconds.
    </p>
    
    {/* Functional Image Resizer Component */}
    <div className="w-full max-w-4xl">
      <ImageResizer />
    </div>
    
    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
      Upgrade to Pro for larger files and more features.
    </p>
  </section>
);

// Placeholder for Feature Highlights
const FeatureHighlights = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Perfect Quality</h3>
      <p className="text-zinc-600 dark:text-zinc-400">Maintain high image quality.</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
      <p className="text-zinc-600 dark:text-zinc-400">Cloud-hosted, quick processing.</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Easy To Use</h3>
      <p className="text-zinc-600 dark:text-zinc-400">Simple upload and process workflow.</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Works Anywhere</h3>
      <p className="text-zinc-600 dark:text-zinc-400">Browser-based, no installation.</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Privacy Guaranteed</h3>
      <p className="text-zinc-600 dark:text-zinc-400">Secure SSL, images deleted within 6 hours.</p>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">It&apos;s Free</h3>
      <p className="text-zinc-600 dark:text-zinc-400">No cost, no software, no watermarks.</p>
    </div>
  </section>
);

// Placeholder for How-to Guide
const HowToGuide = () => (
  <section className="py-16 px-8 bg-white dark:bg-black text-center">
    <h2 className="text-4xl font-bold mb-8">How it Works</h2>
    <div className="flex flex-col md:flex-row justify-around gap-8">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
        <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Select or drag & drop your image file.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
        <h3 className="text-xl font-semibold mb-2">Choose Options</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Enter desired dimensions or settings.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
        <h3 className="text-xl font-semibold mb-2">Download Result</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Get your processed image instantly.</p>
      </div>
    </div>
  </section>
);

// Placeholder for Tool Categories
const ToolCategories = () => (
  <section className="py-16 px-8 bg-zinc-50 dark:bg-gray-900">
    <h2 className="text-4xl font-bold text-center mb-12">All Tools</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Image Tools</h3>
        <ul className="space-y-2">
          <li><a href="/tools/resize" className="text-gray-600 dark:text-gray-400 hover:underline">Image Resizer</a></li>
          <li><a href="/tools/compress" className="text-gray-600 dark:text-gray-400 hover:underline">Image Compressor</a></li>
          <li><a href="/tools/crop" className="text-gray-600 dark:text-gray-400 hover:underline">Crop Image</a></li>
          <li><a href="/tools/flip" className="text-gray-600 dark:text-gray-400 hover:underline">Flip Image</a></li>
          <li><a href="/tools/rotate" className="text-gray-600 dark:text-gray-400 hover:underline">Rotate Image</a></li>
          <li><a href="/tools/enlarge" className="text-gray-600 dark:text-gray-400 hover:underline">Image Enlarger</a></li>
          <li><a href="/tools/color-picker" className="text-gray-600 dark:text-gray-400 hover:underline">Color Picker</a></li>
          <li><a href="/tools/meme-generator" className="text-gray-600 dark:text-gray-400 hover:underline">Meme Generator</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Conversion Tools</h3>
        <ul className="space-y-2">
          <li><a href="/tools/pdf-to-jpg" className="text-gray-600 dark:text-gray-400 hover:underline">PDF to JPG</a></li>
          <li><a href="/tools/heic-to-jpg" className="text-gray-600 dark:text-gray-400 hover:underline">HEIC to JPG</a></li>
          <li><a href="/tools/svg-converter" className="text-gray-600 dark:text-gray-400 hover:underline">SVG Converter</a></li>
          <li><a href="/tools/png-to-jpg" className="text-gray-600 dark:text-gray-400 hover:underline">PNG to JPG</a></li>
          <li><a href="/tools/jpg-to-png" className="text-gray-600 dark:text-gray-400 hover:underline">JPG to PNG</a></li>
          <li><a href="/tools/webp-to-jpg" className="text-gray-600 dark:text-gray-400 hover:underline">WebP to JPG</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">PDF Tools</h3>
        <ul className="space-y-2">
          <li><a href="/tools/compress-pdf" className="text-gray-600 dark:text-gray-400 hover:underline">Compress PDF</a></li>
          <li><a href="/tools/pdf-converter" className="text-gray-600 dark:text-gray-400 hover:underline">PDF Converter</a></li>
          <li><a href="/tools/image-to-pdf" className="text-gray-600 dark:text-gray-400 hover:underline">Image to PDF</a></li>
          <li><a href="/tools/jpg-to-pdf" className="text-gray-600 dark:text-gray-400 hover:underline">JPG to PDF</a></li>
          <li><a href="/tools/png-to-pdf" className="text-gray-600 dark:text-gray-400 hover:underline">PNG to PDF</a></li>
          <li><a href="/tools/pdf-to-gif" className="text-gray-600 dark:text-gray-400 hover:underline">PDF to GIF</a></li>
        </ul>
      </div>
    </div>
  </section>
);

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
