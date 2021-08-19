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
          name: "Summary",
          url: "/summary",
          key: "summary",
          icon: "PreviewLink",
        },
        {
          name: "Tasks",
          url: "/tasks",
          key: "tasks",
          icon: "TaskLogo",
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