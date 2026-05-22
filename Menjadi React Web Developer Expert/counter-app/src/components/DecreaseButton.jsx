import React from 'react';

function DecreaseButton({ decrease }) {
  return (
    <button className="decrease" onClick={decrease}>
      <span role="img" aria-label="minus">
        -
      </span>
    </button>
  );
}

export default DecreaseButton;
