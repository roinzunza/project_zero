import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBolt } from '@fortawesome/free-solid-svg-icons';

// Define your theme
const lightTheme = {
  background: '#ffffff',
  text: '#262626',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
};

const BoltIcon = styled(FontAwesomeIcon)`
  font-size: 3rem; // Adjust the size of the icon as needed
  margin-bottom: 1rem; // Add space between the icon and the title
`;

// Create styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100vh; /* Set height to viewport height */
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  position: relative; /* Required for absolute positioning */
  width: 300px; /* Set a fixed width */
  margin: 0 auto; /* Center horizontally */
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1.2rem;
  resize: vertical;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  max-width: 100%;
  max-height: 200px; /* Limit the height */
`;

const CharacterCounter = styled.div`
  position: relative;
  bottom: 0;
  right: 0;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  border-top-left-radius: 5px;
`;

const Button = styled.button`
  padding: 0.7rem 2rem;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === darkTheme ? '#313436' : '#313436')};
  }
`;

const FragmentList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`;

const FragmentItem = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

const ThemeToggleButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-right: 1rem; /* Adjust spacing between button and character counter */
`;

const Fragment = () => {
  const [fragments, setFragments] = useState([]);
  const [newFragment, setNewFragment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleNewFragment = () => {
    if (newFragment.trim() !== '') {
      setFragments([...fragments, newFragment]);
      setNewFragment('');
      setCharacterCount(0); // Reset character count after submitting
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setNewFragment(text);
    setCharacterCount(text.length);
  };

  return (
    <Container>
      <BoltIcon icon={faBolt} />
      <Title>Post a New Fragment</Title>
      <TextArea
        value={newFragment}
        onChange={handleChange}
        placeholder="Fragmented..."
        maxLength={150}
      />
      <ActionContainer>
        <ButtonContainer>
          <Button onClick={handleNewFragment}>Fragment</Button>
        </ButtonContainer>
        <CharacterCounter>{characterCount}/150</CharacterCounter>
      </ActionContainer>
      <FragmentList>
      {[...fragments].reverse().map((fragment, index) => (
        <FragmentItem key={index}>{fragment}</FragmentItem>
      ))}
    </FragmentList>
    </Container>
  );
};

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === lightTheme ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </ThemeToggleButton>
        <Fragment />
      </div>
    </ThemeProvider>
  );
};

export default App;
