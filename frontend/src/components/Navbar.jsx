import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        Luxe Salon
      </div>

      <div className="menu">

        <a href="#home">Home</a>

        <a href="#services">Services</a>

        <a href="#gallery">Gallery</a>

        <a href="#about">About</a>

        <a href="#contact">Contact</a>

      </div>
    </nav>
  );
}

export default Navbar;