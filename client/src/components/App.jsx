import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

function App() {
  return (
    <div className="ui container">
      <Header />
      <Switch>
        <Route path="/streams/new" exact component={StreamCreate} />
        <Route path="/streams/edit/:id" exact component={StreamEdit} />
        <Route path="/streams/delete/:id" exact component={StreamDelete} />
        <Route path="/streams/list" exact component={StreamList} />
        <Route path="/streams/:id" exact component={StreamShow} />
        <Route path="/" exact component={StreamList} />
      </Switch>
    </div>
  );
}

export default App;
