import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { navigate } from "gatsby-link"

// Form Helpers
function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Subscribe = () => {
  const [email, setEmail] = useState("")

  const handleSubscribe = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "Subscribe",
        email,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => console.log(error))
  }
  return (
    <div>
      <form
        name="Subscribe"
        method="post"
        data-netlify="true"
        action="/subscribed"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubscribe}
        className="w-full flex flex-col md:flex-row align-middle"
      >
        <TextField
          name="email"
          type="email"
          variant="outlined"
          hiddenLabel
          size="small"
          label="Email"
          value={email}
          className="w-full lg:w-3/4"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            width: { xs: "100%", md: "200px" },
            marginTop: { xs: "1rem", md: "0" },
            marginLeft: { xs: "0", md: "1rem" },
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          color="primary"
          type="submit"
          disabled={email === ""}
        >
          Subscribe
        </Button>
      </form>
    </div>
  )
}

export default Subscribe
