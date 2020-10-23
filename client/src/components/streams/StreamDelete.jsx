import React, { Fragment, useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../redux/actions/streamActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function StreamDelete({ match, stream, getStream, deleteStream }) {
  useEffect(() => {
    getStream(match.params.id);
  }, []);

  const onDelete = () => {
    deleteStream(match.params.id);
  };

  const actions = (
    <Fragment>
      <button className="ui button negative" onClick={onDelete}>
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </Fragment>
  );

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title: ${stream.title}?`;
  };
  return (
    <div>
      <Modal
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
}
const mapStateToProps = ({ streams }, { match }) => ({
  stream: streams[match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  getStream: (id) => dispatch(fetchStream(id)),
  deleteStream: (id) => dispatch(deleteStream(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
