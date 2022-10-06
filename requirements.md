# Knobblr

A React.js UI control component library with analog-inspired styling.

## User Stories

1. Want: As a user-developer I want to have access to UI components that provide a highly 'tactile,' feedback-rich UX to the end-user.

Feature Task:

- UI components convincingly resemble the static form factor and movement-via-manipulation characteristics of traditional analog control elements found on conventional electronic devices.

Acceptance Tests:

- Ensure that components reliably render in the intended dimensions and colors.
- Ensure that the user-developer can update the properties of the component with clear input parameters.
- Ensure that components respond to user input with adequate visual feedback.

2. Want: As a user-developer I want to be able to combine components from this library to create complex control panels.

Feature Task:

- Individual components can be stacked in any quantity and/or combined with other components from this library also in any quantity, with consistent functionality.

Acceptance Tests:

- Ensure that each component renders and functions as intended regardless of the number of instances of that component in the same UI.
- Ensure that the various components in this library do not adversely affect the rendering or functionality of any of the other components in this library, when such combinations are employed in the same UI.

3. Want: As a user-developer I want to be able to use this component library alongside other UI libraries or any other code that I have written for my application and/or UI.

Feature Task:

- Components in this library function in dependable isolation that neither affects nor is affected adversely by other component libraries or local code.

Acceptance Tests:

- Ensure that component rendering and functionality works in a self-contained manner that permits functional coexistence with surrounding code.

4. Want: As a user-developer I want to be able to use the components in this library with event-handling functions to manage state, user input and/or form submission.

Feature Task:

- Components can be treated the same way as standard html elements such as buttons or inputs with regard to event-handling.

Acceptance Tests:

- Ensure that components work with standard JavaScript events such as:
  - Core MVP functionality: _onClick, onChange, onSubmit_
  - Possibly applicable: _onmousedown, onselect, (event.)target_

5. Want: As an end-user I want to be able to use applications that incorporate this component library in any web or mobile browser.

Feature Task:

- Components render in standard web and mobile browsers and are usable regardless of screen size or whether navigation is via mouse or touch.

Acceptance Tests:

- Ensure that the code written for this library is compatible with the following browsers in web and/or mobile as applicable:
  - Chrome, Firefox, Edge, Safari, Brave, Opera, Vivaldi
  - Internet Explorer (if still applicable)
  - Focus is on standard desktop computers, tablets and/or smartphone devices, i.e. not including specialized devices such as e-readers, etc.

---

### Data-Flow:

### UI Wireframe:

---

# Software Requirements

## Vision:

To create an easily-usable UI library that allows developers to employ retro-analog-styled control components such as buttons, knobs and switches, in React-based web and mobile applications.

### Pain Points Addressed:

The typical UX for interacting with technology, be it for communication, data-retrieval or other purposes, has become increasingly 2-dimensional as screen-based control panels have become the standard. Consequently, many of us spend a significant amount of our time interfacing (primarily) with flat surfaces.

### Why?

It is my belief that a sense of physical interaction is a healthy thing, and however modest the potential scope of this project may be with regard to that, I wish to introduce an element of 'tactile' 3-dimensionality back into the palette available to developers.

## Scope

`> IN:`  
`< OUT:`

### MVP:

This library is easily installable via NPM and includes the following two base components in reliable, test-driven, accessibility-conscious form:

- **TactileButton**: Modeled on a conventional silicon-rubber remote control button.
- **RotaryKnob**: Modeled on a potentiometer-based turnable knob that allows selection among/along a range of incremental settings for a give parameter.

### Stretch Goals:

## Non-Functional Reqs (req/plan to meet):

## Data Flow:
