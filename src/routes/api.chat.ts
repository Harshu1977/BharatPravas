import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are "Pravas Mitra", the friendly travel assistant for BharatPravas — a Maharashtra-based offbeat travel company.
Help visitors pick trips (treks, weekend escapes, women-only tours, beach camps, heritage walks), explain inclusions, safety, group sizes and booking.
Keep answers short (2-5 sentences), warm and practical. Prices are in INR.
Contact: phone +91 92707 72205, email xplorevo@gmail.com, WhatsApp +91 97632 62025.
If you don't know a specific date or price, invite the visitor to WhatsApp the team or use the Plan My Trip form.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (!messages.length) return new Response("Messages are required", { status: 400 });

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI is not configured", { status: 500 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "openai/gpt-5.6-sol",
            stream: true,
            instructions: SYSTEM,
            input: messages.map((m) => ({
              role: m.role,
              content: [
                {
                  type: m.role === "assistant" ? "output_text" : "input_text",
                  text: String(m.content ?? ""),
                },
              ],
            })),
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const detail = await upstream.text();
          console.error(`AI gateway error [${upstream.status}]: ${detail}`);
          const message =
            upstream.status === 429
              ? "We're getting a lot of questions right now — please try again in a moment."
              : upstream.status === 402
                ? "Our AI assistant is out of credits. Please WhatsApp us and we'll reply right away."
                : "Sorry, the assistant is unavailable right now. Please WhatsApp us at +91 97632 62025.";
          return new Response(message, { status: upstream.status === 429 ? 429 : 503 });
        }

        // Re-emit the SSE stream as plain text deltas for the widget.
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            const reader = upstream.body!.getReader();
            try {
              for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                  if (!line.startsWith("data:")) continue;
                  const payload = line.slice(5).trim();
                  if (!payload || payload === "[DONE]") continue;
                  try {
                    const event = JSON.parse(payload) as { type?: string; delta?: string };
                    if (event.type === "response.output_text.delta" && event.delta) {
                      controller.enqueue(encoder.encode(event.delta));
                    }
                  } catch {
                    /* ignore keep-alive / partial frames */
                  }
                }
              }
            } catch (error) {
              console.error(error);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
