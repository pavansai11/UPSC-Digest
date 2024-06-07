import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
import App from "./App.js";

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
