import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, updateStream } from "../../redux/actions/streamActions";
import StreamForm from "./StreamForm";
import _ from "lodash";
function StreamEdit({ match, stream, getStream, editStream }) {
  useEffect(() => {
    getStream(match.params.id);
  }, []);
  const onSubmit = (formValues) => {
    editStream(match.params.id, formValues);
  };

  return (
    <Fragment>
      {stream ? (
        <div>
          <h3>Edit A Stream</h3>
          <StreamForm
            onSubmit={onSubmit}
            initialValues={_.pick(stream, "title", "description")}
          />
        </div>
      ) : (
        <div>"Loading..."</div>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ streams }, { match }) => ({
  stream: streams[match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  getStream: (id) => dispatch(fetchStream(id)),
  editStream: (id, formValues) => dispatch(updateStream(id, formValues)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
