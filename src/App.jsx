
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import GenerateReviewer from './views/GenerateReviewer'
import Subject from './views/Subject'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/generate' element={<GenerateReviewer />} />
          <Route path='/subject/:id' element={<Subject />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
