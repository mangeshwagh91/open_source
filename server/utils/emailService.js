import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Email configuration missing: EMAIL_USER or EMAIL_PASSWORD not set');
    throw new Error('Email service not configured. Missing EMAIL_USER or EMAIL_PASSWORD');
  }

  console.log('📧 Creating transporter with email:', process.env.EMAIL_USER);
  
  // Using Gmail as example - configure with your email provider
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD.trim() // Remove whitespace from app password
    }
  });
};
// Generic email sending function
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"CodeFest Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: html || text,
      text: text || html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
// Send password reset email
export const sendPasswordResetEmail = async (email, resetCode, studentName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CodeFest Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code - CodeFest',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .code-box {
              background: white;
              color: #333;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #667eea;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              opacity: 0.9;
            }
            .warning {
              background: rgba(255, 255, 255, 0.1);
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔐 Password Reset Request</h1>
            <p>Hello ${studentName},</p>
            <p>We received a request to reset your password for your CodeFest account. Use the code below to reset your password:</p>
            
            <div class="code-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Your Reset Code:</p>
              <div class="code">${resetCode}</div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This code expires in 10 minutes</p>
            </div>
            
            <p>Enter this code on the password reset page to create a new password.</p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This code is valid for 10 minutes only</li>
                <li>Never share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Best regards,<br>CodeFest Team</p>
              <p style="font-size: 12px;">If you have any questions, please contact us at support@codefest.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${studentName},

We received a request to reset your password for your CodeFest account.

Your Password Reset Code: ${resetCode}

This code expires in 10 minutes.

If you didn't request this reset, please ignore this email.

Best regards,
CodeFest Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset email');
  }
};

// Send welcome email after signup (optional)
export const sendWelcomeEmail = async (email, studentName, studentId) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CodeFest Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to CodeFest! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .info-box {
              background: white;
              color: #333;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: white;
              color: #667eea;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Welcome to CodeFest!</h1>
            <p>Hello ${studentName},</p>
            <p>Congratulations! Your CodeFest account has been successfully created.</p>
            
            <div class="info-box">
              <h3 style="margin-top: 0; color: #667eea;">Your Account Details:</h3>
              <p><strong>Student ID:</strong> ${studentId}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <p>You can now start exploring projects, earning certificates, and contributing to open source!</p>
            
            <a href="http://localhost:8080/projects" class="button">Explore Projects</a>
            
            <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Happy Coding! 🚀</p>
            <p>The CodeFest Team</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent successfully to:', email, '| Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email to', email, ':', error.message);
    console.error('Full error:', error);
    // Don't throw error for welcome email - it's not critical
    return { success: false, error: error.message };
  }
};

// Send proposal acceptance email
export const sendProposalAcceptanceEmail = async (email, studentName, projectTitle, facultyFeedback, projectId) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CodeFest Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎉 Your Project Proposal "${projectTitle}" Has Been Accepted!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content-box {
              background: white;
              color: #333;
              padding: 25px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .feedback-box {
              background: #f0fdf4;
              border-left: 4px solid #10b981;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .next-steps {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .step {
              display: flex;
              align-items: start;
              margin: 10px 0;
            }
            .step-number {
              background: white;
              color: #10b981;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              margin-right: 12px;
              flex-shrink: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Congratulations!</h1>
            <p>Hello ${studentName},</p>
            <p>Great news! Your project proposal has been reviewed and <strong>accepted</strong> by our faculty team!</p>
            
            <div class="content-box">
              <h2 style="color: #10b981; margin-top: 0;">Project Details</h2>
              <p><strong>Project Title:</strong> ${projectTitle}</p>
              <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ Accepted</span></p>
              
              ${facultyFeedback ? `
                <div class="feedback-box">
                  <h3 style="margin: 0 0 10px 0; color: #059669;">Faculty Feedback:</h3>
                  <p style="margin: 0;">${facultyFeedback}</p>
                </div>
              ` : ''}
              
              <p style="margin-top: 20px;">Your project is now live on the CodeFest platform and available for students to explore!</p>
              
              <a href="${process.env.CLIENT_URL || 'http://localhost:8080'}/projects" class="button">
                View Your Published Project
              </a>
            </div>
            
            <div class="next-steps">
              <h3>📋 Next Steps</h3>
              <div class="step">
                <div class="step-number">1</div>
                <div>
                  <strong>Monitor Your Project:</strong> Track which students are working on your project
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div>
                  <strong>Mentor Students:</strong> You can provide guidance and review contributions
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div>
                  <strong>Update Progress:</strong> Keep the project repository active with clear guidelines
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div>
                  <strong>Collaborate:</strong> Work with fellow contributors and share knowledge
                </div>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p>Thank you for contributing to the CodeFest community! 🚀</p>
              <p style="font-size: 14px; opacity: 0.9;">
                Best regards,<br>
                CodeFest Faculty Team
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Congratulations ${studentName}!

Your project proposal "${projectTitle}" has been ACCEPTED!

${facultyFeedback ? `Faculty Feedback: ${facultyFeedback}\n` : ''}

Your project is now live on the CodeFest platform!

Next Steps:
1. Monitor which students are working on your project
2. Mentor students and provide guidance
3. Keep the project repository active
4. Collaborate with fellow contributors

View your project: ${process.env.CLIENT_URL || 'http://localhost:8080'}/projects

Thank you for contributing to CodeFest!

Best regards,
CodeFest Faculty Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Acceptance email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending acceptance email:', error);
    throw new Error('Failed to send acceptance email');
  }
};

// Send proposal rejection email
export const sendProposalRejectionEmail = async (email, studentName, projectTitle, rejectionReason) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CodeFest Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Project Proposal Update: "${projectTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content-box {
              background: white;
              color: #333;
              padding: 25px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .reason-box {
              background: #fef2f2;
              border-left: 4px solid #ef4444;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
              color: #333;
            }
            .tips-box {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .tip {
              margin: 12px 0;
              padding-left: 20px;
              position: relative;
            }
            .tip:before {
              content: "💡";
              position: absolute;
              left: 0;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background: white;
              color: #667eea;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📝 Project Proposal Update</h1>
            <p>Hello ${studentName},</p>
            <p>Thank you for submitting your project proposal "<strong>${projectTitle}</strong>" to CodeFest.</p>
            
            <div class="content-box">
              <p>After careful review, we regret to inform you that your proposal has not been accepted at this time.</p>
              
              <div class="reason-box">
                <h3 style="margin: 0 0 10px 0; color: #dc2626;">Faculty Feedback:</h3>
                <p style="margin: 0;">${rejectionReason}</p>
              </div>
              
              <p><strong>Please don't be discouraged!</strong> This decision doesn't reflect on your abilities or potential as a contributor.</p>
            </div>
            
            <div class="tips-box">
              <h3>💡 Tips for Your Next Submission</h3>
              <div class="tip">
                <strong>Clarify the Problem:</strong> Clearly define what problem your project solves
              </div>
              <div class="tip">
                <strong>Detail Your Approach:</strong> Explain your technical implementation strategy
              </div>
              <div class="tip">
                <strong>Set Clear Goals:</strong> Define measurable learning objectives
              </div>
              <div class="tip">
                <strong>Show Uniqueness:</strong> Highlight what makes your project different
              </div>
              <div class="tip">
                <strong>Provide Documentation:</strong> Ensure your GitHub repo has clear README and setup instructions
              </div>
            </div>
            
            <p style="margin-top: 25px;">We encourage you to refine your proposal based on the feedback and submit again. Many successful projects were accepted on their second or third submission!</p>
            
            <a href="${process.env.CLIENT_URL || 'http://localhost:8080'}/propose-project" class="button">
              Submit New Proposal
            </a>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p>Keep innovating and don't give up! We look forward to seeing your improved proposal. 🚀</p>
              <p style="font-size: 14px; opacity: 0.9;">
                Best regards,<br>
                CodeFest Faculty Team
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${studentName},

Thank you for submitting your project proposal "${projectTitle}" to CodeFest.

After careful review, your proposal has not been accepted at this time.

Faculty Feedback:
${rejectionReason}

Please don't be discouraged! We encourage you to refine your proposal based on this feedback.

Tips for Your Next Submission:
• Clarify the problem your project solves
• Detail your technical approach
• Set clear, measurable goals
• Show what makes your project unique
• Provide comprehensive documentation

Many successful projects were accepted after revision. We look forward to your improved proposal!

Submit new proposal: ${process.env.CLIENT_URL || 'http://localhost:8080'}/propose-project

Best regards,
CodeFest Faculty Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Rejection email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending rejection email:', error);
    throw new Error('Failed to send rejection email');
  }
};

// Send assignment notification email to student
export const sendAssignmentNotificationEmail = async (email, studentName, projectTitle, projectLink, projectDescription) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CampusForge Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎯 Project Assigned: ${projectTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content-box {
              background: white;
              color: #333;
              padding: 25px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .project-details {
              background: #f0f9ff;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .info-box {
              background: rgba(255, 255, 255, 0.1);
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎯 New Project Assigned!</h1>
            <p>Hello ${studentName},</p>
            <p>Exciting news! A teacher has assigned you to a new project on CampusForge.</p>
            
            <div class="content-box">
              <h2 style="color: #3b82f6; margin-top: 0;">Project Assignment Details</h2>
              
              <div class="project-details">
                <h3 style="margin: 0 0 10px 0; color: #1d4ed8;">📌 ${projectTitle}</h3>
                <p style="margin: 0;">${projectDescription}</p>
              </div>
              
              <p style="margin-top: 20px;">Click the button below to view your project and get started:</p>
              
              <a href="${projectLink}" class="button">
                View Project Assignment
              </a>
            </div>
            
            <div class="info-box">
              <p><strong>📋 What's Next?</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Review the project requirements and guidelines</li>
                <li>Set up your development environment</li>
                <li>Start contributing and learning!</li>
                <li>Connect with mentors and team members</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p>If you're not logged in, the link will take you to the login page first, then to your project.</p>
              <p style="font-size: 14px; opacity: 0.9;">
                Best regards,<br>
                CampusForge Team
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${studentName},

A teacher has assigned you to a new project: ${projectTitle}

Project Description:
${projectDescription}

View your assignment here:
${projectLink}

If you're not logged in, you'll be redirected to login first.

Next steps:
1. Review the project requirements
2. Set up your development environment
3. Start contributing
4. Connect with mentors

Best regards,
CampusForge Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Assignment notification email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending assignment email:', error);
    throw new Error('Failed to send assignment email');
  }
};

// Send proposal notification email to mentors when student proposes project
export const sendProposalNotificationToMentors = async (mentorEmails, studentName, projectTitle, projectDescription, proposalLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CampusForge Team" <${process.env.EMAIL_USER}>`,
      to: mentorEmails.join(', '),
      subject: `📢 New Project Proposal: ${projectTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content-box {
              background: white;
              color: #333;
              padding: 25px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .proposal-details {
              background: #fffbeb;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .action-box {
              background: rgba(255, 255, 255, 0.1);
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📢 New Project Proposal</h1>
            <p>Hello,</p>
            <p>A student has submitted a new project proposal on CampusForge that requires your review.</p>
            
            <div class="content-box">
              <h2 style="color: #d97706; margin-top: 0;">Proposal Details</h2>
              
              <div class="proposal-details">
                <h3 style="margin: 0 0 10px 0; color: #92400e;">📌 ${projectTitle}</h3>
                <p style="margin: 0;"><strong>Proposed by:</strong> ${studentName}</p>
                <p style="margin: 8px 0 0 0;">${projectDescription}</p>
              </div>
              
              <p style="margin-top: 20px;">Please review the proposal and provide your feedback:</p>
              
              <a href="${proposalLink}" class="button">
                Review Proposal
              </a>
            </div>
            
            <div class="action-box">
              <p><strong>✅ Your Role as Mentor:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Review the proposal quality and feasibility</li>
                <li>Provide constructive feedback</li>
                <li>Accept or reject the proposal</li>
                <li>Guide students through the development process</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p style="font-size: 14px; opacity: 0.9;">
                Best regards,<br>
                CampusForge Notification System
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello,

A new project proposal has been submitted on CampusForge for your review.

Proposal Details:
Title: ${projectTitle}
Proposed by: ${studentName}

Description:
${projectDescription}

Review the proposal here:
${proposalLink}

Your responsibilities as a mentor:
• Review proposal quality
• Provide constructive feedback
• Accept or reject the proposal
• Guide students through development

Best regards,
CampusForge Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Proposal notification email sent to mentors:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending proposal notification to mentors:', error);
    throw new Error('Failed to send mentor notification email');
  }
};
