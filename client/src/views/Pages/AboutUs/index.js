import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row
} from "reactstrap";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        username: "",
        password: "",
        passwordC: "",
        email: "",
        phoneNumber: "",
        userType: "user"
      }
    };
  }

  render() {
    return (
      <div className="app align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9">
              <Card className="mx-4">
                <CardHeader>
                  <h1>About Us</h1>
                </CardHeader>
                <CardBody className="p-4">
                  <p>
                    <strong>WiwaHub</strong> is a platform for
                    Serving/Prospective Corps members to sell their new and used
                    goods/services. WiwaHub was created by a team of innovative
                    Corp members that have combined knowledge and experience as
                    corp members to ease the process of procuring used and new
                    products and services as they are introduced into a new
                    environment.
                  </p>
                  <p>
                    When you register with us, you just need your mobile number,
                    email address and NYSC state code number to get started. Our
                    network will then initiate a verification process to
                    ascertain that you are a serving corps member (only serving
                    corps members are allowed on the platform, your timeline on
                    this platform expires at the end of your service year except
                    on a special arrangement with the site administrators..)
                  </p>
                  <p>
                    All your transactions are kept 100% secure by our
                    experienced team and our security measures adhere to the
                    highest safety and security standards.
                  </p>
                  <p>
                    <strong>WiwaHub</strong> was also created for businesses and
                    service providers offering specialized and subsidized
                    services to corp members. A range of local Nigerian payment
                    options including credit/debit card and direct debit for
                    internet bank user, is available both on mobile and online
                    devices to enable quick and efficient of registration fee to
                    safely transact on the platform.
                  </p>
                </CardBody>
                  <CardHeader>
                    <h1>Terms And Conditions</h1>
                  </CardHeader>
                  <CardBody>
                    <h3>Use of the Site</h3>
                  <p>
                    You confirm that you are at least 18 years of age or are
                    accessing the Site under the supervision of a parent or
                    legal guardian.
                  </p>
                  <p>
                  Both parties agree that this website may only be used in accordance with these Terms and Conditions of Use.  If you do not agree with the Terms and Conditions of Use or do not wish to be bound by them, you agree to refrain from using this website.
                  </p>
                  <p>
                  We grant you a non-transferable, revocable and non-exclusive licence to use this Site, in accordance with the Terms and Conditions of Use, for such things as: shopping for personal items sold on the site, gathering prior information regarding our products and services and making purchases.
                  </p>
                  <p>
                  These Terms and Conditions of Use specifically prohibit actions such as: accessing our servers or internal computer systems, interfering in any way with the functionality of this website, gathering or altering any underlying software code, infringing any intellectual property rights.  This list is non-exhaustive and similar actions are also strictly prohibited.
                  </p>
                  <p>
                  Any breach of these Terms and Conditions of Use shall result in the immediate revocation of the license granted in this paragraph without prior notice to you. Should we determine at our sole discretion that you are in breach of any of these conditions, we reserve the right to deny you access to this website and its contents and do so without prejudice to any available remedies at law or otherwise.
                  </p>
                  <p>
                  The account owner is entirely responsible for all activities that occur under such password or account. Furthermore, you must notify us of any unauthorized use of your password or account. The Site shall not be responsible or liable, directly or indirectly, in any way for any loss or damage of any kind incurred as a result of, or in connection with, your failure to comply with this section.
                  </p>
                  <p>
                  During the registration process you agree to receive promotional emails from the Site. You can subsequently opt out of receiving such promotional e-mails by clicking on the link at the bottom of any promotional email.
                  </p>
                  <h3> Links and Third Party Websites </h3>
                  <p>We may include links to third party websites at any time.  However, the existence of a link to another website should not be consider  as an affiliation or a partnership with a third party or viewed as an endorsement of a particular website unless explicitly stated otherwise.</p>
                  <p>
                  In the event the user follows a link to another website, he or she does so at his or her own risk.  We accept no responsibility for any content, including, but not limited to, information, products and services, available on third party websites.
                  </p>
                  <p>
                  Creating a link to this website is strictly forbidden without our prior written consent.  Furthermore, we reserve the right to revoke our consent without notice or justification.
                  </p>
                  <h3>User Submission</h3>
                  <p>
                  Anything that you submit to the Site and/or provide to us, including but not limited to, questions, reviews, comments, and suggestions (collectively, "Submissions") will become our sole and exclusive property and shall not be returned to you.
                  </p>
                  <p>
                  In addition to the rights applicable to any Submission, when you post comments or reviews to the Site, you also grant us the right to use the name that you submit, in connection with such review, comment, or other content.
                  </p>
                  <p>
                  You shall not use a false e-mail address, pretend to be someone other than yourself or otherwise mislead us or third parties as to the origin of any Submissions. We may, but shall not be obligated to, remove or edit any Submissions.
                  </p>
                  <p><strong><em>
                    (By completing an order or signing up, you agree to receive a) emails associated with finalizing your order, which may contain relevant offers from third parties, and b) emails asking you to review wiwahub and your purchase and c) promotional emails, SMS and push notifications from wiwahub. You may unsubscribe from promotional emails via a link provided in each email. If you would like us to remove your personal information from our database, unsubscribe from emails and/or SMS, please email Customer Service email address by country.)
                  </em></strong></p>
                  <h3>
                  Information Available on the Site
                  </h3>
                  <p>
                  You accept that the information contained in this website is provided “as is, where is”, is intended for information purposes only and that it is subject to change without notice.  Although we take reasonable steps to ensure the accuracy of information and we believe the information to be reliable when posted, it should not be relied upon and it does not in any way constitute either a representation or a warranty or a guarantee.
                  </p>
                  <p>
                  Product representations expressed on this Site are those of the vendor and are not made by us. Submissions or opinions expressed on this Site are those of the individual posting such content and may not reflect our opinions.
                  </p>
                  <h3>
                  Accessibility of the Site
                  </h3>
                  <p>
                  Our aim is to ensure accessibility to the website at all times, however we make no representation of that nature and reserves the right to terminate the website at any time and without notice.  You accept that service interruption may occur in order to allow for website improvements, scheduled maintenance or may also be due to outside factors beyond our control.
                  </p>
                  <h3>
                    Links and Third Party Websites
                  </h3>
                  <p>
                  We may include links to third party websites at any time.  However, the existence of a link to another website should not be consider  as an affiliation or a partnership with a third party or viewed as an endorsement of a particular website unless explicitly stated otherwise.
                  </p>
                  <p>
                  In the event the user follows a link to another website, he or she does so at his or her own risk.  We accept no responsibility for any content, including, but not limited to, information, products and services, available on third party websites.
                  </p>
                  <p>
                  Creating a link to this website is strictly forbidden without our prior written consent.  Furthermore, we reserve the right to revoke our consent without notice or justification.
                  </p>
                  <h3>
                    Intellectual Property
                  </h3>
                  <p>
                  Both parties agree that all intellectual property rights and database rights, whether registered or unregistered, in the Site, information content on the Site and all the website design, including, but not limited to, text, graphics, software, photos, video, music, sound, and their selection and arrangement, and all software compilations, underlying source code and software shall remain at all times vested in us or our licensors.  Use of such material will only be permitted as expressly authorized by us or our licensors.
                  </p>
                  <h3>
                    Data Protection
                  </h3>
                  <p>
                  Any personal information collected in relation to the use of this website/app will be held and used in accordant with our Privacy Policy, which is available on our Site. 
                  </p>
                  <h3>
                  Applicable Law and Justice
                  </h3>
                  <p>
                  These Terms and Conditions of Use shall be interpreted and governed by the laws in force in the Federal Republic of Nigeria. Subject to the Arbitration section below, each party hereby agrees to submit to the jurisdiction of the courts of Nigeria and to waive any objections based upon venue.
                  </p>
                  <h3>
                    Termination
                  </h3>
                  <p>
                  In addition to any other legal or equitable remedies, we may, without prior notice to you, immediately terminate the Terms and Conditions of Use or revoke any or all of your rights granted under the Terms and Conditions of Use.
                  </p>
                  <p>
                  Upon any termination of this Agreement, you shall immediately cease all access to and use of the Site/App and we shall, in addition to any other legal or equitable remedies, immediately revoke all password(s) and account identification issued to you and deny your access to and use of this Site in whole or in part.
                  </p>
                  <p>
                  Any termination of this agreement shall not affect the respective rights and obligations (including without limitation, payment obligations) of the parties arising before the date of termination. You furthermore agree that the Site shall not be liable to you or to any other person as a result of any such suspension or termination.
                  </p>
                  <h3>
                    Severability
                  </h3>
                  <p>
                  If any portion of these terms or conditions is held by any court or tribunal to be invalid or unenforceable, either in whole or in part, then that part shall be severed from these Terms and Conditions of Use and shall not affect the validity or enforceability of any other section listed in this document.
                  </p>
                  <h3>
                    Miscellaneous Provisions
                  </h3>
                  <p>
                  You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
                  </p>
                  <p>
                  Assigning or sub-contracting any of your rights or obligations under these Terms and Conditions of Use to any third party is prohibited unless agreed upon in writing by the seller.
                  </p>
                  <p>
                  We reserve the right to transfer, assign or sub-contract the benefit of the whole or part of any rights or obligations under these Terms and Conditions of Use to any third party.
                  </p>
                  </CardBody>
                <CardFooter className="p-4">
                  <Link to="/register">
                    {" "}
                    <p color="primary" block>
                      Register
                    </p>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AboutUs;
