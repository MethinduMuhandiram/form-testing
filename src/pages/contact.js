import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { navigate } from "gatsby-link"

// Form Helpers
// function encode(data) {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&")
// }

function encode(data) {
  const formData = new FormData()

  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach(value => {
        formData.append(key + "[]", value)
      })
    } else {
      formData.append(key, data[key])
    }
  })

  return new URLSearchParams(formData).toString()
}

const ContactForm = () => {
  const checkboxList = [
    "Website",
    "Web Application",
    "Mobile App",
    "Social Media",
    "Design",
    "SEO",
    "Other",
  ]

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [checkedItems, setCheckedItems] = useState([])
  const [message, setMessage] = useState("")

  const handleCheckboxChange = event => {
    const itemName = event.target.name

    setCheckedItems(prevCheckedItems => {
      if (prevCheckedItems.includes(itemName)) {
        return prevCheckedItems.filter(item => item !== itemName)
      } else {
        return [...prevCheckedItems, itemName]
      }
    })
  }

  const handleSubmit = e => {
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
        services: checkedItems,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => console.log(error))
  }

  return (
    <div className={`.text-secondary`}>
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
                name="firstname"
                type="text"
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12} className="px-lg-5">
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastname"
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
                type="tel"
                pattern="[0-9]{10}"
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
                {checkboxList.map(item => (
                  <Col xs={6} sm={4} md={3} className="mb-3 p-1">
                    <Form.Check
                      label={item}
                      type="checkbox"
                      aria-label="checkbox for following text input"
                      name={item}
                      checked={checkedItems.includes(item)}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row className="ms-lg-5">
          <Col className="px-lg-5">
            <Form.Group className="mb-md-3">
              <Form.Label className="mb-md-5">Message</Form.Label>
              <Form.Control
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
