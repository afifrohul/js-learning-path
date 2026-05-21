import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";
import NoteInput from "../components/NoteInput";
import React from "react";

function withNavigation(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onAddNoteHandler(note) {
    addNote(note);
    this.props.navigate("/");
  }

  render() {
    return (
      <section>
        <NoteInput addNote={this.onAddNoteHandler} />
      </section>
    );
  }
}

export default withNavigation(AddPage);
