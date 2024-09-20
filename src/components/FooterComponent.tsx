import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function FooterComponent() {
  return (
    <footer className="footer bg-[#fefae0] p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover" href="/">
          <span className="hover:font-bold">Home</span>
        </a>
        <a className="link link-hover" href="/products">
          <span className="hover:font-bold">All Products</span>
        </a>
        <a className="link link-hover" href="/manage">
          <span className="hover:font-bold">Manage Products</span>
        </a>
        <a className="link link-hover" href="/cart">
          <span className="hover:font-bold">My Cart</span>
        </a>
        <a className="link link-hover" href="/about">
          <span className="hover:font-bold">About Us</span>
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover" href="/about">
          About Us
        </a>
        <a className="link link-hover" href="https://github.com/asifbuet047">
          About CEO
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com">
            <FaTwitter className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a href="https://youtube.com">
            <FaYoutube className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a href="https://facebook.com">
            <FaFacebook className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default FooterComponent;
