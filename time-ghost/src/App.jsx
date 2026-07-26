import { useState } from 'react'
import RoadmapTracker from './comp/RoadmapTracker'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrepSheet from './comp/PrepSheet';
 const  App=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoadmapTracker />} />
        <Route path="/prepsheet" element={<PrepSheet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
