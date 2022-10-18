import React, { Component } from 'react'
import '../App.css'
import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa'

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer className="text-center text-lg-left">
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/soumyajit-chakraborty-914352121/">
              <FaLinkedinIn size={30} />
            </a>

            <a href="https://github.com/Isoumyajit">
              <FaGithubAlt size={30} />
            </a>
          </div>
          <div className="text-center p-3">
            Developed By<span> </span>
            <a className="Link-profile" href="www.github.com/Isoumyajit">
              Soumyajit Chakraborty
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
