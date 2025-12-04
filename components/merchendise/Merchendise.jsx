export default function Merchandise() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      title: "Lorem ipsum dolor sit amet | sit consectetur",
      price: "Rs. 1200"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
      title: "Lorem ipsum dolor sit amet | sit consectetur",
      price: "Rs. 1200"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      title: "Lorem ipsum dolor sit amet | sit consectetur",
      price: "Rs. 1200"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
      title: "Lorem ipsum dolor sit amet | sit consectetur",
      price: "Rs. 1200"
    }
  ];

  return (
    <div className="pt-25 bg-[#101820] py-16 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className=" absolute w-40 h-40 rounded-xl bg-linear-to-br from-[#101820] to-[#26323D]"></div>
        <div className="right-20  absolute w-40 h-40 rounded-xl bg-linear-to-br from-[#101820] to-[#26323D]"></div>
        {/* Header */}
        <div className="text-center mb-4 ">
          <p className="text-[#d4af37] text-xs tracking-widest uppercase mb-2">
            OUR STORE
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Merchendise
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed z-10">
            Discover a collection of thoughtfully designed merchandise created to reflect your unique style and personality. Each product blends quality, comfort, and creativity, making it perfect for everyday use or special moments. Whether you're looking for something bold, minimal, or meaningful, our merchandise is crafted to inspire confidence and individuality. Elevate your look and express yourself with items that go beyond the basics—made to last, made to stand out, and made just for you.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a2332] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="bg-gray-200 aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-4 bg-[#16293f]">
                <p className="text-white text-xs mb-2 leading-relaxed">
                  {product.title}
                </p>
                <p className="text-white text-sm font-semibold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}