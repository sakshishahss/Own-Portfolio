import '../App.css'
function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">SS</div>
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#work">Work</a>

            </div>
            <a href="#contact" className="contact-btn">Contact Me</a>
        </nav>
    )
}
export default Navbar