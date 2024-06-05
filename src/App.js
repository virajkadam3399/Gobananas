import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableData from "./Components/Table";
import GetData from "./Components/GetData";



function App() {
  return (
    <>
       
       <BrowserRouter>
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<TableData />} />
          {/* Route for the post details page */}
          <Route path="/posts/:id" element={<GetData/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
