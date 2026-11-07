import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Dariia Markovych</p>
          <p>
            Contact us:
            <a href="mailto:dmarkovych.code@gmail.com">dmarkovych.code@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;