"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props {
  href: string;
  onClick: () => void;
}

const NavLink: React.FC<PropsWithChildren<Props>> = ({
  href,
  onClick,
  children,
}) => {
  const path = usePathname();
  return (
    <Link href={href} onClick={onClick}>
      <span
        className={`
          relative no-underline text-pText font-bold py-2 px-4 rounded-lg
          hover:bg-gradient-to-r hover:from-[#ff8a05] hover:to-[#f9b331]
          hover:bg-clip-text hover:text-transparent hover:text-shadow
          transition-colors duration-300 ease-in-out 
          ${
            path.startsWith(href)
              ? "bg-gradient-to-r from-[#ff8a05] to-[#f9b331] bg-clip-text text-transparent"
              : ""
          }
        `}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavLink;
