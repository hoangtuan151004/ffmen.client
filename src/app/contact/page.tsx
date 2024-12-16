import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black">Liên hệ</h1>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black mb-4">
            Thông tin liên hệ
          </h2>
          <p className="text-black">
            <strong>Địa chỉ:</strong> Tòa nhà Ladeco, 266 Đội Cấn, phường Liễu
            Giai, quận Ba Đình, Hà Nội
          </p>
          <p className="text-black">
            <strong>Số điện thoại:</strong> 1900 6750
          </p>
          <p className="text-black">
            <strong>Email:</strong> support@sapo.vn
          </p>

          {/* Contact Form */}
          <form className="mt-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            <textarea
              placeholder="Nội dung"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black h-32"
            ></textarea>
            <button
              type="submit"
              className="p-3 bg-[#FF5959] text-white rounded-md hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-95"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.856825983014!2d105.80691811492866!3d21.039528885992033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab41c5fdf6f1%3A0x1f08f6c00427eeb5!2zMjY2IMSQ4buZIEPhuqduLCBMaeG7h3UgR2lhaSwgQsOgIERpbmgsIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1677401636208!5m2!1svi!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 mt-12 py-6 flex justify-between">
        <div className="text-center">
          <h2 className="text-lg font-bold text-black mb-4">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <form className="flex justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="p-3 w-64 border border-gray-300 rounded-md  text-black"
            />
            <button
              type="submit"
              className="p-3 bg-[#FF5959] text-white rounded-md hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
            >
              Đăng ký
            </button>
          </form>
        </div>

        {/* Footer Links */}

        <div className=" md:grid-cols-4 gap-3 text-center mt-8 flex flex-col">
          <h3 className="font-bold mb-2 text-black">Theo dõi chúng tôi</h3>
          <div className="flex justify-center gap-4 text-[30px] text-[black]">
            <Link href="">
              <FontAwesomeIcon
                className="  hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                icon={faFacebook}
              />
            </Link>
            <Link href="">
              <FontAwesomeIcon
                className="  hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                icon={faInstagram}
              />
            </Link>
            <Link href="">
              <FontAwesomeIcon
                className="  hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                icon={faTwitter}
              />
            </Link>
            <Link href="">
              <FontAwesomeIcon
                className="  hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                icon={faLinkedin}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
