export interface ITheme {
  theme: {
    mainBgColor: string;
    hoverMainBgColor: string;
    textColor: string;
    hoverTextColor: string;
    mainBorderColor: string;
    defaultWidth: string;
    maxZIndex: string;
  };
}

export const theme: ITheme["theme"] = {
  mainBgColor: "#8c94e5",
  hoverMainBgColor: "#7177bf",
  textColor: "#222",
  hoverTextColor: "#fff",
  mainBorderColor: "#9ba2ff",
  defaultWidth: "800px",
  maxZIndex: "2023"
};
