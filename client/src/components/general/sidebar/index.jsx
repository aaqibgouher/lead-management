import { NavLink } from "react-router-dom";

const SidebarComponent = () => {
  const menus = [
    { id: 1, name: "Dashboard", link: "/" },
    { id: 2, name: "Leads", link: "/leads" },
    { id: 3, name: "POC", link: "/poc" },
    { id: 4, name: "Interactions", link: "/interactions" },
    { id: 5, name: "Orders", link: "/orders" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {menus?.map((menu, index) => (
          <li className="menu-item" key={index}>
            <NavLink
              to={menu.link}
              className={({ isActive }) => (isActive ? "active-link" : "")} // Check if route is active
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
