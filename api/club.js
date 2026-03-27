export default async function handler(req, res) {
  try {
    const competitionPath =
      req.query.path || "competities/2025-2026/occitanie/regional/2c/";
    const clubName = req.query.club;

    if (!clubName) {
      return res.status(400).json({
        error: "Le paramètre 'club' est obligatoire",
      });
    }

    const apiKey = process.env.LIGUESDEFOOT_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Variable d'environnement manquante",
      });
    }

    const url = `https://api.liguesdefoot.fr/${competitionPath}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      return res.status(500).json({
        error: "Réponse API non JSON",
        bodyPreview: text.slice(0, 500),
      });
    }

    if (data["401"]) {
      return res.status(401).json({
        error: "Unauthorized",
        details: data["401"],
      });
    }

    const payload = data.competition || data;

    function normalize(value) {
      return (value || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    }

    const clubNormalized = normalize(clubName);

    function matchesClub(value) {
      const normalizedValue = normalize(value);
      return (
        normalizedValue === clubNormalized ||
        normalizedValue.includes(clubNormalized) ||
        clubNormalized.includes(normalizedValue)
      );
    }

    let leagueTable = [];
    if (Array.isArray(payload.leagueTable)) {
      leagueTable = payload.leagueTable;
    } else if (Array.isArray(payload.leaguetable)) {
      leagueTable = payload.leaguetable;
    }

    const results = Array.isArray(payload.results) ? payload.results : [];

    let programme = [];
    if (Array.isArray(payload.programme)) {
      programme = payload.programme;
    } else if (Array.isArray(payload.program)) {
      programme = payload.program;
    }

    const standing =
      leagueTable.find((team) => matchesClub(team.name)) || null;

    const lastResults = results
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const nextMatches = programme
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    return res.status(200).json({
      club: clubName,
      standing,
      lastResults,
      nextMatches,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
    });
  }
}      return res.status(500).json({
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

    const payload = data.competition || data

    const normalize = (value) =>
      (value || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()

    const clubNormalized = normalize(clubName)

    const matchesClub = (value) => {
      const normalizedValue = normalize(value)
      return (
        normalizedValue === clubNormalized ||
        normalizedValue.includes(clubNormalized) ||
        clubNormalized.includes(normalizedValue)
      )
    }

    const leagueTable = Array.isArray(payload.leagueTable)
      ? payload.leagueTable
      : Array.isArray(payload.leaguetable)
      ? payload.leaguetable
      : []

    const results = Array.isArray(payload.results) ? payload.results : []

    const programme = Array.isArray(payload.programme)
      ? payload.programme
      : Array.isArray(payload.program)
      ? payload.program
      : []

    const standing =
      leagueTable.find((team) => matchesClub(team.name)) || null

    const lastResults = results
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)

    const nextMatches = programme
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)

    return res.status(200).json({
      club: clubName,
      standing,
      lastResults,
      nextMatches,
    })
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
    })
  }
}      return res.status(500).json({
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

    const payload = data.competition || data

    const normalize = (value) =>
      (value || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()

    const clubNormalized = normalize(clubName)

    const matchesClub = (value) => {
      const normalizedValue = normalize(value)
      return (
        normalizedValue === clubNormalized ||
        normalizedValue.includes(clubNormalized) ||
        clubNormalized.includes(normalizedValue)
      )
    }

    const leagueTable = Array.isArray(payload.leagueTable)
      ? payload.leagueTable
      : Array.isArray(payload.leaguetable)
      ? payload.leaguetable
      : []

    const results = Array.isArray(payload.results) ? payload.results : []
    const programme = Array.isArray(payload.programme) ? payload.programme : []

    const standing =
      leagueTable.find((team) => matchesClub(team.name)) || null

    const lastResults = results
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)

    const nextMatches = programme
      .filter((match) => matchesClub(match.home) || matchesClub(match.away))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)

    return res.status(200).json({
      club: clubName,
      clubNormalized,
      standing,
      lastResults,
      nextMatches,
      debug: {
        rootKeys: Object.keys(data),
        payloadKeys: Object.keys(payload),
        leagueTableCount: leagueTable.length,
        resultsCount: results.length,
        programmeCount: programme.length,
        sampleTeamNames: leagueTable.slice(0, 10).map((team) => team.name),
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      message: error.message,
    })
  }
}
