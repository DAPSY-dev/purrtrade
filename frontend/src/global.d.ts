import { compose } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }

  interface HTMLElementEventMap {
    beforetoggle: ToggleEvent;
    toggle: ToggleEvent;
  }
}

export {};
