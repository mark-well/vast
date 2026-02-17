
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import GenerateReviewer from './views/GenerateReviewer'
import Subject from './views/Subject'
import FlashCard from './views/FlashCard'
import Notes from './views/Annotation/Notes'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/generate' element={<GenerateReviewer />} />
          <Route path='/subject/:id' element={<Subject />} />
          <Route path='/subject/:id/flashcard' element={<FlashCard />} />
          <Route path='/subject/:id/notes' element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
