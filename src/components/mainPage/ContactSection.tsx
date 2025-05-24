import React from 'react';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
        Get In <span className="text-blue-600">Touch</span>
      </h2>
      <ContactForm />
    </div>
  </section>
);

export default ContactSection;
