export default async function handler(req, res) {
  try {
    const competitionPath =
      req.query.path || "competities/2025-2026/occitanie/regional/2c/"

    const url = `https://api.liguesdefoot.fr/${competitionPath}`

    const apiKey = process.env.LIGUESDEFOOT_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        error: "Variable d'environnement manquante",
        missing: "LIGUESDEFOOT_API_KEY",
      })
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },
    })

    const text = await response.text()

    return res.status(response.status).json({
      requestedUrl: url,
      status: response.status,
      ok: response.ok,
      bodyPreview: text.slice(0, 500),
    })
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
    })
  }
}
