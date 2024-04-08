import { NavbarRoutes } from "@/components/Navbar-Routes";
import { MobileSidebar } from "./MobileSidebar";
import { ModeToggle } from "@/components/ToggleMode";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm dark:bg-[#020817]">
      <ModeToggle />
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
