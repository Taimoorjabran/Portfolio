const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Taimoor Jabran</h3>
          <p className="text-sm text-gray-400 w-3/4">
            Software Engineer passionate about building modern web experiences and using new technologies.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
            <li><a href="#experience" className="hover:text-white transition">Experience</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-gray-400 mb-2">Email: taimoorjabran@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com/taimoorjabran" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .5C5.4.5 0 6 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.7.4-1 .6-1.2-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17 6.9 18 7.2 18 7.2c.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.4-2.7 5.4-5.3 5.7.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 6 18.6.5 12 .5z"/></svg>
            </a>
            <a href="https://linkedin.com/in/taimoorjabran" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zm7 0h3.6v1.6h.1c.5-1 1.7-2 3.5-2 3.7 0 4.4 2.5 4.4 5.8v6.6h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.9h-4v-12z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Taimoor Jabran. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
