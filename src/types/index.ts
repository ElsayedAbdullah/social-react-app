export type Action =
  | {
      type: "LOG_IN";
      payload: {
        token: string;
        username: string;
        avatar: string;
      };
    }
  | { type: "LOG_OUT" }
  | { type: "FLASH_MESSAGE"; payload: string };
