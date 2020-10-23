import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../redux/actions/streamActions";
import StreamForm from "./StreamForm";

function StreamCreate(formProps) {
  const onSubmit = (formValues) => {
    formProps.createStream(formValues);
  };

  return (
    <div>
      <h3>Create A Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createStream: (formValues) => dispatch(createStream(formValues)),
});

export default connect(null, mapDispatchToProps)(StreamCreate);
