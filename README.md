## Knobblr  

A React UI component library with a focus on selectors -- knobs, switches, buttons -- styled to resemble analog control interfaces. The key intent being to facilitate a 'tactile' UX.  

![version status shield](https://img.shields.io/badge/dynamic/json?color=%230000CD&label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsgerpdx%2Fknobblr%2Fmain%2Fpackage.json)  

🧱 currently in dev mode 🧱

---  

### Installation  

`
npm install @sgerpdx/knobblr
`  

---  

### Example Usage  

```jsx
    import React from "react";  
    import {TactileButton} from '@sgerpdx/knobblr';  

    function App() { 
    
      const handleFormLaunch = () => {
        // code to open login form or modal
      };

      return (  
        <>  
          <TactileButton onClick={handleFormLaunch} width="100" fillColor="#0000CD" strokeColor="white" label="Login" />  
        </>  
      );  
    }    
```

---  

### Demo   

- TactileButton demo on [Glitch](https://glitch.com/edit/#!/buttery-truth-papyrus?path=src%2Fcomponents%2FButtonDemo.tsx%3A1%3A0)  

