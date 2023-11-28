import React from "react";

const PrivacyPolicy = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    fontSize: "24px",
    color: "#333",
  };

  const subHeadingStyle = {
    fontSize: "20px",
    color: "#333",
  };

  const paragraphStyle = {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.5",
  };

  const listStyle = {
    listStyle: "disc",
    marginLeft: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Privacy Policy</h1>

      <p>
        Welcome to RideEasy, accessible at{" "}
        <a href="https://RideEasy.com">RideEasy.com</a>. Your privacy is
        important to us, and we are committed to protecting your personal
        information. This Privacy Policy outlines what information we collect
        and how we use it. If you have any questions or need more information,
        please contact us at{" "}
        <a href="mailto:RideEasy.nitkkr@gmail.com">RideEasy.nitkkr@gmail.com</a>
        .
      </p>

      <h2>Consent</h2>

      <p>
        By using our website, you agree to and consent to our Privacy Policy and
        its terms.
      </p>

      <h2>Information we collect</h2>

      <p>
        We collect personal information only when it is necessary. This
        information may include your name, email address, phone number, and
        other information you provide voluntarily when contacting us or
        registering for an account.
      </p>

      <h2>How we use your information</h2>

      <p>We use the information we collect for various purposes, including:</p>

      <ul>
        <li>Providing, operating, and maintaining our website</li>
        <li>Improving, personalizing, and expanding our website</li>
        <li>Understanding and analyzing how you use our website</li>
        <li>Developing new products, services, features, and functionality</li>
        <li>Communicating with you, including customer service and updates</li>
        <li>Preventing fraud</li>
      </ul>

      <h2>Log Files</h2>

      <p>
        We use standard log files to analyze trends, administer the site, and
        gather demographic information. This data is not personally identifiable
        and includes IP addresses, browser type, and more.
      </p>

      <h2>Cookies and Web Beacons</h2>

      <p>
        Like most websites, we use cookies to customize your experience based on
        your preferences. Our advertising partners may also use cookies and web
        beacons to measure advertising effectiveness.
      </p>

      <h2>Third-Party Privacy Policies</h2>

      <p>
        Our Privacy Policy doesn't apply to third-party advertisers or websites.
        Please consult their respective Privacy Policies for more information
        and options to opt out.
      </p>

      <h2>CCPA Privacy Policy (Do Not Sell My Personal Information)</h2>

      <p>
        Under the California Consumer Privacy Act (CCPA), you have the right to
        request your personal data's disclosure, deletion, and opting out of the
        sale of your data. Contact us if you wish to exercise these rights.
      </p>

      <h2>GDPR Privacy Policy (Data Protection Rights)</h2>

      <p>
        Under the General Data Protection Regulation (GDPR), you have rights
        such as access, rectification, erasure, and more. Contact us if you wish
        to exercise these rights.
      </p>

      <h2>Children's Information</h2>

      <p>
        We are committed to protecting children's privacy online. We do not
        knowingly collect Personal Identifiable Information from children under
        the age of 13. If you believe your child has provided such information,
        please contact us immediately, and we will remove it promptly.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
