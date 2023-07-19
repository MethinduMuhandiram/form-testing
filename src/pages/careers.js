import React, { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import FileUploader from "./fileUploader"
import { navigate } from "gatsby"

// Form Helpers
function encode(data) {
  const formData = new FormData()
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  return formData
}

export default function Join() {
  const [file, setFile] = useState(null)
  const [position, setPosition] = useState("Business Development Executive")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": "careerForm",
        name,
        position,
        email,
        file,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <Container className="my-5 py-5  px-3 px-md-0">
      <Row className="g-5">
        <Col md={6}>
          <h1 className="mb-3">
            <strong>Join Our Winning Team</strong>
          </h1>
          <p>
            At Asia Corp Insurance, we empower our staff to be agile,
            collaborative, and trustworthy, giving them a chance to have
            experiences and successes that truly matter, situations that
            challenge and develop their skills and help them grow.
          </p>
          <p>
            Everyone has a chance to make an impact and create those moments
            that make you feel proud.
          </p>
          <p>Join our winning team today and become part of Asia Corp.</p>
          <iframe
            title="google-places"
            src="https://www.google.com/maps/embed?pb=!4v1646907162176!6m8!1m7!1sksw7QL5q_HVpJgIrurFUvA!2m2!1d6.933035154890928!2d79.84330418394356!3f107.75646944940351!4f40.719880173440686!5f0.4000000000000002"
            style={{
              border: 0,
              width: "100%",
              height: "250px",
              maxWidth: "100%",
            }}
            allowFullscreen=""
            loading="lazy"
          ></iframe>
        </Col>

        <Col md={6}>
          <Form
            name="careerForm"
            method="post"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="careerForm" />
            <label style={{ display: "none" }}>
              Don’t fill this out: <input name="bot-field" />
            </label>

            <Form.Group>
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                placeholder="Your Name"
                size="lg"
                value={name}
                onChange={e => {
                  setName(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                required
                placeholder="Your Email"
                size="lg"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position or Designation</Form.Label>
              <Form.Control
                name="position"
                as="select"
                size="lg"
                value={position}
                onChange={e => {
                  setPosition(e.target.value)
                }}
              >
                <option>Call Center Agent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>CV or Resume</Form.Label>
              <FileUploader action={setFile} />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%" }}
              disabled={!name || !email || !file}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
