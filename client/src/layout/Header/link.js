import { PrivatePaths } from "../../routes/path";

export const userLinks = [
  {
    route: PrivatePaths.DASHBOARD,
    name: "Home",
    allowed: ["User"],
  },
  {
    route: PrivatePaths.ABOUT,
    name: "About Us",
    allowed: ["User"],
  },
  {
    route: PrivatePaths.CONTACT,
    name: "Contact",
    allowed: ["User"],
  },
];
