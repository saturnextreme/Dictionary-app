import { useEffect, useState } from "react";
import "./Dictionary.scss"
import DictionaryRequest from "./DictionaryRequest";
import Switch from "./component/Switch/Switch";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const Dictionary = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [getWord, setGetWord] = useState("");
    const [data, getData] = useState("");
    const [isToggle, setIsToggle] = useState(false);
    const [font, setFont] = useState("sans-serif");

    const handleFont = () => {
        document.documentElement.style.setProperty('--font', font);
    }

    const handleToggle = () => {
        setIsToggle(!isToggle);
        if(!isToggle) {
            document.documentElement.style.setProperty('--black', 'white');
            document.documentElement.style.setProperty('--white', 'black');
            document.documentElement.style.setProperty('--dusted-white', 'rgb(59, 59, 59)');
        } else {
            document.documentElement.style.setProperty('--black', 'black');
            document.documentElement.style.setProperty('--white', 'white');
            document.documentElement.style.setProperty('--dusted-white', 'rgb(236, 234, 234)');
        }
    }

    const handlePlay = () => {
        const audio = new Audio(data[0]?.phonetics[1]?.audio);
        audio.play();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await DictionaryRequest(url, getWord);
        if (data != "") {
            setIsAvailable(true);
            getData(data);
        }
        else {
            setIsAvailable(false);
        }
        setGetWord("");
    }

    return (
        <div className="page">
            <div className="frame">
                <div className="header">
                    <div className="fontawesome">
                    <select className="select" value={font} onChange={(e) => handleFont(setFont(e.target.value))}>
                        <option className="text">sans-serif</option>
                        <option className="text">serif</option>
                        <option className="text">monospace</option>
                    </select>
                    </div>
                    <div className="toggle-dark">
                        <Switch isToggled={isToggle} onToggle={handleToggle} />
                    </div>
                </div>
                <div className="dictframe">
                    <form className="form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="enter a word" className="search" value={getWord} onChange={(e)=>setGetWord(e.target.value)}/>
                        <button type="submit" className="pbtn"><img src="./search-icon-png-9966.png" className="btn" /></button>
                    </form>
                    <div className="result margin">
                        <div className="word-meaning">
                            <div className="word">
                                { data[0]?.word || "" }
                            </div>
                            <div className="pronunciation margin">
                                { data[0]?.phonetic || "" }
                            </div>
                        </div>
                        {isAvailable && <div className="voice-div">
                            <button className="voice margin" onClick={handlePlay}>
                                    <img src="./button.png" className="buttons" />
                            </button>
                        </div>}
                    </div>
                    {isAvailable ? <div className="values">
                        {
                            data[0]?.meanings?.map((d) => {
                                return <Meaning key={d.definitions[0].definition} partOfSpeech={d.partOfSpeech} definitions={d.definitions} />
                            })
                        }
                    </div> :
                    <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

const Meaning = (props) => {
    const { partOfSpeech, definitions } = props;
    return (
        <div>
            <div className="pos">
                <h1 className="part-of-speech">  
                    {partOfSpeech}
                </h1>
            </div>
            <div className="definitionclass">
                <p className="mean">Meaning</p>
                <div className="meaning">
                <ul>
                    {
                        definitions.map((def, count=0)=> {
                            count+=1;
                            return (    
                                <>
                                    <li className="define" key={def?.definition}>{def?.definition}</li>
                                    <li className="exp" key={def?.example}>{ def?.example }</li>
                                </>
                            )
                        })
                    }
                </ul>
                </div>
            </div>
        </div>
    )
}


export default Dictionary;