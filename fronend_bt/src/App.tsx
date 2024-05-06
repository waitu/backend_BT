import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import LayoutClient from './components/Layouts/LayoutWebsite/LayoutClient'
import Home from './components/Home/Home'
import Trade from './components/Trade/ListTrade'
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/home' element={<LayoutClient/>}>
                    <Route index element={<Home />} />
                </Route>
                <Route path='/trade' element={<LayoutClient/>}>
                    <Route index element={<Trade />} />
                </Route>
                 <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </div>
    )
}

export default App
