import React, { useState } from "react"
import { navigate } from "gatsby-link"
import { TextField, Button } from "@mui/material"
import Switch from "@mui/material/Switch"
import SocialMediaLinks from "../components/socialMediaLinks"
import Subscribe from "../components/subscribe"

// Form Helpers
function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}
const ContactForm = () => {
  const [checked, setChecked] = useState(true)

  const switchHandler = event => {
    setChecked(event.target.checked)
  }

  const [fullName, setfullName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "Contact",
        fullName,
        company,
        email,
        message,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => console.log(error))
  }

  return (
    <div className="p-5 w-full">
      <form
        name="Contact"
        method="post"
        data-netlify="true"
        action="/success"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={() => {}} />
          </label>
        </p>
        <div className="flex flex-col md:flex-row my-5 gap-5">
          <TextField
            id="full-name"
            name="fullName"
            type="text"
            label="Full Name"
            required
            variant="outlined"
            className="w-full"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
          <TextField
            id="company"
            name="company"
            type="text"
            label="Company"
            required
            variant="outlined"
            className="w-full"
            value={company}
            onChange={e => setCompany(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
        </div>

        <div className="my-5">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            required
            variant="outlined"
            className="w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
        </div>

        <div className="my-5 ">
          <TextField
            id="message"
            name="message"
            type="text"
            label="Your Message"
            required
            multiline
            rows={4}
            className="w-full"
            value={message}
            onChange={e => setMessage(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
        </div>

        {/* Switch */}
        <div className="flex my-5 gap-2 items-center">
          <Switch defaultChecked color="primary" onChange={switchHandler} />
          <p className="text-sm">I agree to the terms and conditions</p>
        </div>

        <Button
          disabled={!checked}
          type="submit"
          variant="contained"
          className="w-full bg-[#085879] hover:bg-[#0878a8] disabled:bg-slate-400"
        >
          Send Message
        </Button>
        <div className="flex justify-center">
          <SocialMediaLinks />
        </div>
      </form>

      <Subscribe />
    </div>
  )
}

export default ContactForm
