import { NavLink } from "react-router-dom";

const NavLinkWrapper = ({
  children,
  link,
  className,
  defaultStyle,
  activeStyle,
  Icon,
  ActiveIcon,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${className} ${isActive ? activeStyle : defaultStyle}`
      }
    >
      {({ isActive }) => {
        return (
          <>
            <span>{(Icon || ActiveIcon) && (isActive ? <ActiveIcon /> : <Icon />)}</span>
            {children}
          </>
        );
      }}
    </NavLink>
  );
};

export default NavLinkWrapper;
