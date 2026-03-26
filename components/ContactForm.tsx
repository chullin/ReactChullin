'use client';

import { useState } from 'react';
import { init, send } from '@emailjs/browser';

init('user_dummy');

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setFeedback('請填寫所有欄位');
      return;
    }

    try {
      await send('service_w0xzfrm', 'template_pxnamlp', form);
      setFeedback('發送成功');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setFeedback('發送失敗，請稍後再試');
    }
  };

  return (
    <div className='container py-4'>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input className='form-control mb-2' name='name' placeholder='Name' value={form.name} onChange={handleChange} />
        <input className='form-control mb-2' name='email' placeholder='Email' value={form.email} onChange={handleChange} />
        <input className='form-control mb-2' name='phone' placeholder='Phone' value={form.phone} onChange={handleChange} />
        <textarea className='form-control mb-2' name='message' placeholder='Message' value={form.message} onChange={handleChange} />
        <button className='btn btn-primary'>Send</button>
      </form>
      {feedback && <p className='mt-2'>{feedback}</p>}
    </div>
  );
}
