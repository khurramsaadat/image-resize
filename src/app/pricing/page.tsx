import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";

// Pricing plan data based on the attached image
const pricingPlans = [
  {
    name: "Subscription",
    description: "The flexibility of paying month to month and save 30%.",
    price: 3,
    period: "per month",
    features: [
      "Resize images never leave your device",
      "Privacy images never leave your device", 
      "No advertising",
      "E-mail support"
    ],
    buttonText: "Select",
    buttonStyle: "border border-blue-500 text-blue-500 hover:bg-blue-50"
  },
  {
    name: "Simple",
    description: "Enjoy all premium features for a whole month.",
    price: 4,
    period: "1 month", 
    features: [
      "Resize images never leave your device",
      "Privacy images never leave your device",
      "No advertising", 
      "E-mail support"
    ],
    buttonText: "Select",
    buttonStyle: "border border-blue-500 text-blue-500 hover:bg-blue-50"
  },
  {
    name: "Smart", 
    description: "Get all features for 3 months and save 33%.",
    price: 9,
    period: "3 months",
    features: [
      "Resize images never leave your device",
      "Privacy images never leave your device", 
      "No advertising",
      "E-mail support",
      "You save 33%"
    ],
    buttonText: "Select",
    buttonStyle: "border border-blue-500 text-blue-500 hover:bg-blue-50"
  },
  {
    name: "Professional",
    description: "Get 6 months of premium features and save 50%.",
    price: 14,
    period: "6 months", 
    popular: true,
    features: [
      "Resize images never leave your device",
      "Privacy images never leave your device",
      "No advertising",
      "E-mail support", 
      "You save 50%"
    ],
    buttonText: "Select",
    buttonStyle: "bg-blue-500 text-white hover:bg-blue-600"
  }
];

const PricingCard = ({ plan }: { plan: typeof pricingPlans[0] }) => (
  <div className={`relative bg-white rounded-lg border p-6 ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          50% OFF
        </span>
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
        <span className="text-gray-600 ml-1">.{plan.price === 3 ? '99' : plan.price === 4 ? '99' : plan.price === 9 ? '99' : '00'}</span>
      </div>
      <p className="text-sm text-gray-600">{plan.period}</p>
    </div>

    <button className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${plan.buttonStyle} mb-6`}>
      {plan.buttonText}
    </button>

    <div>
      <h4 className="font-semibold text-gray-900 mb-3">Top features</h4>
      <ul className="space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <BackButton />
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resize an Image
          </h1>
          
          {/* Upload Area */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="mb-4">
                <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-gray-600 mb-2">
                Drop your images here or <span className="text-blue-500 underline">browse</span>
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Select Image
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Flexible plans just for you
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don&apos;t see a plan that fits you? <a href="/contact" className="text-blue-500 hover:underline">Contact Us</a>
            </p>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What is an image file size? */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What is an image file size?</h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0">
                <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  Images are composed by several dots called pixels, and each of them has a color, represented as a combination of three basic colors (red, green and blue). To store each of these pixels, a byte (or more) is used, and that means storing all information for an image file that is in a computer or any device will take millions of bytes.
                </p>
                <p className="text-gray-600">
                  When cameras or cellphones says it takes 10 megapixels photos, it means that each photo has 10 million pixels (mega = million). And having 10 million pixels means 10 million bytes (or about 10 MB) if you want to send this photo (or many photos) to a friend by email, it will have to transfer 30 megabytes of data and it will take a lot of upload and a lot for the recipient to download it later.
                </p>
              </div>
            </div>
          </div>

          {/* How can I reduce my image's file size? */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How can I reduce my image&apos;s file size?</h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0">
                <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  One way is compressing the image, which reduces the file without having to resize it. Image quality will suffer as you increase compression and start losing more data.
                </p>
                <p className="text-gray-600 mb-4">
                  Another method is to resize your photo, decreasing the pixels it takes to store the image. Doing so doesn&apos;t reduce image quality, although it may lose small details.
                </p>
                <p className="text-gray-600">
                  Photos from modern cellphones and cameras usually have over 6 million pixels, while screens have only about 1.5 million pixels. This means that you end up seeing a resized version of the image (only use the full image if you print it). So if you resize your image, decreasing its width and height to a half, your image would have about the same number of pixels as your screen, and you probably won&apos;t notice any quality or detail, even looking at your image in full screen mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
