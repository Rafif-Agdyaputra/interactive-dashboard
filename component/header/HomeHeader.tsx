import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Recipe", path: "/recipe" },
    { label: "Product", path: "/product" },
    { label: "Post", path: "/post" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <>
      <header className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider hover:text-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            Interactive Dashboard
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ label, path }) => (
              <a
                key={path}
                href={path}
                onClick={(e) => {
                  if (router.pathname === path) {
                    e.preventDefault();
                    window.location.href = path;
                  }
                }}
                className={`text-lg font-medium hover:text-blue-300 transition ${
                  router.pathname === path
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden bg-blue-600 px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-lg w-11/12 max-w-sm p-6 space-y-6 shadow-xl text-center">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            {navItems.map(({ label, path }) => (
              <a
                key={path}
                href={path}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (router.pathname === path) {
                    e.preventDefault();
                    window.location.href = path;
                  }
                }}
                className={`block py-2 text-lg font-medium rounded hover:bg-blue-100 ${
                  router.pathname === path
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {label}
              </a>
            ))}

            <button
              className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
