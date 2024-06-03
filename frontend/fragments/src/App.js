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
        const { data } = response.data;
        if (!data) return; // If data is not available, do not update local state
        setFragments(data); // Update fragments state only if data is available
      } catch (error) {
        console.error('Error fetching fragments:', error);
      }
    };

    // Call the function to fetch fragments
    fetchFragments();
      // Set up interval to fetch fragments periodically
      const intervalId = setInterval(fetchFragments, 5000); // Fetch every 5 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure this effect runs only once on component mount


  const handleNewFragment = async () => {
    try {
      // Save the new fragment locally first
      const newFragmentData = {
        Content: newFragment,
        Date: new Date().toISOString(), // Assuming you want to use the current date
        // Other properties can be set here if needed
      };
      setFragments([newFragmentData, ...fragments]); // Prepend the new fragment to the fragments array
      setNewFragment('');
      setCharacterCount(0); // Reset character count after submitting
  
      // Make the request to save the new fragment on the server
      const response = await axios.post('http://localhost:8080/new_fragment', {
        content: newFragment,
      });
      console.log('New fragment added:', response.data);
      // Update the fragment with the ID and other properties returned by the server, if needed
    } catch (error) {
      console.error('Error adding new fragment:', error);
      // If there's an error, you might want to revert the local state change
      // Or handle it based on your application logic
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
  {fragments.slice().reverse().map(fragment => (
    <FragmentItem key={fragment.Id}>
      {fragment.Content}
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
