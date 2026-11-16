
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Тек POST сұранысына рұқсат етіледі."
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API кілті серверде табылмады."
    });
  }

  const { shopLink, productName } = req.body || {};

  if (
    typeof shopLink !== "string" ||
    !/^https?:\/\//i.test(shopLink) ||
    shopLink.length > 500
  ) {
    return res.status(400).json({
      error: "Дұрыс дүкен сілтемесін енгізіңіз."
    });
  }

  const prompt = `
Сен VISUAL CHOICE медиасауаттылық жобасының
Shop Check талдау көмекшісісің.

Дүкен сілтемесі: ${shopLink}
Тауар: ${String(productName || "Көрсетілмеген").slice(0, 200)}

Тек қазақ тілінде жауап бер.

МАҢЫЗДЫ:
- Сенде Instagram парақшасын тікелей ашатын құрал жоқ.
- Оқырман санын, пікірлерді, жарияланымдарды,
  бағаны немесе тіркеу деректерін ойдан шығарма.
- Сілтеменің өзі алаяқтықты дәлелдемейді.
- Нақты тексерілмеген мәліметті расталған факт деме.
- Қауіп белгілерін тек шартты түрде түсіндір.
- Дүкенді алаяқ деп кесіп айтпа.
- Қауіпсіз тексеру жолдарын ұсын.

JSON форматында жауап бер:
{
  "shopName": "Сілтемеден анықталатын атау",
  "summary": "Қолжетімді ақпараттың шектеулері",
  "riskLevel": "Анықталмаған",
  "redFlags": ["Нені тексеру керек"],
  "verifiedFacts": ["Сілтемеден белгілі деректер"],
  "recommendations": "Тексеру бойынша ұсыныстар"
}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    
if (!response.ok) {
  const errorText = await response.text();

  console.error(
    "Gemini API қатесі:",
    response.status,
    errorText
  );

  return res.status(502).json({
    error: `Gemini API қатесі: ${response.status}. ${errorText.slice(0, 500)}`
  });
}


    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Жауап бос");
    }

    const result = JSON.parse(text);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Талдау кезінде қате пайда болды."
    });
  }
}
