import React from "react"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import IconButton from "@mui/material/IconButton"

export default function SocialMediaLinks({}) {
  return (
    <div className="flex items-center mt-10 gap-4">
      <a
        href="https://www.facebook.com/profile.php?id=100054485318830"
        target="_blank"
      >
        <IconButton
          size="small"
          sx={{
            marginRight: "20px",
            color: "#085879",
          }}
        >
          <FaFacebookF />
        </IconButton>
      </a>

      <a
        href="https://www.linkedin.com/company/aqua-masters-pvt-ltd/"
        target="_blank"
      >
        <IconButton
          size="small"
          sx={{
            marginRight: "20px",
            color: "#085879",
          }}
        >
          <FaLinkedinIn />
        </IconButton>
      </a>
    </div>
  )
}
