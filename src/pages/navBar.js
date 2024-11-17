import React from 'react';
const NavBar = () =>{
    return(
        <nav>
        <a href="/"><strong>RateYourBook</strong></a>
        <a href="/">Home</a>
        <a href='/login'>LOGIN/SIGNUP</a>
        <div className="search">
          <button>Search</button>
          <input type="text" />
        </div>

        
      </nav>

    );
}

export default NavBar