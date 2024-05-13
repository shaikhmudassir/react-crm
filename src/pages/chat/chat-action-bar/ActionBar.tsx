// components/ActionBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components

// Define a styled component for the action bar
const ActionBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: #f0f0f0; /* Example background color */
  border-bottom: 1px solid #ccc; /* Example border style */

  a {
    text-decoration: none;
    color: #333; /* Example text color */
    font-weight: bold;

    &:hover {
      color: #555; /* Example hover color */
    }
  }
`;

const ActionBar = () => {
  return (
    <ActionBarContainer>
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
      {/* Add more links/buttons as needed */}
    </ActionBarContainer>
  );
};

export default ActionBar;
