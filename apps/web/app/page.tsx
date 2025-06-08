import LazyImage from "@/components/atoms/lazy-image"
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <LazyImage
            // fill
            width={100}
            height={100}
            src="/logo.svg"
            alt="logo"
            className="w-full"
          />
          {/* <h1 className="text-xl font-bold text-blue-600">PixiePix</h1> */}
        </div>
        <nav className="flex gap-6 text-gray-600 font-medium">
          <a href="#">Home</a>
          <a href="#">Gallery</a>
          <a href="#">About</a>
          <a href="#">Help</a>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          Welcome to PixiePix!
        </h2>
        <p className="text-gray-600">
          Upload your images and let's create something amazing together!
        </p>
      </section>

      {/* Upload + Banner Section */}
      <section className="flex flex-col lg:flex-row items-start gap-6 mb-12">
        {/* Upload Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex-1">
          <h3 className="text-xl font-bold text-pink-600 mb-4">
            Upload Your Image
          </h3>
          <p className="text-gray-600 mb-4">
            Share your drawings, photos or any image you want to work with!
          </p>
          <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer">
            <div className="bg-yellow-400 p-4 rounded-full mb-3">
              <span className="text-white text-2xl">⬆️</span>
            </div>
            <p className="text-blue-600 font-semibold mb-2">Drag & Drop</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
              Choose File
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Supported files: JPG, PNG, GIF (Max size: 10MB)
            </p>
          </div>
          <div className="flex justify-between mt-4 text-blue-500 text-sm">
            <a href="#">My Gallery</a>
            <a href="#">Need Help?</a>
          </div>
        </div>

        {/* Animation Banner */}
        <div className="flex-1 rounded-xl overflow-hidden shadow-md">
          <div className="relative w-full h-[65vh]">
            <LazyImage
              // width={500}
              // height={500}
              fill
              src="/kids-doodle.jpg"
              alt="Animation banner"
              className=" w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 min-h-[20%] text-white bg-gradient-to-t from-gray-800 opacity-100">
              <h4 className="text-xl font-bold">Let's Create Together!</h4>
              <p className="mb-4">
                Upload your image and watch the magic happen in our creative
                canvas!
              </p>
            </div>
          </div>

          {/* <div className="bottom-4 left-4 text-white p-4">
            <div className="relative bg-red-500">
              <h4 className="text-xl font-bold">Let's Create Together!</h4>
              <p className="mb-4">
                Upload your image and watch the magic happen in our creative
                canvas!
              </p>
              <div className="flex gap-4">
                <button className="bg-yellow-400 text-white px-4 py-2 rounded-md">
                  Get Started
                </button>
                <button className="border border-white px-4 py-2 rounded-md text-white">
                  Learn More
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h3 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Fun Features for Kids
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-pink-600 font-bold mb-2">Magic Effects</h4>
            <p className="text-gray-600">
              Add sparkles, stickers, and magical effects to your images!
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-blue-600 font-bold mb-2">Coloring Tools</h4>
            <p className="text-gray-600">
              Color, paint, and draw on your images with fun tools!
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-pink-600 font-bold mb-2">Share Creations</h4>
            <p className="text-gray-600">
              Share your masterpieces with friends and family!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-6 text-sm text-gray-500 text-center py-10">
        <p className="mb-2 font-semibold text-blue-600">PixiePix</p>
        <p className="mb-4">A safe and fun creative platform for kids!</p>
        <div className="flex justify-center gap-4 text-gray-400 mb-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
        </div>
        <p className="text-xs">© 2023 PixiePix. All rights reserved.</p>
      </footer>
    </div>
  )
}
