import React, { useEffect } from "react";
import { fetchStreams } from "../../redux/actions/streamActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function StreamList({ streams, getStreams, currentUserId, loggedIn }) {
  useEffect(() => {
    getStreams();
  }, []);

  const renderButtons = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams?.map((stream) => (
      <div key={stream.id} className="item">
        {renderButtons(stream)}
        <i className="ui middle aligned large icon camera"></i>
        <div className="content">
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  };

  const renderCreate = () => {
    return loggedIn ? (
      <div style={{ textAlign: "right" }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    ) : null;
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
}

const mapStateToProps = ({ streams, auth }) => ({
  streams: Object.values(streams),
  currentUserId: auth.userId,
  loggedIn: auth.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  getStreams: () => dispatch(fetchStreams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
