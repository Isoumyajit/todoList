import React, { Component } from 'react'
import '../App.css'

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer className="text-center text-lg-left">
          <div className="text-center p-3">
            Developed By<span> </span>
            <a ClassName="Link-profile" href="www.github.com/Isoumyajit">
              Soumyajit Chakraborty
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
