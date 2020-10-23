import React, { Fragment, useEffect, useRef, useState } from "react";
import { fetchStream } from "../../redux/actions/streamActions";
import { connect } from "react-redux";
import flv from "flv.js";

function StreamShow({ match, stream, getStream }) {
  const videoRef = useRef();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    getStream(match.params.id);
    buildPlayer();
    return () => {
      if (player) player.destroy();
    };
  }, []);

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    console.log(match.params.id);
    const videoPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${match.params.id}.flv`,
    });
    setPlayer(videoPlayer);
    videoPlayer.attachMediaElement(videoRef.current);
    videoPlayer.load();
  };
  return (
    <div>
      {stream ? (
        <Fragment>
          <video ref={videoRef} style={{ width: "100%" }} controls />
          <h1>{stream.title}</h1>
          <h5>{stream.description}</h5>
        </Fragment>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

const mapStateToProps = ({ streams }, { match }) => ({
  stream: streams[match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  getStream: (id) => dispatch(fetchStream(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);
