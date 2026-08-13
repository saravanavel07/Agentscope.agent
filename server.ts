import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client lazy wrapper on server
  let aiClient: GoogleGenAI | null = null;
  function getAIClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured in Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AgentScope Backend Server", timestamp: new Date().toISOString() });
  });

  // Meta-Agent AI Debugger endpoint
  app.post("/api/debugger/analyze", async (req, res) => {
    try {
      const { scenarioTitle, agents, traceEvents, edges } = req.body;

      const ai = getAIClient();

      const prompt = `You are the Meta-Agent AI Debugger for AgentScope, an expert in debugging multi-agent AI systems, agent swarms, ReAct loops, prompt drift, schema mismatches, recursive tool crashes, and delegation deadlocks.

Analyze the following multi-agent system execution trace:

Scenario: "${scenarioTitle || "Custom Multi-Agent Network"}"
Agents in system:
${JSON.stringify(agents || [], null, 2)}

Active Inter-Agent Edges:
${JSON.stringify(edges || [], null, 2)}

Trace Events (Log timeline):
${JSON.stringify(traceEvents || [], null, 2)}

Instructions:
1. Identify the root cause of any failures, recursive loops, error spikes, delegation bottlenecks, or state drifts in this run.
2. Provide a clear, concise summary of the failure root cause.
3. Classify the issue type as one of: "RECURSIVE_LOOP", "SCHEMA_DRIFT", "DELEGATION_DEADLOCK", "LATENCY_SPIKE", "PROMPT_AMBIGUITY", or "NONE".
4. List the impacted agent IDs.
5. Detail a step-by-step fix recommendation.
6. Provide concrete recommended updated system prompts for the affected agents that will fix the root cause.
7. Assign a confidence score between 0.0 and 1.0.

Return structured JSON according to the schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rootCauseSummary: { type: Type.STRING },
              issueType: {
                type: Type.STRING,
                description: "One of RECURSIVE_LOOP, SCHEMA_DRIFT, DELEGATION_DEADLOCK, LATENCY_SPIKE, PROMPT_AMBIGUITY, NONE",
              },
              impactedAgentIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              explanation: { type: Type.STRING },
              recommendedPrompts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    agentId: { type: Type.STRING },
                    agentName: { type: Type.STRING },
                    newSystemPrompt: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ["agentId", "newSystemPrompt", "explanation"],
                },
              },
              confidenceScore: { type: Type.NUMBER },
            },
            required: ["rootCauseSummary", "issueType", "impactedAgentIds", "explanation", "recommendedPrompts", "confidenceScore"],
          },
        },
      });

      const jsonText = response.text || "{}";
      const result = JSON.parse(jsonText);
      res.json({ success: true, analysis: result });
    } catch (error: any) {
      console.error("Error in AI Meta-Agent Debugger:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to perform AI analysis.",
      });
    }
  });

  // Simulated / Live Agent turn execution endpoint
  app.post("/api/agent/run-step", async (req, res) => {
    try {
      const { agent, incomingMessage, conversationHistory } = req.body;

      const ai = getAIClient();

      const systemPrompt = agent.systemPrompt || "You are an autonomous AI agent.";
      const role = agent.role || "Assistant";
      const tools = agent.tools || [];

      const prompt = `System Role: ${role}
System Instructions:
${systemPrompt}

Available Tools: ${tools.join(", ") || "None"}

Incoming Message / Context:
${JSON.stringify(incomingMessage || {}, null, 2)}

History:
${JSON.stringify(conversationHistory || [], null, 2)}

Perform your turn. Decide whether to call a tool, respond to the sender agent, delegate to another agent, or raise an error/request human intervention.

Return structured JSON with:
- action: "RESPONSE" | "TOOL_CALL" | "DELEGATE" | "ERROR" | "HUMAN_INTERCEPT"
- targetAgentId: optional target agent ID to send message to
- payload: string content or response
- toolName: optional tool being invoked
- toolArgs: optional tool arguments object
- statusMessage: brief log status message
- thinkingReasoning: internal monologue explanation`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              action: { type: Type.STRING },
              targetAgentId: { type: Type.STRING },
              payload: { type: Type.STRING },
              toolName: { type: Type.STRING },
              toolArgs: { type: Type.STRING },
              statusMessage: { type: Type.STRING },
              thinkingReasoning: { type: Type.STRING },
            },
            required: ["action", "payload", "statusMessage"],
          },
        },
      });

      const jsonText = response.text || "{}";
      const stepResult = JSON.parse(jsonText);
      res.json({ success: true, stepResult });
    } catch (error: any) {
      console.error("Error in Agent Run Step:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to execute agent step.",
      });
    }
  });

  // OpenTelemetry / JSON Trace Export
  app.post("/api/telemetry/export", (req, res) => {
    const { traceEvents, agents, scenarioTitle } = req.body;
    const otelData = {
      resourceSpans: [
        {
          resource: {
            attributes: [
              { key: "service.name", value: "AgentScope-Playground" },
              { key: "scenario.title", value: scenarioTitle || "MultiAgentRun" },
            ],
          },
          scopeSpans: [
            {
              scope: { name: "agentscope.tracer", version: "1.0.0" },
              spans: (traceEvents || []).map((ev: any, idx: number) => ({
                traceId: "4bf92f3577b34da6a3ce929d0e0e4736",
                spanId: `span_${idx + 100}`,
                name: `${ev.agentName || "Agent"}:${ev.eventType}`,
                startTimeUnixNano: (ev.timestamp || Date.now()) * 1000000,
                endTimeUnixNano: ((ev.timestamp || Date.now()) + 50) * 1000000,
                attributes: [
                  { key: "agent.id", value: ev.agentId },
                  { key: "event.severity", value: ev.severity },
                  { key: "log.message", value: ev.message },
                ],
              })),
            },
          ],
        },
      ],
    };

    res.setHeader("Content-Disposition", `attachment; filename="agentscope-trace-${Date.now()}.json"`);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(otelData, null, 2));
  });

  // Vite middleware setup for dev vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgentScope Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
