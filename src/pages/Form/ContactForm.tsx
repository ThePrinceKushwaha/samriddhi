import Breadcrumb from '../../components/Breadcrumb';

import {useState} from 'react';

const ContactForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your Gmail SMTP credentials (not recommended for production)
    const smtpCredentials = {
      username: 'lms.elabx@gmail.com',
      password: 'aheypbrwnyuywbcy',
    };

    const emailData = {
      to: 'aprincekushwaha@gmail.com', // Admin's email
      subject,
      body: message,
    };

    const formData = new FormData();
    formData.append('from_name', smtpCredentials.username);
    formData.append('user_password', smtpCredentials.password);
    formData.append('to_email', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('message', emailData.body);

    fetch('https://smtpjs.com/v3/smtpjs.aspx', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Email sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };
  return (
    <>
      <Breadcrumb pageName="ContactForm" />
      <div className="grid grid-cols- gap-0 sm:grid-cols-2">
        <div className="flex flex-col gap-0">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Message
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

   
      </div>
    </>
  );
};

export default ContactForm;
