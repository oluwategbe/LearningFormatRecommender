const asyncHandler = require("../middlewares/async");
const Partner = require("../models/Partner");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.createPartner = asyncHandler(async (req, res, next) => {
  // check if partner exists
  const checkPartner = await Partner.findOne({
    email: req.body.email,
  });
  if (checkPartner) {
    return next(new ErrorResponse("Partner already exists", 400));
  }

  //create app url
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}`;

  // email
  const message = `<h1>Hello, </h1> \n\n 
  <p>A User has filled the AWS Partner Form</p>
  <p>User Details</p>
<p><b>Name:</b> ${req.body.name}</p>
<p><b>Organization:</b> ${req.body.organization}</p>
<p><b>Email:</b> ${req.body.email}</p>`;

  //   <p>Click on the link to go to the admin dashboard</p>
  //   <br />
  //  <a href="" style="padding:1rem;color:black;background:#ff4e02;border-radius:5px;text-decoration:none;">Go to Dashboard</a>

  const message2 = `<p style="color:black">Thanks for indicating interest in the AWS Partner Program organized by Lotus Beta Analytics Nigeria. You will be contacted as soon as possible for further engagement.</p> \n\n 
  <p style="color:black">We are scheduling virtual session for every business on a first-come first-serve basis. Hence, we anticipate your full commitment for a smooth onboarding.</p>
                    <div style="">
                      <p style="margin:0;font-weight:400;display:block;color:black;font-style:italic">See you soon.</p>
                      <p style="margin:0;display:block;color:black;font-weight:700;">The Partnership Team.</p>
                      <p style="margin:0;display:block;color:black;font-weight:700;">AWS Partners-Lotus Beta.<p/>
                    </div>
                      <div style="margin-top:1rem;gap:0.5rem">
                        <div style="text-align:center;display:block;align-items:center;position:relative;left:0;right:0;margin:auto;">
                          <a href="https://www.facebook.com/Lotusbetaanalyticsnigerialtd/">
                            <img
                      src="https://www.aws.lotusbetaanalytics.com/static/media/facebook.png" alt="Facebook"
                             </a>
                            <a href="https://twitter.com/LbanNigeria">
                            <img
                      src="https://www.aws.lotusbetaanalytics.com/static/media/twitter.png" alt="Twitter"
                             </a>
                              <a href="https://www.instagram.com/lbannigeria/">
                            <img
                      src="https://www.aws.lotusbetaanalytics.com/static/media/insta.png" alt="Instagram"
                             </a>
                                <a href="https://www.youtube.com/channel/UCOhLIAisZyiolylqVhuq2qg">
                            <img
                      src="https://www.aws.lotusbetaanalytics.com/static/media/youtube.png" alt="Youtube"
                             </a>
                                  <a href="https://www.linkedin.com/company/lotus-beta-analytics/">
                            <img
                      src="https://www.aws.lotusbetaanalytics.com/static/media/linkedin.png" alt="LinkedIn"
                             </a>
                        </div>
                           <div style="display: block;text-align:center">
                             <div>
    <a style="font-size: 11px; display: inline;" href="https://www.google.com/maps/search/21,+Omorinre+Johnson?entry=gmail&source=g">21, Omorinre Johnson</a>
    <a style="font-size: 11px; display: inline;">off, Mobolaji Johnson Rd, Marwa B/stop Lekki Lagos</a>
  </div>
                            </div>        
                      </div></div>`;

  try {
    await sendEmail({
      email: process.env.CONTACT_EMAIL || "ayomide@lotusbetaanalytics.com",
      // email: "pelumitegbe@gmail.com",
      subject: "Form Filled",
      content: message,
    });
    await sendEmail({
      email: req.body.email,
      subject: "AWS Partner",
      content: message2,
    });
    const partner = await Partner.create(req.body);
    res.status(201).json({
      success: true,
      data: partner,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 500));
  }
});

exports.getPartners = asyncHandler(async (req, res, next) => {
  const partners = await Partner.find();
  res
    .status(200)
    .json({ success: true, count: partners.length, data: partners });
});

exports.getPartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) {
    return next(new ErrorResponse("Partner not found", 404));
  }
  res.status(200).json({ success: true, data: partner });
});
