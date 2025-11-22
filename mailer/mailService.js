const transporter = require("./mail.js");

// --- Refined KP SVG Logo (perfect alignment & proportion) ---
const KP_LOGO = `
<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="none"/>
  <text x="8" y="68" font-family="Arial, sans-serif" font-weight="700" font-size="60" fill="#5757B6">K</text>
  <text x="48" y="68" font-family="Arial, sans-serif" font-weight="700" font-size="60" fill="#5757B6">P</text>
  <circle cx="88" cy="62" r="6" fill="#22C55E"/>
</svg>
`;

// --- Mail to You ---
const sendContactMail = async (data) => {
  const { name, email, subject, message } = data;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // send to yourself
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa; padding: 30px;">
        <table align="center" width="600" cellpadding="0" cellspacing="0"
          style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
          
          <tr>
            <td style="text-align: center; padding: 30px 0 10px 0;">
              ${KP_LOGO}
              <h2 style="margin: 10px 0 0; color: #5757B6; font-size: 20px;">New Portfolio Contact</h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                You’ve received a new contact form submission from your portfolio website.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #5757B6; width: 150px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #5757B6;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #22C55E; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #5757B6;">Subject:</td>
                  <td style="padding: 8px 0; color: #333;">${subject}</td>
                </tr>
              </table>

              <div style="margin-top: 25px; padding: 15px 20px; background-color: #f9fafb;
                border-left: 4px solid #22C55E; border-radius: 6px;">
                <p style="font-weight: bold; color: #333; margin-bottom: 10px;">Message:</p>
                <p style="color: #555; white-space: pre-line;">${message}</p>
              </div>

              <p style="font-size: 13px; color: #999; margin-top: 30px; text-align: center;">
                — This message was sent via 
                <a href="https://kussagrapathak.in" style="color:#5757B6; text-decoration:none;">
                  kussagrapathak.in
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f4f4f4; padding: 15px; text-align: center;
              font-size: 12px; color: #999;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Kussagra Pathak • Portfolio Mail Service</p>
            </td>
          </tr>
        </table>
      </div>
    `,
  });

  return true;
};

// --- Auto-reply to User ---
const sendThankYouMail = async (data) => {
  const { name, email } = data;

  await transporter.sendMail({
    from: `"Kussagra Pathak" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Thank you for reaching out!",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa; padding: 30px;">
        <table align="center" width="600" cellpadding="0" cellspacing="0"
          style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
          
          <tr>
            <td style="text-align: center; padding: 30px 0 10px 0;">
              ${KP_LOGO}
              <h2 style="margin: 10px 0 0; color: #5757B6; font-size: 20px;">Thanks for reaching out!</h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 15px; color: #333; line-height: 1.6;">
                Hi <strong>${name}</strong>,<br><br>
                Thank you for contacting me through my portfolio website. 
                I’ve received your message and will get back to you shortly.<br><br>
                If you have any more questions or updates, feel free to reply to this email anytime.<br><br>
                <span style="color:#5757B6; font-weight:600;">— Kussagra Pathak</span><br>
                <a href="https://kussagrapathak.in" style="color:#22C55E; text-decoration:none;">
                  kussagrapathak.in
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f4f4f4; padding: 15px; text-align: center;
              font-size: 12px; color: #999;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Kussagra Pathak • Portfolio Mail Service</p>
            </td>
          </tr>
        </table>
      </div>
    `,
  });

  return true;
};

module.exports = { sendContactMail, sendThankYouMail };
