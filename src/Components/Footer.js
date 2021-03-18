import React from 'react'

const Footer = () => {

  let date = new Date().toDateString()

    return (
        <div className="navbar bg-dark fixed-bottom" style={{ height: 40+"px"}}>
          <p className="text-left text-white">LUCAS PAGLIETTINI</p>
          <p className="text-right text-white">{date}</p>
        </div>
    )
}

export default Footer
