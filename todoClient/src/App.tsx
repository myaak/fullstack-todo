import AppWrapper from "./components/AppWrapper/AppWrapper.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
