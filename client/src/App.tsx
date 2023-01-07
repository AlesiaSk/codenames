import React, {useEffect, useState} from 'react';
import './styles/App.scss';
import Card from "./components/Card";
import Word from "./types/Word";

const App = () => {
    const [words, setWords] = useState<Array<string>>([]);

    useEffect(() => {
        const getWords = async () => {
            const data = await fetch('http://localhost:8000/words').then(res => res.json());
            console.log('data', data)
            setWords(data.words);
        }

        getWords();
    }, []);

  return (
    <div className="App">
        {words.length ? words.map((word:string) => (
            <Card word={word} />
        )) : <span>Loading...</span>}
    </div>
  );
}

export default App;
