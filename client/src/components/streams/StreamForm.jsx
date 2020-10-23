import React from "react";
import { Field, reduxForm } from "redux-form";

function StreamForm(formProps) {
  const renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderInput = ({ input, label, meta }) => {
    return (
      <div className={`field ${meta.touched && meta.error ? "error" : ""}`}>
        <label>{label}</label>
        <input placeholder="Title" {...input} />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    formProps.onSubmit(formValues);
  };

  return (
    <form className="ui form error" onSubmit={formProps.handleSubmit(onSubmit)}>
      <Field name="title" label="Enter Title" component={renderInput} />
      <Field
        name="description"
        label="Enter Description"
        component={renderInput}
      />
      <button type="submit" className="ui submit button">
        Submit
      </button>
    </form>
  );
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter title";
  }
  if (!formValues.description) {
    errors.description = "You must enter description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
