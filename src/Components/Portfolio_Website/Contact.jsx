import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import backend_endpoint from '../Constants';
import { toast } from 'react-toastify';

function createMessage(name, email, message) {
  return 'A message received from ' + name + '\nEmail : ' + email + '\nMessage : ' + message;
}

const CONTACT_INFO = [
  { icon: faEnvelope, label: 'Email', value: 'jainaashay123@gmail.com', color: '#818CF8' },
  { icon: faLocationDot, label: 'Location', value: 'Bengaluru, India', color: '#F87171' },
];

const SOCIAL = [
  { icon: faLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aj12345', color: '#0A66C2' },
  { icon: faGithub, label: 'GitHub', href: 'https://github.com/jainAashay', color: '#1a1a1a' },
];

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      await axios.post(backend_endpoint + '/email_sender/email/send', {
        email: 'jainaashay123@gmail.com',
        message: createMessage(name, email, message),
      });
      toast.success("Got your message — I'll get back to you soon!");
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error sending email:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '4rem 1rem', backgroundColor: '#0F172A' }}>
      <Container>
        <h2 className="section-title" style={{ color: '#fff' }}>Get In Touch</h2>
        <Row className="justify-content-center gy-4 align-items-stretch">

          {/* Left: info panel */}
          <Col lg={4} md={5}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              padding: '2rem',
              height: '100%',
              border: '1px solid rgba(99,102,241,0.3)',
            }}>
              <p style={{ color: '#E0E7FF', lineHeight: 1.85, marginBottom: '2rem', fontSize: '1rem' }}>
                Whether it's a collaboration, a new opportunity, or just a hello —
                feel free to drop me a message. I'll get back to you soon.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {CONTACT_INFO.map(({ icon, label, value, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: 'rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <FontAwesomeIcon icon={icon} style={{ color, fontSize: '1.05rem' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#C7D2FE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                      <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                {SOCIAL.map(({ icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: '#fff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                    }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '1.15rem' }} />
                  </a>
                ))}
              </div>
            </div>
          </Col>

          {/* "or" divider — hidden on small screens */}
          <Col xs="auto" className="d-none d-md-flex align-items-center justify-content-center px-2">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'center' }}>
              <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.25)' }} />
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>or</span>
              <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.25)' }} />
            </div>
          </Col>

          {/* Right: form */}
          <Col lg={6} md={6}>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.22)',
            }}>
              {/* Coloured header strip */}
              <div style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                padding: '1.25rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}>
                <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#fff', fontSize: '1rem' }} />
                <h5 style={{ fontWeight: 700, color: '#fff', margin: 0, fontSize: '1.05rem' }}>Send a Message</h5>
              </div>

              {/* Form body */}
              <div style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      value={name}
                      type="text"
                      placeholder="Your Name"
                      className="form-control"
                      style={{ borderColor: '#D1D5DB', borderRadius: 8, padding: '0.72rem 1rem', fontSize: '0.97rem' }}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={email}
                      type="email"
                      placeholder="Your Email"
                      className="form-control"
                      style={{ borderColor: '#D1D5DB', borderRadius: 8, padding: '0.72rem 1rem', fontSize: '0.97rem' }}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      value={message}
                      rows={5}
                      placeholder="Your message..."
                      className="form-control"
                      style={{ borderColor: '#D1D5DB', borderRadius: 8, padding: '0.72rem 1rem', resize: 'vertical', fontSize: '0.97rem' }}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      borderColor: 'transparent',
                      fontWeight: 600,
                      padding: '0.72rem 2rem',
                      borderRadius: 8,
                      width: '100%',
                      fontSize: '0.97rem',
                      boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Contact;
