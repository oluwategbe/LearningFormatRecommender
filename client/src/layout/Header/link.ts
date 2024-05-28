import { PrivatePaths } from "../../routes/path";

export const userLinks = [
  {
    route: PrivatePaths.DASHBOARD,
    name: "Home",
    allowed: ["User"],
  },
  {
    name: "Shop",
    allowed: ["User"],
    children: [
      {
        route: `/test`,
        name: "Test",
        allowed: ["User"],
      },
      {
        route: `/test`,
        name: "Test2",
        allowed: ["User"],
      },
    ],
  },
  {
    name: "Accessories",
    allowed: ["User"],
    children: [
      {
        route: `/test`,
        name: "Test",
        allowed: ["User"],
      },
      {
        route: `/test`,
        name: "Test2",
        allowed: ["User"],
      },
    ],
  }, {
    route: PrivatePaths.UserHotDeals,
    name: "Hot Deals",
    allowed: ["User"],
  },
   {
    route: PrivatePaths.UserContact,
    name: "Contact Us",
    allowed: ["User"],
  },
   {
    route: PrivatePaths.UserBecomeSeller,
    name: "Become a Seller",
    allowed: ["User"],
  }
];
