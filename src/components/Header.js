import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const handleRedirect = () => {
        window.location.reload(false);
    }


    return (
        <header id="navigation" className="fixed-top animated-header">
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark">

                    <Link to='/home' className="navbar-brand" onClick={handleRedirect} >
                        <p style={{ color: "white", maraginBottom: "100px", fontSize: "2em" }}>Swee En Spotify Music Finder</p>
                    </Link>
                </nav>
            </div>
        </header >
    )
}

export default Header