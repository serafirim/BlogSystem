import './App.css'
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import apiClient from './http-common'

import {ToastContainer, Zoom, Slide, Bounce, Flip} from 'react-toastify'

// #region --------------[ Import Components ]--------------
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import HomeOnePage from './pages/HomeOnePage'
import Login from './pages/Login'
import NewStory from './pages/NewStory'
//import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'
import PrivateRoute from './pages/PrivateRoute'
import Register from './pages/Register'
import StoryDetail from './pages/StoryDetail'
import StoryList from './pages/StoryList'
// #endregion

function transitionAnimation () {
    const list = [Zoom, Slide, Bounce, Flip]
    return list[Math.floor(Math.random() * list.length)]
}

function transitionPosition () {
    const list = ['top-right', 'top-center', 'top-left']
    return list[Math.floor(Math.random() * list.length)]
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomeOnePage />} />
                    <Route path="/old" element={<Home />} />

                    <Route path="/dashboard" element={<PrivateRoute />} >
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/profile" element={<PrivateRoute />} >
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/stories" element={<PrivateRoute />} >
                        <Route path="/stories" element={<StoryList />} />
                    </Route>

                    <Route path="/story/:id" element={<PrivateRoute />} >
                        <Route path="/story/:id" element={<StoryDetail />} />
                    </Route>

                    <Route path="/newstory" element={<PrivateRoute />} >
                        <Route path="/newstory" element={<NewStory />} />
                    </Route>
                </Routes>
            </Router>

            <ToastContainer
                position={transitionPosition()} autoClose={2000}
                hideProgressBar={false} newestOnTop closeOnClick
                rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
                transition={transitionAnimation()}
            />
        </div>
    )
}

export default App;
