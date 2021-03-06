import React from "react"

const BlogPreview = ({ entry, widgetFor }) => {
  const title = widgetFor("title")
  const body = widgetFor("body")
  const date = entry.getIn(["data", "date"])
    ? entry.getIn(["data", "date"]).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""
  const updatedDate = entry.getIn(["data", "updatedDate"])
    ? entry.getIn(["data", "updatedDate"]).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""
  return (
    <div className="container">
      <h1>{title}</h1>
      <small>
        {date === updatedDate ? date : `Updated at: ${updatedDate}`}
      </small>
      <main>{body}</main>
    </div>
  )
}
export default BlogPreview
