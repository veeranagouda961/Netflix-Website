import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__main">
          Developed by <span className="footer__highlight">Veeranagouda</span> | KodNest ID:{' '}
          <span className="footer__highlight">KODYVB03M</span>
        </p>
        <p className="footer__secondary">© {currentYear} All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

