import Image from "next/image";
import {
  FiBookmark,
  FiEdit3,
  FiHelpCircle,
  FiHome,
  FiLogIn,
  FiSearch,
  FiSettings,
} from "react-icons/fi";

import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <Image
          src="/assets/logo.png"
          alt="Summarist"
          width={160}
          height={48}
          priority
        />
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__nav--top">
          <SidebarLink
            href="/for-you"
            title="For you"
            icon={<FiHome />}
          />

          <SidebarLink
            href="/library"
            title="My Library"
            icon={<FiBookmark />}
          />

          <SidebarLink
            href="/highlights"
            title="Highlights"
            icon={<FiEdit3 />}
          />

          <SidebarLink
            href="/search"
            title="Search"
            icon={<FiSearch />}
          />
        </div>

        <div className="sidebar__nav--bottom">
          <SidebarLink
            href="/settings"
            title="Settings"
            icon={<FiSettings />}
          />

          <SidebarLink
            href="/help"
            title="Help & Support"
            icon={<FiHelpCircle />}
          />

          <SidebarLink
            href="/"
            title="Login"
            icon={<FiLogIn />}
          />
        </div>
      </nav>
    </aside>
  );
}