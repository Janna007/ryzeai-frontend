# ryzeAI Frontend

A modern React application for generating and previewing AI-built UI components in real-time.

## Architecture Overview

The frontend is built with **React**, **Vite**, and **Tailwind CSS**. It serves as an IDE-like interface for interacting with the ryzeAI backend agents. 

Key features:
- **Streaming UI**: Displays agent progress in real-time.
- **Live Preview**: Instantly transpiles and renders generated JSX in the browser.
- **Dark Mode Support**: Seamlessly toggles between themes for both the workbench and generated code.

## Component System Design (Fixed UI)

To ensure the AI generates reliable code, we use a **"Fixed UI"** component system (located in `src/components/ui/fixed`). These are simplified, robust versions of Shadcn/Radix components designed to be:
- **Layout-First**: Primary components like `Stack`, `Grid`, and `Container` handle all positioning.
- **Semantic**: Clear names like `Table`, `Card`, and `Navbar` are easily understood by LLMs.
- **Prop-Strict**: Minimal props required to achieve beautiful results, reducing AI hallucination.

## Live Preview Mechanism

The `PreviewPanel` implements a sophisticated browser-side compilation pipeline:
1. **Sanitization**: Strips imports and markdown artifacts from the AI response.
2. **Babel Transpilation**: Uses `@babel/standalone` to convert JSX into browser-ready JavaScript.
3. **Dynamic Evaluation**: Safely evaluates the code and injects the `FixedUI` component library into the execution context.
4. **Error Boundary**: Wraps the preview to prevent generated code from crashing the entire application.

## Known Limitations

- **Babel Initialization**: The preview might lag for a second on first load while the Babel transpiler initializes.
- **Component Scope**: Only components within the `Fixed UI` library can be used; custom HTML or external libraries are not supported in the generated code.

## Future Improvements

- **Interactive Editing**: Allow users to click on generated components to modify them via chat.
- **Code Highlighting**: Enhanced syntax highlighting in the `CodePanel`.
- **Component Playground**: A dedicated space to browse and test all available `Fixed UI` components.
