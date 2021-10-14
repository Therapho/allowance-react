import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useAppState } from "../../app/context/appStateProvider";

const ThemeSelector = () => {
  const { selectedTheme, setSelectedTheme, selectedColor, setSelectedColor } =
    useAppState();

  const themeOptions: IDropdownOption[] = [
    { key: "Dark", text: "Dark" },
    { key: "Light", text: "Light" },
  ];
  const colorOptions: IDropdownOption[] = [
    { key: "Blue", text: "Blue" },
    { key: "Green", text: "Green" },
    { key: "Turquoise", text: "Turquoise" },
  ];
  const handleThemeChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    setSelectedTheme(option!.key as string);
  };
  const handleColorChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    setSelectedColor(option!.key as string);
  };
  return (
    <span>
      <Dropdown
        options={themeOptions}
        defaultSelectedKey={selectedTheme}
        onChange={handleThemeChange}
      />
      <Dropdown
        options={colorOptions}
        defaultSelectedKey={selectedColor}
        onChange={handleColorChange}
      />
    </span>
  );
};

export default ThemeSelector;
