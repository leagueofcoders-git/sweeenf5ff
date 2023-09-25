import React from 'react'
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { imageURL, songTitle, artist, url } = props;

    return (
        <div>
            <Link to={url} target="_blank">
                <div className="card">
                    <div className='center'>
                        <img className="card-img-top" src={imageURL} alt="Album image" />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{songTitle}</h5>
                        <p className="card-text">{artist}</p>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Card
