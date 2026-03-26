'use client';

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const modalBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Mimic the original behavior of showing the modal on load
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      alert('請填寫空白欄位.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('email 格式不正確');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('電話格式不正確');
      return;
    }

    const params = {
      name,
      email,
      phone,
      message,
    };

    const serviceID = 'service_w0xzfrm';
    const templateID = 'template_pxnamlp';
    const publicKey = '4dIM6xqjq-ZzZbfqU';

    emailjs.send(serviceID, templateID, params, publicKey).then(
      (res) => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        console.log(res);
        alert('Your email has been sent successfully!');
      },
      (err) => {
        console.error(err);
        alert('Failed to send email. Please try again later.');
      }
    );
  };

  return (
    <section className="py-5">
      <div className="container px-4">
        <div className="bg-light rounded-4 py-5 px-4 px-md-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3">
              <i className="bi bi-envelope"></i>
            </div>
            <h1 className="fw-bolder">Get in touch</h1>
            <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <form onSubmit={sendMail}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone">Phone number</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Enter your message here..."
                    style={{ height: '10rem' }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        ref={modalBtnRef}
        id="exampleModal1"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                注意事項
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">此頁面寄信功能沒維修，暫時無法使用。</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
