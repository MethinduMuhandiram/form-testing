import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { navigate } from "gatsby-link"

// Form Helpers
function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// function encode(data) {
//   const formData = new FormData()

//   Object.keys(data).forEach(key => {
//     if (Array.isArray(data[key])) {
//       data[key].forEach(value => {
//         formData.append(key + "[]", value)
//       })
//     } else {
//       formData.append(key, data[key])
//     }
//   })

//   return new URLSearchParams(formData).toString()
// }

const ContactForm = () => {
  // const checkboxList = [
  //   "Website",
  //   "Web Application",
  //   "Mobile App",
  //   "Social Media",
  //   "Design",
  //   "SEO",
  //   "Other",
  // ]

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const [website, setWebsite] = useState(false)
  const [mobileApp, setMobileApp] = useState(false)
  const [design, setDesign] = useState(false)
  const [seo, setSeo] = useState(false)
  const [webApp, setWebApp] = useState(false)
  const [social, setSocial] = useState(false)
  const [other, setOther] = useState(false)

  // const handleCheckboxChange = event => {
  //   const itemName = event.target.name

  //   setCheckedItems(prevCheckedItems => {
  //     if (prevCheckedItems.includes(itemName)) {
  //       return prevCheckedItems.filter(item => item !== itemName)
  //     } else {
  //       return [...prevCheckedItems, itemName]
  //     }
  //   })
  // }

  const handleSubmit = e => {
    console.log(website, webApp, mobileApp, design, social, seo, other)
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "Contact",
        firstName,
        lastName,
        email,
        phone,
        message,

        website,
        webApp,
        mobileApp,
        design,
        social,
        seo,
        other,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => console.log(error))
  }

  return (
    <div className={`text-secondary`}>
      <Form
        name="Contact"
        onSubmit={handleSubmit}
        method="post"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="Contact" />
        <Row className="ps-lg-5 pb-lg-5">
          <Col md={6} sm={12} className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                onChange={e => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="ps-lg-5  pb-lg-5">
          <Col md={6} sm={12} className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="string"
                onChange={e => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="ms-lg-5 mb-sm-5">
          <Col className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>What service do you need ?</Form.Label>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="Website"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="website"
                    // checked={checkedItems.includes(service)}
                    onChange={() => setWebsite(true)}
                  />
                </Col>
              </Row>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="Web Application"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="webApp"
                    onChange={() => setWebApp(true)}
                  />
                </Col>
              </Row>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="Mobile App"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="mobileApp"
                    onChange={() => setMobileApp(true)}
                  />
                </Col>
              </Row>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="Design"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="design"
                    onChange={() => setDesign(true)}
                  />
                </Col>
              </Row>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="SEO"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="seo"
                    onChange={() => setSeo(true)}
                  />
                </Col>
              </Row>
              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="Social Media"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="social"
                    onChange={() => setSocial(true)}
                  />
                </Col>
              </Row>

              <Row className="m-sm-3">
                <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                  <Form.Check
                    label="other"
                    type="checkbox"
                    aria-label="checkbox for following text input"
                    name="other"
                    onChange={() => setOther(true)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row className="ms-lg-5">
          <Col className="px-lg-5">
            <Form.Group className="mb-md-3">
              <Form.Label className="mb-md-5">Message</Form.Label>
              <Form.Control
                name="message"
                type="text"
                placeholder="Write your message"
                onChange={e => setMessage(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button className={` m-sm-5 mt-3 `} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ContactForm
