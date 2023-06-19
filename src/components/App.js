import './App.css';
import Video from './videoComponent/Video';
import Photos from './gallerieComponent/Photos';
import EarthCanvas from './GlobeAnimation/EarthCanvas'
import {Routes, Route} from 'react-router-dom';
import Navigation from "./NavigationBar/Navigation";


function App() {
    return (
        <>
            <Navigation/>
            <div className="App" id='appCanvas'>
                <Routes>
                    <Route exact path="/photos" element={<Photos/>}/>
                    <Route path="/video" element={<Video/>}/>
                    <Route path="/globe" element={<EarthCanvas/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;
