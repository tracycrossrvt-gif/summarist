import { FiSearch } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__search">
        <input
          type="search"
          placeholder="Search for books"
          aria-label="Search for books"
        />

        <button type="button" aria-label="Submit search">
          <FiSearch />
        </button>
      </div>
    </header>
  );
}