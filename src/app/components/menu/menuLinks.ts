import { INavLinkGroup } from "@fluentui/react";

const menuLinks: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Home",
          url: "/",
          key: "home",
          icon: "Home",
        },
        {
          name: "Tasks",
          url: "/tasks",
          key: "tasks",
          icon: "TaskLogo",
        },
        {
          name: "Transactions",
          url: "/transactions",
          key: "transactions",
          icon: "PreviewLink",
        },
        {
          name: "Funds",
          url: "/funds",
          key: "funds",
          icon: "BullseyeTarget",
        },
        {
          name: "Settings",
          url: "/settings",
          key: "settings",
          icon: "Settings",
        }
      ],
    },
  ];

  export default menuLinks;