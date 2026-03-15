
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Subject from './views/Subject'
import FlashCard from './views/Flashcard/FlashCard'
import Notes from './views/Annotation/Notes'
import About from './views/About'
import Settings from './views/SettingsPage/Settings'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/subject/:id' element={<Subject />} />
          <Route path='/subject/:id/flashcard' element={<FlashCard />} />
          <Route path='/subject/:id/notes' element={<Notes />} />
          <Route path='/about' element={<About />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
