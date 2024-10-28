import NavLinkWrapper from "./components/NavLinkWrapper";
import CreateIcon from "/src/assets/create-icon.svg?react";
import CreateBlueIcon from "/src/assets/create-blue-icon.svg?react";
import StorageIcon from "/src/assets/storage-icon.svg?react";
import StorageBlueIcon from "/src/assets/storage-blue-icon.svg?react";
import VrIcon from "/src/assets/vr-icon.svg?react";
import ProfileIcon from "/src/assets/profile-icon.svg?react";
import ProfileBlueIcon from "/src/assets/profile-blue-icon.svg?react";

const leftSideNavLinkItem = [
  {
    title: "Create",
    link: "/dashboard/create",
    icon: CreateIcon,
    activeIcon: CreateBlueIcon,
  },
  {
    title: "Storage",
    link: "/dashboard/storage",
    icon: StorageIcon,
    activeIcon: StorageBlueIcon,
  },
  {
    title: "VR",
    link: "/dashboard/vr",
    icon: VrIcon,
    activeIcon: VrIcon,
  },
  {
    title: "Profile",
    link: "/dashboard/profile",
    icon: ProfileIcon,
    activeIcon: ProfileBlueIcon,
  },
];

const LeftSideNav = () => {
  return (
    <div className="w-full flex fixed bottom-0 z-10 bg-white sm:static sm:w-fit sm:flex-col">
      {leftSideNavLinkItem.map(({ title, link, icon, activeIcon }) => (
        <NavLinkWrapper
          key={title}
          link={link}
          className="grow px-[23px] py-3 flex gap-1 flex-col justify-center items-center border-t-2 sm:py-4 sm:grow-0 sm:border-r-2 sm:border-t-0 sm:max-w-[100px] sm:basis-[100px]"
          defaultStyle="text-[#5D6E7E]"
          activeStyle="text-primary font-bold border-primary"
          Icon={icon}
          ActiveIcon={activeIcon}
        >
          <span className="text-xs sm:text-base">{title}</span>
        </NavLinkWrapper>
      ))}
    </div>
  );
};

export default LeftSideNav;
