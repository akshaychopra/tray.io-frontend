import SuccessComponent from "../components/SuccessComponent";

const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\D]{8,}$/g;

export const REGISTRATION_FORM = {
  pages: [
    {
      name: "User",
      fields: [
        {
          label: "name",
          name: "name",
          placeholder: "Name",
          type: "text",
          validation: {
            required: { message: "Please enter a name" },
          },
        },
        {
          label: "role",
          name: "role",
          placeholder: "Role",
          type: "text",
        },
        {
          label: "email",
          name: "email",
          placeholder: "Email",
          type: "text",
          validation: {
            regex: {
              regex: VALID_EMAIL_REGEX,
              message: "Please enter valid a email",
            },
          },
        },
        {
          label: "password",
          name: "password",
          placeholder: "Password",
          type: "password",
          validation: {
            regex: {
              regex: VALID_PASSWORD_REGEX,
              message:
                "The password needs to be a mix of at least one uppercase letter, one lowercase letter, one number and be greater than 9 characters",
            },
          },
        },
      ],
      submit: "Submit",
    },
    {
      name: "Privacy",
      fields: [
        {
          label: "updates",
          name: "updates",
          text: "Receive updates about the Tray.io product by email",
          type: "checkbox",
        },
        {
          label: "communication",
          name: "communication",
          text: "Receive communication about other products by Tray.io product by email",
          type: "checkbox",
        },
      ],
      submit: "Submit",
      submitData: true, // flag submit data at any given point
    },
    {
      name: "Done",
      component: <SuccessComponent />,
    },
  ],
  onSubmit: (values) => {
    // TODO do something with values
    console.log(values);
  },
};
