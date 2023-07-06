import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import { navigate } from "gatsby-link"

const HelpForm = () => {
  const [selectedServices, setSelectedServices] = useState([])

  const handleServiceClick = service => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(item => item !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    selectedServices.forEach(service => {
      formData.append("services[]", service)
    })

    // Submit the form to Netlify or perform any other actions with the form data
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => console.log(error))
  }

  return (
    <div className="relative mx-auto p-10 w-full sm:w-[450px] shadow-2xl rounded-xl bg-white">
      <p>I'm interested in...</p>

      {/* services buttons  */}
      <div className="flex flex-col md:flex-row justify-between my-3">
        {/* Software Development  */}
        <Button
          variant={
            selectedServices.includes("Software Development")
              ? "contained"
              : "outlined"
          }
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            px: 2,
            marginBottom: { xs: "12px", md: 0 },
          }}
          onClick={() => handleServiceClick("Software Development")}
        >
          Software Development
        </Button>

        {/* Design */}
        <Button
          variant={
            selectedServices.includes("Design") ? "contained" : "outlined"
          }
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            px: 2,
            marginBottom: { xs: "12px", md: 0 },
          }}
          onClick={() => handleServiceClick("Design")}
        >
          Design
        </Button>

        {/* UI/UX */}
        <Button
          variant={
            selectedServices.includes("UI/UX") ? "contained" : "outlined"
          }
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            px: 2,
            marginBottom: { xs: "12px", md: 0 },
          }}
          onClick={() => handleServiceClick("UI/UX")}
        >
          UI/UX
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        {/* Social Media Management */}
        <Button
          variant={
            selectedServices.includes("Social Media Management")
              ? "contained"
              : "outlined"
          }
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            px: 2,
            marginBottom: { xs: "12px", md: 0 },
          }}
          onClick={() => handleServiceClick("Social Media Management")}
        >
          Social Media Management
        </Button>

        {/* Web Application */}
        <Button
          variant={
            selectedServices.includes("Web Application")
              ? "contained"
              : "outlined"
          }
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            px: 2,
            marginBottom: { xs: "12px", md: 0 },
          }}
          onClick={() => handleServiceClick("Web Application")}
        >
          Web Application
        </Button>
      </div>

      <form
        name="help-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        action="/success"
      >
        <input type="hidden" name="form-name" value="help-form" />
        <p hidden>
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="my-10">
          <TextField
            sx={{ width: "100%", paddingBottom: "10px" }}
            id="standard-basic"
            label="Your name"
            variant="standard"
          />
          <TextField
            sx={{ width: "100%", paddingBottom: "10px" }}
            id="standard-basic"
            label="Your email"
            variant="standard"
          />
          <TextField
            sx={{ width: "100%", paddingBottom: "10px" }}
            id="standard-basic"
            label="Message"
            variant="standard"
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
            width: { xs: "100%", md: "50%" },
          }}
        >
          Send Message
        </Button>
      </form>
    </div>
  )
}

export default HelpForm
