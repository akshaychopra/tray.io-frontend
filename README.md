# Tray.io Frontend Challenge

## How to run

- Ensure you have npm and node installed
- Ensure port 3000 is available
- cd to the installation directory
  `npm run start`
- Visit http://localhost:3000/

## About the project

- Multistep forms generator using [Material](https://material-ui.com/) / SASS with their CSS-in-JS solution for better theming and reusability
- Registration form config provided as an use case
- `<MultiStepFormComponent/>` is highly configurable with the following config

```
{
  pages: [
    {
      name: "Page1", // name of the page
      fields: [ // list of fields that the page can contain
        {
          label: "field1",
          name: "field1",
          placeholder: "Field 1",
          type: "text", // needs to be supported by HTML <input> element.
          text: "", // additional text to display next to any input elements
          validation: { // validation object that can contain multiple rules
            required: { message: "Please enter Field 1" }, // message to display on error
            regex: {
              regex: ADD_REGEX_HERE,
              message: "Please enter data that matches the regex",
            },
            customValidation: (value) => { // custom validators also supported
                return value ? true: false;
            }
          },
        },
      ],
      submit: "Submit", // text that will be shown on the submit button for the page
      submitData: true, // call the onSubmit function on any page to parse / submit as needed
    },
    {
      name: "Done",
      component: <SuccessComponent />, // pages can load components too
    },
  ],
  onSubmit: (values) => { // forms submit function
    // TODO do something with values
    console.log(values);
  },
};
```

- Website served statically built using NextJS

## Testing

The project includes

- unit tests for util methods
- basic load test for components
- snapshot testing for components
- integration testing for the main `<MultiStepFormComponent>`
- to run `npm run test`

## Improvements

- Store the state of each field on the config itself to maintain backward traceability
- Remove Material to build your own UI Kit to not rely on `<Context/>` and `<ThemeProvider/>` to prevent unnecessary deep re-renders
- Create your own `<Field/>` component instead of using vanilla `<input/>` to allow for `<textareas/>` and better display of checkboxes and radio buttons
- Allow multiple themes
- Better cross browser compatibility
- More testing
