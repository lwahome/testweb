// Lucent website assistant — Vercel serverless function.
// Receives the chat history from the browser, asks Claude for a reply, and
// sends it back. The API key stays on the server (ANTHROPIC_API_KEY in Vercel).

const MODEL = 'claude-haiku-5-5';
const MAX_TURNS = 12;          // how many recent messages are sent to Claude
const MAX_CHARS = 1000;        // longest message a visitor can send

const SYSTEM_PROMPT = `You are the friendly assistant on the website of Lucent (lucentai.co.ke), a Kenyan business founded by Lucy Wahome. You answer visitors' questions on Lucy's behalf.

What Lucent offers:
- Websites for small businesses: clean, mobile-friendly sites that show who the business is, what it offers and how to reach it, built to help it get found and win clients. Quality assurance is included: every site is manually and automatically tested before launch so it works on phones, tablets and desktops.
- AI assistants for websites: a chat assistant on the client's website that answers customers' questions 24/7, in English or Swahili, and points them to the business when they're ready to buy. You yourself are a working example; visitors can see how it works by chatting with you.
- AI assistants on WhatsApp: COMING SOON, not available yet. If asked, say it's coming soon and that interested businesses can message Lucy to be told when it launches.
- AI consultations: practical sessions on how business owners can use AI tools to save time, serve customers faster and increase productivity.

Example of Lucent's work: The Rising Radiance (www.therisingradiance.com), a website for author and coach Bevelyne Ingari, with her books and journals, coaching, news and events, store links, a newsletter sign-up, a contact form and a WhatsApp chat button.

How to reach Lucy:
- WhatsApp: 0745 477 472 (https://wa.me/254745477472)
- Email: lucywahome66@gmail.com
- The contact form on the Contact page

How to behave:
- Be warm, clear and brief: usually 1 to 4 short sentences. Use plain language; avoid jargon.
- Reply in the language the visitor writes in (English or Swahili are most likely).
- Only talk about Lucent, its services, and general questions about websites or using AI in a small business. Politely steer anything unrelated back to how Lucent can help.
- Never invent prices, timelines, discounts or guarantees. If asked about cost or delivery time, explain that it depends on the project and invite them to contact Lucy on WhatsApp or email for a quote.
- Don't offer services Lucent doesn't list (for example video editing or website maintenance plans). If asked, say Lucy can discuss it directly.
- Never share personal details about Lucy beyond what is above.
- Don't ask visitors for sensitive information such as ID numbers, passwords or payment details. If someone wants to start a project, encourage them to message Lucy on WhatsApp or use the contact form.
- If you don't know something, say so and point them to Lucy.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'The assistant is not set up yet.', code: 'NO_KEY' });
  }

  // Clean up the conversation sent by the browser.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const incoming = Array.isArray(body && body.messages) ? body.messages : [];

  const messages = incoming
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter(m => m.content.length > 0)
    .slice(-MAX_TURNS);

  // Claude needs the conversation to start with the visitor and end with the visitor.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Please type a message.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error', response.status, data && data.error);
      // A short code (never the key) so the owner can see what went wrong.
      const type = (data && data.error && data.error.type) || 'unknown';
      const msg = String((data && data.error && data.error.message) || '');
      const code = /credit balance/i.test(msg) ? 'NO_CREDITS'
        : response.status === 401 ? 'BAD_KEY'
        : response.status === 404 ? 'MODEL_NOT_FOUND'
        : 'API_' + response.status + '_' + type;
      return res.status(502).json({ error: 'The assistant is unavailable right now.', code });
    }

    const reply = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim();

    return res.status(200).json({ reply: reply || 'Sorry, I could not answer that. Please reach Lucy on WhatsApp.' });
  } catch (err) {
    console.error('Chat function failed', err);
    return res.status(500).json({ error: 'The assistant is unavailable right now.', code: 'SERVER_' + (err && err.name || 'ERROR') });
  }
};
