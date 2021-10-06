import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useAppState } from "../../app/context/appStateProvider";

const ThemeSelector = () => {
  const { selectedTheme, setSelectedTheme } = useAppState();
  const options: IDropdownOption[] = [
    { key: "Dark", text: "Dark" },
    { key: "Light", text: "Light" },
  ];

  const handleThemeChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    setSelectedTheme(option!.key as string);
  };
  return <Dropdown options={options} defaultSelectedKey={selectedTheme} onChange={handleThemeChange} />;
};

export default ThemeSelector;
