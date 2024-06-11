# ProgressButton Component
![GitHub Repo stars](https://img.shields.io/github/stars/tomredman/ProgressButton)

Created by [@redman](https://x.com/redman)

If you like this, you'll love [Convex](https://github.com/get-convex)!

## Overview

The `ProgressButton` component is a versatile and customizable button that visually indicates progress through either manual or automatic updates. It's built with React and leverages the XState library to manage its state machine.

This component builds upon the button provided by [shadcn/ui](https://ui.shadcn.com/docs/components/button), making it perfect for use cases where you need to show progress, such as file uploads, form submissions, or any asynchronous operations.

https://github.com/tomredman/ProgressButton/assets/4225378/c3f7a3cd-e2c7-401e-8e51-8ce9985a232c

## Features

- **Manual and Automatic Progress**: Supports both manual progress updates and automatic progress simulation.
- **State Management**: Utilizes XState for robust and scalable state management.
- **Customizable**: Offers customization options for success color, progress type, and duration.
- **User Feedback**: Provides visual feedback for different states: idle, in-progress, success, and error.

## State Machine

The `ProgressButton` component uses an XState state machine to manage its different states and transitions. Here is a description of the state machine:

### State Machine Definition

```typescript
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
        1500: "successFadeOut", // Transition to 'successFadeOut' after 1500 ms
      },
    },
    successFadeOut: {
      after: {
        10: "idle", // Transition to 'idle' after 10 ms
      },
    },
  },
});

export { progressButtonMachine };
```

### States and Transitions

- **idle**: Initial state. The button is waiting for a click.
  - `on: { click: "inProgress" }`: Transitions to the `inProgress` state on a click event.
- **inProgress**: The button is actively showing progress.
  - `on: { setProgress: { actions: assign(({ event }) => { return { progress: event.progress }; }) }}`: Updates the progress based on the `setProgress` event.
  - `on: { complete: "success" }`: Transitions to the `success` state when the progress completes.
- **success**: The button has successfully completed its progress.

  - `after: { 1500: "successFadeOut" }`: Automatically transitions to the `successFadeOut` state after 1500 milliseconds.

- **successFadeOut**: The success state is fading out.
  - `after: { 10: "idle" }`: Automatically transitions back to the `idle` state after 10 milliseconds, ready for a new interaction.

## Installation

To install the `ProgressButton` component, you need to have React, XState, Tailwind and a few other packages set up in your project. If you haven't installed these dependencies, you can do so with the following commands:

```bash
npm install && npm run dev
```

## Usage

Here's a basic example of how to use the `ProgressButton` component:

```jsx
import React from "react";
import ProgressButton from "./ProgressButton";

const MyComponent = () => {
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  const handleComplete = () => {
    console.log("Progress complete");
  };

  const handleError = (error) => {
    console.error("An error occurred:", error);
  };

  return (
    <div>
      <h1>Progress Button Example</h1>
      <ProgressButton
        progressType="automatic"
        totalDuration={5000}
        numberOfProgressSteps={5}
        successColorClass="green-500"
        onClick={handleButtonClick}
        onComplete={handleComplete}
        onError={handleError}
      />
    </div>
  );
};

export default MyComponent;
```

## Props

The `ProgressButton` component accepts the following props:

### Base Props

| Prop                | Type       | Default     | Description                                                                                                                  |
| ------------------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `successColorClass` | `string`   | `undefined` | Tailwind color class for the button's success color. Must be in the format `red-500` with no prefix (e.g., NOT `bg-red-500`) |
| `onClick`           | `function` | `undefined` | Callback function triggered when the button is clicked.                                                                      |
| `onComplete`        | `function` | `undefined` | Callback function triggered when progress completes.                                                                         |
| `onError`           | `function` | `undefined` | Callback function triggered when an error occurs.                                                                            |

### Manual Progress Props

| Prop           | Type     | Default  | Description                          |
| -------------- | -------- | -------- | ------------------------------------ |
| `progressType` | `string` | `manual` | Set to "manual" for manual progress. |
| `progress`     | `number` | `0`      | Current progress value (0 to 100).   |

### Automatic Progress Props

| Prop                    | Type     | Default     | Description                                                             |
| ----------------------- | -------- | ----------- | ----------------------------------------------------------------------- |
| `progressType`          | `string` | `automatic` | Set to "automatic" for automatic progress simulation.                   |
| `totalDuration`         | `number` | `5000`      | Total duration for the automatic progress in milliseconds.              |
| `numberOfProgressSteps` | `number` | `5`         | Number of steps to divide the total duration into for progress updates. |

## Customization

### Success Color

The `successColorClass` prop allows you to customize the success color of the button. You can use any Tailwind CSS color in the format `cyan-500`.

Tailwind only includes colors used in the code in the final build, therefore every color class must exist as a complete string or be listed in the Tailwind config's [safelist](https://tailwindcss.com/docs/content-configuration#safelisting-classes) to be available.

To get around this and let you use any default Tailwind class, there is a script that generates a file that lists every available option. It's found in `scripts/generateTailwindColorNames.cjs` and can be run with `node generateTailwindColorNames.cjs`. This will generate a file `tailwind-bg-classes.js` that is then included in Tailwind config `content` which lists all the classes we might need.

This file is populated with classes like `[&>*>*]:bg-blue-700`: **the magical selector `[&>*>*]` is specific to shadcn/ui progress bar component!** It lets us select the bar itself and color it.

I have not found a way to let you choose arbitrary values like `bg-[#ff0000]` as this string literal – not interpolated – needs to be present in the source somewhere. Listing all possible hex colors would require 16,777,216 string literals. There's got to be a better way, but I haven't found it yet.

```
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
  content: [
    ...
    "./tailwind-bg-classes.js",
  ],
  ...
```

```jsx
// THIS IS GOOD
<ProgressButton successColorClass="green-500" />

// THIS IS BAD
<ProgressButton successColorClass="bg-green-500" />
```

### Manual Progress

For manual progress updates, use the `progress` prop to set the current progress.

**When the progress gets to or exceeds 100, the button will transition to the success state, and then ultimately to the completed/idle state.**

```jsx
<ProgressButton progressType="manual" progress={50} />
```

### Automatic Progress

For automatic progress simulation, you can configure the total duration and the number of progress steps.

The steps and the duration between them are randomized for better UX, but will always add up to the values set here.

```jsx
<ProgressButton
  progressType="automatic" // not stricly necessary
  totalDuration={10000} // 10 seconds
  numberOfProgressSteps={10} // 10 steps
/>
```

## States

The button goes through various states managed by XState:

- `idle`: Initial state, waiting for user interaction.
- `inProgress`: Progress is ongoing.
- `success`: Progress completed successfully.
- `successFadeOut`: Success state fading out.
- `error`: An error occurred during progress.

## Contributing

If you have suggestions for improving the `ProgressButton` component or find any bugs, please open an issue or submit a pull request. We welcome contributions from the community!

## License

This project is licensed under the MIT License.

---

By following the above guidelines, you can effectively utilize the `ProgressButton` component in your project to provide a visual representation of progress, enhancing the user experience.
