import React from 'react';
import styled from 'styled-components'; // Import styled-components

// Define a styled component for the action bar
const ActionBarContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align items from left to right */
  align-items: center;
  height: 50px;
  background-color: #f0f0f0; /* Example background color */
  border-bottom: 1px solid #ccc; /* Example border style */
  padding: 0 225px; /* Add padding of 20px to left and right */

  button {
    position: relative; /* Position relative for absolute positioning of counter */
    border: none;
    background: none;
    cursor: pointer;
    color: #333; /* Example text color */
    font-weight: bold;
    margin-right: 15px; /* Example margin between items */
    overflow: visible; /* Allow overflow for the counter */
  }

  span.counter {
    position: absolute;
    top: -15px; /* Adjust the top position for the counter */
    right: -15px; /* Adjust the right position for the counter */
    color: #000; /* Example counter text color */
    padding: 5px; /* Padding for the counter */
    font-size: 12px; /* Font size of the counter */
    min-width: 20px; /* Minimum width of the counter */
    text-align: center; /* Center align the counter text */
  }

  a:last-child {
    margin-right: 0; /* Remove margin for the last item */
  }
`;

const ActionBar = () => {
  return (
    <ActionBarContainer>
      <button onClick={() => {}}>All</button>
      <button onClick={() => {}}>
        Unread <span className="counter">5</span>
      </button>
      <button onClick={() => {}}>Awaiting Reply <span className="counter">10</span></button>
      {/* Add more links/buttons as needed */}
    </ActionBarContainer>
  );
};

export default ActionBar;
