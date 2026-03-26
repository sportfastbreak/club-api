export default async function handler(req, res) {
  try {
    const competitionPath =
      req.query.path || "competities/2025-2026/occitanie/regional/2c/"

    const apiKey = process.env.LIGUESDEFOOT_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        error: "Variable d'environnement manquante",
      })
    }

    const url = `https://api.liguesdefoot.fr/${competitionPath}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },
    })

    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return res.status(500).json({
        error: "Réponse API non JSON",
        bodyPreview: text.slice(0, 500),
      })
    }

    if (data["401"]) {
      return res.status(401).json({
        error: "Unauthorized",
        details: data["401"],
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
    })
  }
}
