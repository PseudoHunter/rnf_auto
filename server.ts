import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint for Cloud Run and monitoring
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "rnf-business-solutions", timestamp: new Date().toISOString() });
  });

  // Secure Backend Admin Verification API
  // Username: rnfadminhebat, Password: rnfnumber1
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body || {};
    const validUser = (username || "").trim().toLowerCase() === "rnfadminhebat";
    const validPass = (password || "").trim() === "rnfnumber1";

    if (validUser && validPass) {
      return res.json({
        success: true,
        user: "rnfadminhebat",
        role: "root_admin",
        authenticatedAt: new Date().toISOString(),
      });
    }

    return res.status(401).json({
      success: false,
      error: "Akses Ditolak: Nama pengguna atau kata laluan pentadbir tidak sah.",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
