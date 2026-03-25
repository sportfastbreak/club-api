export default async function handler(req, res) {
  try {
    const competitionPath =
      req.query.path || "competities/2025-2026/occitanie/regional/2c/"

    const url = `https://api.liguesdefoot.fr/${competitionPath}`

    const response = await fetch(url, {
      headers: {
        "X-API-Key": "8z2q7q4f7ryfjxho5cnyfi0caa2s7tavV",
      },
    })

    const text = await response.text()

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur API externe",
        status: response.status,
        body: text,
        url,
      })
    }

    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      return res.status(500).json({
        error: "Réponse non JSON",
        body: text,
        url,
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
      stack: error.stack,
    })
  }
}
