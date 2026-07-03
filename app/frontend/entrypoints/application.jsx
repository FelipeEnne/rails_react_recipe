import { createRoot } from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "../styles/application.css"
import App from "../components/App"

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
