// import { } from 'react-router-dom'
import React from "react";
import './App.css'
import {Routes, Route} from "react-router-dom";

// importing components
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout.jsx";
import SignUp from "./pages/SignUp.jsx";
import axios from "axios"
import { UserContextProvider } from "./context/userContext.jsx";
import Profile from "./pages/Profile.jsx";
import PlacesPage from "./components/PlacesPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import PlacesForm from "./components/PlacesForm.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import WishlistPage from "./components/WishlistPage.jsx";
// import Page404 from "./pages/Page404.jsx";
import BookedPlace from "./pages/BookedPlace.jsx";
import Contact from "./pages/Contact.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { SearchContextProvider } from "./context/searchContext.jsx";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  
  return (
    <UserContextProvider>
      <SearchContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/account" element={<Profile/>}/>
          <Route path="/account/user" element={<UserProfile/>}/>
          <Route path="/account/places" element={<PlacesPage/>}/>
          <Route path="/account/places/new" element={<PlacesForm/>}/>
          <Route path="/account/places/:id" element={<PlacesForm/>}/>
          <Route path="/place/:id" element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookedPlace/>}/>  
          <Route path="/account/wishlist" element={<WishlistPage/>} />
        </Route>
        <Route path="/contact" element={<Contact/>}/>
        {/* <Route path="*" element={<Page404/>} /> */}

      </Routes>
      
    </SearchContextProvider>
  </UserContextProvider>
    
    
  )
}

export default App
