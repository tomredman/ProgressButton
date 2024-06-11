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
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7Kq6wEIFcAXQ9AOwDoBLCAGzAGIBjGyxgawG0AGAXURXSxKhSmX4gAHogCMAZi7kAbAFYAHKoAsWgEyzFcgOwaANCACeibVwW7l1g9I3bpATmUuDAX0+m0mbLB4RCQUsPiMjDj0ErCEAIaEYORxAGaJqAAU0nZcAJT0flg4BMRk5GERONx8SCDIgsKipOJSCIpc2kqqssrSVlwGLqquphYIVtLkBj0qLo4aDu7evhhFgSUh5eGRgQBicRBgAPJE0bEJSanpWXkFqwFBpaHbOPuHJ4TV4vVCImK1rXaqnI3TUGlURmssmkqlGiGG5Fk2m0qhcyMUbi4mm0yzq92KwTKlFIAAV8YEmOgALbIOiJL61H6Nf6gVo9YEaVzaTmKVTudlw8bWci2eyOZxuDzeHwgUjoQ7wRnkx4hb4NP7NAGIAC0ikFuvI1msVg0shcQxcZpcuMKDw2RNoYDVvyaLUQTkFfPIygc3WsvQMmixNuV9ooxLJ-hwzuZmtZlm0iiU4M5qi4Wg6yl5gv65A0HQ8cnaLgWqhDUfWhOelUCMY1boQ4OBKnZJbkfRcevMlmF+fkWNkw0DyjU5bWKrKFR2sDexyIdddWoQ0w05Bh0xLBnaTi7Y3Uhocgek2630gMOOlQA */
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
