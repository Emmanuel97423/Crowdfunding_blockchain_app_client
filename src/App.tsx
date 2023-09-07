import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PageHome, PageProfile, PageCampaignDetails, PageCreateCampaign } from "./pages";
import {ComponentSidebar, ComponentNavbar } from "./components";
const App:React.FC = () => {
  
  return (
   <Router>
      <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row ">
        <div className="sm:flex hidden mr-10 relative">
          <ComponentSidebar/>
        </div>
      <div className="flex-1 max:sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <ComponentNavbar/>     
        <Routes>
          <Route path="/" element={<PageHome/>}/>
          <Route path="/profile" element={<PageProfile/>}/>
          <Route path="/create-campaign" element={<PageCreateCampaign/>}/>
          <Route path="/campaign-details/:id" element={<PageCampaignDetails/>}/>
        </Routes>
      </div>    
    </div>
  </Router>

    
  )
}

export default App;