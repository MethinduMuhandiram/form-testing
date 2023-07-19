import React, { useState } from "react"
import { navigate } from "gatsby-link"
import { Container, Button, TextField, FormControl, Grid } from "@mui/material"

import FileUploader from "../components/fileUploader"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function Career() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "career-form",
        name,
        email,
        phone,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <Container
      sx={{
        margin: "3rem auto",
      }}
    >
      <form
        name="career-form"
        method="post"
        action="/success"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="career-form" />
        <label style={{ display: "none" }}>
          Don’t fill this out: <input name="bot-field" />
        </label>
        <div className="my-10">
          <Grid container spacing={3}>
            <Grid item md={6} sx={{ width: "100%" }}>
              <b>Your Name</b>
              <TextField
                sx={{ width: "100%" }}
                name="name"
                type="text"
                id="standard-basic"
                variant="standard"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} sx={{ width: "100%" }}>
              <b>Phone Number</b>
              <TextField
                sx={{ width: "100%" }}
                name="phone"
                type="text"
                id="standard-basic"
                variant="standard"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item md={6} sx={{ width: "100%" }}>
              <b>Your Email</b>
              <TextField
                name="email"
                type="email"
                sx={{ width: "100%" }}
                id="standard-basic"
                variant="standard"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>

          <FormControl sx={{ width: "100%", marginTop: "30px" }}>
            <b>CV or Resume</b>
            <p className="mb-2 text-sm">(Maximum upload file size: 5MB)</p>
            <FileUploader action={setFile} />
          </FormControl>
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "5px",
          }}
        >
          Apply
        </Button>
      </form>
    </Container>
  )
}
