export default async function handler(req, res) {
  try {
    const competitionPath =
      req.query.path || "competitions/2025-2026/national/1/"

    const url = `https://api.liguesdefoot.fr/${competitionPath}`

    const response = await fetch(url, {
      headers: {
        "X-API-Key": "8z2q7q4f7ryfjxho5cnyfi0caa2s7tavV",
      },
    })

    const data = await response.json()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
    })
  }
}
