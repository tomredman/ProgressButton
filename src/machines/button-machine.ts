import { assign, setup } from "xstate";

const progressButtonMachine = setup({
  types: {
    context: {} as {
      progress: number;
    },
    events: {} as
      | { type: "click" }
      | { type: "complete" }
      | { type: "setProgress"; progress: number },
  },
}).createMachine({
  context: {
    progress: 0,
  },
  id: "progressButton",
  initial: "idle",

  states: {
    idle: {
      on: { click: "inProgress" },
    },
    inProgress: {
      on: {
        setProgress: {
          actions: assign(({ event }) => {
            return {
              progress: event.progress,
            };
          }),
        },
        complete: "success",
      },
    },
    success: {
      after: {
        1500: "successFadeOut", // Transition to 'successFadeOut' after x ms
      },
    },
    successFadeOut: {
      after: {
        10: "idle", // Transition to 'idle' after x ms
      },
    },
  },
});

export { progressButtonMachine };
