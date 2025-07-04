import HeroSection from "@/components/Client/Home/HeroSection";
import Banner from "@/components/Client/Home/Banner";
import ListProduct from "../../components/Client/Home/ListProduct";

export const metadata = {
  title: "Trang chủ",
  description: "Khám phá sản phẩm, ưu đãi mới nhất và những xu hướng hot nhất hôm nay.",
};

export const Product = [
  {
    _id: "1",
    name: "Classic Sweat Pants",
    price: 100.0,
    discountPrice: 90.0,
    imgs: [
      { url: "/image/qIGwZoe.png" },
      { url: "/image/qIGwZoe.png" }
    ],
    hot: true,
    category: {
      _id: "cat1",
      name: "Sweat Pants",
      description: "Category for sweat pants"
    }
  },
  {
    _id: "2",
    name: "Summer Shorts",
    price: 60.0,
    discountPrice: 50.0,
    imgs: [
      { url: "/image/short1.png" },
      { url: "/image/short2.png" }
    ],
    hot: false,
    category: {
      _id: "cat2",
      name: "Short",
      description: "Category for shorts"
    }
  },
  {
    _id: "3",
    name: "Denim Pants",
    price: 120.0,
    discountPrice: 110.0,
    imgs: [
      { url: "/image/denim1.png" },
      { url: "/image/denim2.png" }
    ],
    hot: true,
    category: {
      _id: "cat1",
      name: "Pants",
      description: "Category for pants"
    }
  },
  {
    _id: "4",
    name: "Jogger Sweat Pants",
    price: 95.0,
    discountPrice: 85.0,
    imgs: [
      { url: "/image/jogger1.png" },
      { url: "/image/jogger2.png" }
    ],
    hot: false,
    category: {
      _id: "cat1",
      name: "Sweat Pants",
      description: "Category for sweat pants"
    }
  },
  {
    _id: "5",
    name: "Cargo Shorts",
    price: 70.0,
    discountPrice: 65.0,
    imgs: [
      { url: "/image/cargo1.png" },
      { url: "/image/cargo2.png" }
    ],
    hot: true,
    category: {
      _id: "cat2",
      name: "Short",
      description: "Category for shorts"
    }
  },
  {
    _id: "6",
    name: "Slim Fit Pants",
    price: 130.0,
    discountPrice: 120.0,
    imgs: [
      { url: "/image/slim1.png" },
      { url: "/image/slim2.png" }
    ],
    hot: false,
    category: {
      _id: "cat1",
      name: "Pants",
      description: "Category for pants"
    }
  },
  {
    _id: "7",
    name: "Basic Shorts",
    price: 55.0,
    discountPrice: 45.0,
    imgs: [
      { url: "/image/basicshort1.png" },
      { url: "/image/basicshort2.png" }
    ],
    hot: false,
    category: {
      _id: "cat2",
      name: "Short",
      description: "Category for shorts"
    }
  },
  {
    _id: "8",
    name: "Chino Pants",
    price: 110.0,
    discountPrice: 100.0,
    imgs: [
      { url: "/image/chino1.png" },
      { url: "/image/chino2.png" }
    ],
    hot: true,
    category: {
      _id: "cat1",
      name: "Pants",
      description: "Category for pants"
    }
  },
  {
    _id: "9",
    name: "Athletic Sweat Pants",
    price: 105.0,
    discountPrice: 95.0,
    imgs: [
      { url: "/image/athletic1.png" },
      { url: "/image/athletic2.png" }
    ],
    hot: false,
    category: {
      _id: "cat1",
      name: "Sweat Pants",
      description: "Category for sweat pants"
    }
  },
  {
    _id: "10",
    name: "Linen Shorts",
    price: 80.0,
    discountPrice: 70.0,
    imgs: [
      { url: "/image/linen1.png" },
      { url: "/image/linen2.png" }
    ],
    hot: true,
    category: {
      _id: "cat2",
      name: "Short",
      description: "Category for shorts"
    }
  }
]
export const Categories = [
  {
    _id: "cat1",
    name: "Sweat Pants",
    description: "Comfortable and stylish sweat pants for everyday wear.",
    parentCategory: "cat3",
    image: "/image/sweatpants-category.png"
  },
  {
    _id: "cat2",
    name: "Short",
    description: "Cool and casual shorts for summer and sports.",
    parentCategory: "cat3",
    image: "/image/shorts-category.png"
  },
  {
    _id: "cat3",
    name: "Pants",
    description: "Versatile pants for all occasions.",
    parentCategory: "",
    image: "/image/pants-category.png"
  },
  {
    _id: "cat4",
    name: "T-Shirts",
    description: "Classic and trendy t-shirts for every style.",
    parentCategory: "cat4",
    image: "/image/tshirt-category.png"
  }
]
export default function Home() {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container flex flex-col gap-2">

        {/* ListProduct */}
        <ListProduct
          Categories={Categories}
          Product={Product}
        />
        {/*  */}

        <Banner />
      </div>
    </div>
  );
}
