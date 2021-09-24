import { Constants } from "../../../utilities/constants";

export const findStatusName = (id: number) => {
  let name = "unknown";
  switch (id) {
    case Constants.Status.Approved:
      name = "Approved";
      break;
    case Constants.Status.Open:
      name = "Open";
      break;
  }

  return name;
};
