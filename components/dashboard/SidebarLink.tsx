"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export default function SidebarLink({
  icon,
  title,
  href,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`sidebar__link ${
        isActive ? "sidebar__link--active" : ""
      }`}
    >
      <span className="sidebar__link--icon">
        {icon}
      </span>

      <span>{title}</span>
    </Link>
  );
}