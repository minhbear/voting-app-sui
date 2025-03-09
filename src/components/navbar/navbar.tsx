"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPage = usePathname();

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md">
      <ul className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex space-x-6">
          <li>
            <Link
              href="/"
              className={`px-4 py-2 rounded text-white ${
                currentPage === "/" ? "bg-blue-400" : "bg-blue-600"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/wallet"
              className={`px-4 py-2 rounded text-white ${
                currentPage === "/wallet" ? "bg-blue-400" : "bg-blue-600"
              }`}
            >
              Wallet
            </Link>
          </li>
        </div>

        <div>
          <ConnectButton />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
