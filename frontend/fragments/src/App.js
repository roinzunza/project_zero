import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

import { ThemeProvider } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBolt } from '@fortawesome/free-solid-svg-icons';

import { 
      Container,
     Title, 
     TextArea, 
     CharacterCounter,
     Button, 
     ThemeToggleButton, 
     BoltIcon, 
     ActionContainer,
     ButtonContainer,
     FragmentList,
     FragmentItem,
     lightTheme,
     darkTheme,

} from './styles/styles';


const Fragment = () => {
  const [fragments, setFragments] = useState([]);
  const [newFragment, setNewFragment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    // Function to fetch fragments from the API
    const fetchFragments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fragments');
        console.log(response.data)
        const { data } = response.data;
        setFragments(data); // Assuming fragmentList is the array of fragments in the response
      } catch (error) {
        console.error('Error fetching fragments:', error);
      }
    };

    // Call the function to fetch fragments
    fetchFragments();
    // Set up interval to fetch fragments periodically
    const intervalId = setInterval(fetchFragments, 1); // Fetch every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure this effect runs only once on component mount


  const handleNewFragment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/new_fragment', {
        content: newFragment, // Use content from the text area as the request body
      });
      console.log('New fragment added:', response.data);
      // Assuming response.data contains the newly created fragment
      setFragments([...fragments, response.data]); // Update fragments state with the new fragment
      setNewFragment('');
      setCharacterCount(0); // Reset character count after submitting
    } catch (error) {
      console.error('Error adding new fragment:', error);
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
        {fragments.map(fragment => (
          <FragmentItem key={fragment.Id}>
            {fragment.Content} {/* Render the Content property */}
          </FragmentItem>
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
