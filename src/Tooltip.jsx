import React from "react";

class Tooltip extends React.Component {
  state = { activ: true, timeout: {} };

  render() {
    return (
      <>
        <div className="Tooltip-Wrapper">
          {this.props.active && (
            <div className={`Tooltip-Tip ${this.props.direction || "top"}`}>
              {this.props.content}
            </div>
          )}
        </div>
        {this.props.children}
      </>
    );
  }
}

export default Tooltip;
