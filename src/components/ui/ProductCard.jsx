function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <img
          src={`${product.image}?auto=format&fit=crop&w=500&q=80`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1">
            {product.description}
          </p>
  
          <div className="mt-3 flex justify-between items-center">
            <span className="font-bold text-black">
              Rp {product.price.toLocaleString()}
            </span>
  
            <button className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  