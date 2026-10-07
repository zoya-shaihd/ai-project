import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

function generateFallbackStartupData(params: any) {
  const {
    startupName,
    ideaDescription,
    industry = "Technology & AI",
    country = "Global",
    budget = "$10,000 - $25,000",
    teamSize = "1-3 people",
    businessType = "B2B SaaS",
    targetCustomers = "Businesses and professionals",
  } = params;

  // Derive a name if blank
  const rawName = startupName && startupName.trim() !== "" ? startupName : null;
  const inferredName = rawName || (ideaDescription.split(" ").slice(0, 2).map(w => w.replace(/[^a-zA-Z]/g, "")).join("") + " Flow");
  const finalName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);

  // Industry specific insights
  let trend1 = "Exponential growth of self-service and automated tools within the sector.";
  let trend2 = "Increased adoption of customized customer onboarding mechanics.";
  let trend3 = "Focus on micro-targeted features over broad-scope platforms.";
  let opp1 = "Niche market entry with quick deployment and feedback loops.";
  let opp2 = "Leveraging cost-effective cloud-native architectures to scale.";
  let opp3 = "Partnerships with local micro-influencers and regional community hubs.";
  let challenge1 = "Customer acquisition cost optimization during early market entry.";
  let challenge2 = "Ensuring high retention rates for premium tier offerings.";
  let challenge3 = "Formulating a distinct brand voice amidst multi-channel marketing noise.";

  if (industry.includes("Tech") || industry.includes("AI")) {
    trend1 = "Adoption of hyper-focused generative AI agents for complex task automation.";
    trend2 = "Shift towards edge computing and lightweight models for lower latency.";
    trend3 = "Strict global standards on AI transparency and data safety compliance.";
    opp1 = "Building contextual workflow extensions for existing enterprise ecosystems.";
    opp2 = "Creating no-code/low-code integrations for non-technical operations teams.";
    opp3 = "Positioning as a highly secure alternative prioritizing privacy-first analytics.";
    challenge1 = "Managing model API query costs to secure strong unit margins.";
    challenge2 = "Overcoming customer inertia to adopt new tech tools.";
    challenge3 = "Continuous retraining and monitoring to prevent hallucinations.";
  } else if (industry.includes("Eco") || industry.includes("Green") || industry.includes("Consumer")) {
    trend1 = "Surge in customer preference for verified circular economy supply chains.";
    trend2 = "Stricter government mandates on carbon neutrality and material origins.";
    trend3 = "Micro-community support for local sustainable brands and direct-to-consumer models.";
    opp1 = "Developing hyper-transparent tracking dashboards for green metrics.";
    opp2 = "Providing seamless subscription-based eco refills to boost customer lifetime value.";
    opp3 = "Partnering with global sustainability non-profits for certified co-branding.";
    challenge1 = "Higher early-stage manufacturing and carbon-offset validation costs.";
    challenge2 = "Price sensitivity among non-enthusiast customer cohorts.";
    challenge3 = "Establishing consistent raw material suppliers matching quality specs.";
  } else if (industry.includes("Fintech") || industry.includes("Finance") || industry.includes("SaaS")) {
    trend1 = "Integration of open banking APIs facilitating frictionless transactions.";
    trend2 = "Demand for real-time cost-attribution tools for complex SaaS environments.";
    trend3 = "Stricter data encryption standards for multi-party transaction tracking.";
    opp1 = "Targeting freelance/solopreneur economies with customized tax preparation hooks.";
    opp2 = "Automating corporate expense reconciliation using contextual classification engine.";
    opp3 = "Formulating localized currency settlement workflows for micro-exporters.";
    challenge1 = "Navigating country-specific compliance and regulatory licensing.";
    challenge2 = "Earning customer trust for financial transactional security.";
    challenge3 = "Preventing churn in high-competition discount environments.";
  } else if (industry.includes("Health") || industry.includes("Wellness")) {
    trend1 = "Personalized metabolic tracking and hyper-tailored nutrition pathways.";
    trend2 = "Tele-health integration into daily micro-habit tracking apps.";
    trend3 = "Rise of preventative lifestyle tracking among younger millennial demographics.";
    opp1 = "Creating zero-friction voice logging workflows for daily nutrition entries.";
    opp2 = "Integrating with standard wearable APIs (Fitbit, Apple Watch) for real-time adjustments.";
    opp3 = "Partnering with workplace wellness benefits programs for enterprise pipelines.";
    challenge1 = "Maintaining continuous user engagement past the 3-month churn cycle.";
    challenge2 = "Ensuring clinical-grade data encryption and compliance.";
    challenge3 = "Differentiating from high-volume generic wellness apps in App Store.";
  }

  // Parse budget range for financial dynamic metrics
  let budgetNum = 25000;
  if (budget.includes("50,000")) budgetNum = 50000;
  else if (budget.includes("100,000")) budgetNum = 100000;
  else if (budget.includes("10,000")) budgetNum = 10000;

  const year1Rev = budgetNum * 3;
  const year2Rev = budgetNum * 8;
  const year3Rev = budgetNum * 20;

  return {
    isFallback: true,
    startupInfo: {
      name: finalName,
      tagline: `Next-gen ${industry} built for ${targetCustomers.toLowerCase()}.`,
      mission: `To seamlessly empower users by transforming complex ${industry.toLowerCase()} workflows into simple, automated, and powerful outcomes.`,
      vision: `To lead the transition to intelligent, highly contextual, and user-centric systems in the global ${industry.toLowerCase()} arena.`,
      logoPrompt: `A minimalist clean vector icon representing a stylized emblem of ${finalName}, featuring geometric lines, soft neon cyan accents, dark blue backdrop, modern luxury tech aesthetic.`
    },
    marketAnalysis: {
      marketSize: `$${(budgetNum * 0.0003 + 8).toFixed(1)} Billion`,
      marketGrowth: `+${(12.4 + Math.random() * 4).toFixed(1)}% CAGR`,
      industryTrend: [trend1, trend2, trend3],
      opportunities: [opp1, opp2, opp3],
      challenges: [challenge1, challenge2, challenge3],
      demandScore: Math.floor(78 + Math.random() * 15)
    },
    competitors: [
      {
        name: `Legacy${industry.split(" ")[0] || "Global"} Corp`,
        strengths: "Large existing customer base, enterprise relationship advantages, deep financial reserves.",
        weaknesses: "Slow feature development cycles, dated user interfaces, lacking personal contextualization.",
        pricing: "High premium subscription, opaque custom enterprise contracts only.",
        marketPosition: "Incumbent Leader"
      },
      {
        name: `${finalName.slice(0, 4)}Lite Solutions`,
        strengths: "Decent feature scope, low starting tier, active community boards.",
        weaknesses: "Poor scalability, lacks automated AI features, limited workflow integration options.",
        pricing: "$19 - $49 / month subscription plans.",
        marketPosition: "Niche Challenger"
      },
      {
        name: "General Automator Pro",
        strengths: "Broad feature base covering multiple industries, strong documentation library.",
        weaknesses: "Steep learning curve, not tailored for this specific sector, high churn among beginners.",
        pricing: "Usage-based tiers starting at $29/month.",
        marketPosition: "Horizontal Incumbent"
      }
    ],
    marketGaps: [
      `Absence of simple, frictionless contextual onboarding tailored for ${targetCustomers.toLowerCase()}.`,
      `Overly complex systems in legacy platforms that exclude medium and small scale operators.`
    ],
    customerPersona: {
      name: `Jordan the Pragmatic Operator`,
      age: "26 - 42",
      gender: "All genders",
      occupation: "Operations Lead / Lead Creator",
      income: "$65,000 - $125,000/yr",
      goals: [
        `Save at least 10+ hours weekly on high-friction administrative and organizing processes.`,
        `Build a secure, modern, and easily scalable system without hiring deep technical teams.`
      ],
      painPoints: [
        `Frustration with overly complex, bloated platforms that require lengthy training.`,
        `Lack of affordable, intelligent customized tools designed explicitly for their target use case.`
      ],
      buyingBehaviour: "Discovers solutions through focused professional communities (Reddit, ProductHunt, LinkedIn). Heavily relies on 14-day free trials, transparent public reviews, and frictionless setups."
    },
    financials: {
      estimatedInvestment: `$${budgetNum.toLocaleString()}`,
      monthlyExpenses: `$${Math.round(budgetNum * 0.08).toLocaleString()}`,
      revenueForecastYear1: `$${year1Rev.toLocaleString()}`,
      revenueForecastYear2: `$${year2Rev.toLocaleString()}`,
      revenueForecastYear3: `$${year3Rev.toLocaleString()}`,
      breakEvenMonths: 6,
      expectedProfitYear1: `$${Math.round(year1Rev * 0.4).toLocaleString()}`,
      roi: `${Math.round((year3Rev / budgetNum) * 100)}% over 3 years`,
      chartData: [
        { year: "Year 1", revenue: year1Rev, expenses: Math.round(year1Rev * 0.6), profit: Math.round(year1Rev * 0.4) },
        { year: "Year 2", revenue: year2Rev, expenses: Math.round(year2Rev * 0.45), profit: Math.round(year2Rev * 0.55) },
        { year: "Year 3", revenue: year3Rev, expenses: Math.round(year3Rev * 0.35), profit: Math.round(year3Rev * 0.65) }
      ]
    },
    mlPrediction: {
      successProbability: Math.floor(74 + Math.random() * 18),
      riskLevel: budgetNum > 50000 ? "Medium" : "Low",
      confidenceScore: 89,
      recommendation: `Strong recommendation to proceed. The target audience is actively looking for simplified, modern ${industry.toLowerCase()} utilities. Focus initially on building a pristine core workflow (MVP) for ${targetCustomers.toLowerCase()}, gather qualitative usage data, and validate pricing early before expanding feature scopes.`,
      featureImportance: [
        { feature: "Simplicity & UI Elegance", importance: 92 },
        { feature: "Core Automation Accuracy", importance: 85 },
        { feature: "Niche Audience Fit", importance: 78 },
        { feature: "Budget Resource Runway", importance: 64 },
        { feature: "Marketing organic channels", importance: 55 }
      ]
    },
    marketingStrategy: {
      instagramCaption: `Say goodbye to complex workflows! 🚀 Introducing ${finalName}—the ultimate ${industry.toLowerCase()} platform tailored explicitly for ${targetCustomers.toLowerCase()}. Experience beautiful, frictionless, and secure automation that scales with you. Tap the link in our bio to claim early-bird premium access! ✨ #${finalName.toLowerCase()} #startup #innovation #productivity`,
      linkedinPost: `We are thrilled to unveil ${finalName}, a platform born from a simple observation: modern teams are wasting valuable hours wrestling with complex, bloated legacy systems.\n\nOur custom-built ${industry} engine enables ${targetCustomers.toLowerCase()} to streamline operations, cut out high-friction manual entries, and focus purely on strategic execution.\n\nJoin us on our journey to make technology simpler, faster, and more empowering. Read our complete startup report below. #Productivity #Fintech #EnterpriseTools #SaaS`,
      facebookAd: `🔥 Attention ${targetCustomers}! Are you tired of bloated tools that take weeks to learn? Meet ${finalName}—your all-in-one smart system built to solve your operational bottleneck today. Click 'Sign Up' to start your 14-day premium trial today. No card required!`,
      seoKeywords: [
        `best ${industry.toLowerCase()} tools`,
        `how to automate ${industry.toLowerCase()} processes`,
        `${finalName.toLowerCase()} solution`,
        `efficient workflows for ${targetCustomers.toLowerCase()}`
      ],
      websiteHero: {
        heading: `Work smarter, not harder. Welcome to ${finalName}.`,
        subheading: `The elegant, high-performance platform designed explicitly to automate and scale your ${industry.toLowerCase()} processes.`,
        cta: "Start Free MVP Trial"
      }
    },
    businessPlan: {
      executiveSummary: `${finalName} is a high-growth startup tackling critical inefficiencies in ${industry.toLowerCase()} systems. By offering a high-contrast, modern, and context-driven workflow suite, we enable ${targetCustomers.toLowerCase()} to achieve massive time savings without expensive custom developer cycles.`,
      businessModel: "Value is created through self-service SaaS modules that deliver immediate onboarding validation. Capital is conserved by utilizing automated serverless architectures.",
      revenueModel: "Tiered monthly/annual subscription plans (Starter, Professional, and customized Enterprise packages).",
      pricingStrategy: "Value-based pricing starting with a competitive self-serve tier to drive organic product-led acquisition (PLG).",
      swot: {
        strengths: ["Hyper-focused customer persona fit", "Zero-friction onboarding flows", "Very low operational overhead using cloud services"],
        weaknesses: ["Early-stage brand visibility limitations", "Limited engineering size in first 3 months"],
        opportunities: ["Exploiting wide general customer dissatisfaction with bloated legacy software", "Integration partnerships with mainstream developer suites"],
        threats: ["Rapid adaptation of horizontal competitors", "Fluctuating digital customer acquisition channels"]
      },
      expansionPlan: [
        { phase: "Phase 1: Build Pristine Core MVP", details: "Deliver core features to first 50 beta participants, refine based on precise feedback." },
        { phase: "Phase 2: Scale Organic Acquisitions", details: "Leverage product-led growth mechanics, targeted newsletters, and industry partnerships." },
        { phase: "Phase 3: Global Feature Expansion", details: "Roll out advanced analytical overlays, API integrations, and secure team spaces." }
      ]
    },
    pitchDeckSlides: [
      { slideNumber: 1, title: "Introducing: " + finalName, bullets: [`Redefining ${industry} workflows`, "Built specifically for " + targetCustomers, "Intuitive, lightning-fast, and secure"] },
      { slideNumber: 2, title: "The High-Friction Problem", bullets: ["Incumbents are too complicated and expensive", "Teams waste hours doing basic tasks manual-style", "Small businesses are priced out of modern tech solutions"] },
      { slideNumber: 3, title: "Our Solution", bullets: ["A beautiful, simple, single-click interface", "Autonomous AI agents automating heavy-lifting", "Affordable self-serve pricing model"] },
      { slideNumber: 4, title: "The Market Scale", bullets: [`TAM of over ${(budgetNum * 0.0003 + 8).toFixed(1)} Billion globally`, "High growth velocity with annual interest expanding", "Our target slice of beachhead audience"] },
      { slideNumber: 5, title: "Business & Monetization", bullets: ["Subscription model ensuring highly predictable annual recurring revenue (ARR)", "High customer lifetime value (LTV) driven by essential features", "Product-Led-Growth (PLG) keeping client acquisition costs low"] },
      { slideNumber: 6, title: "Financial Trajectory", bullets: ["Break-even point hit within 6 months of launching", "Generous profit margins reaching up to 65% by Year 3", "Low capital requirement for initial launch"] },
      { slideNumber: 7, title: "Funding & Next Steps", bullets: [`Targeting $${budgetNum.toLocaleString()} seed round to scale engineering and marketing`, "Clear 6-month product release timeline", "Join us in reshaping the industry paradigm"] }
    ],
    finalReport: {
      overallScore: Math.floor(82 + Math.random() * 12),
      innovationScore: Math.floor(84 + Math.random() * 12),
      marketScore: Math.floor(80 + Math.random() * 12),
      competitionLevel: "Moderate",
      investmentEstimate: `$${budgetNum.toLocaleString()}`,
      finalRecommendation: `This startup represents an exceptionally strong opportunity. By building a simple, highly-focused platform, ${finalName} can capture substantial underserved segments of the ${industry.toLowerCase()} market. We highly recommend moving forward with a lean MVP development path.`
    }
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Startup Validation Analysis
  app.post("/api/analyze", async (req, res) => {
    const {
      startupName,
      ideaDescription,
      industry,
      country,
      budget,
      teamSize,
      businessType,
      targetCustomers,
    } = req.body;

    if (!ideaDescription) {
      return res.status(400).json({ error: "Idea description is required" });
    }

    // Check if API key is present and appears valid
    const hasApiKey = process.env.GEMINI_API_KEY && 
                      process.env.GEMINI_API_KEY.trim() !== "" && 
                      !process.env.GEMINI_API_KEY.includes("YOUR_API_KEY") &&
                      !process.env.GEMINI_API_KEY.includes("MY_GEMINI_API_KEY") &&
                      !process.env.GEMINI_API_KEY.includes("placeholder");

    if (!hasApiKey) {
      console.warn("No valid GEMINI_API_KEY found. Using smart customized offline fallback generator.");
      const fallbackData = generateFallbackStartupData(req.body);
      return res.json(fallbackData);
    }

    try {

      const prompt = `
        You are an expert AI Multi-Agent Startup Orchestrator. Validate and generate a complete business validation package for this startup concept.
        
        Startup Parameters:
        - Name: ${startupName || "Unnamed Startup"}
        - Idea: ${ideaDescription}
        - Industry: ${industry || "General"}
        - Country/Market: ${country || "Global"}
        - Budget: ${budget || "flexible"}
        - Team Size: ${teamSize || "1-3 people"}
        - Business Type: ${businessType || "B2B/B2C"}
        - Target Customers: ${targetCustomers || "General public"}

        You must generate a valid, structured JSON output matching the TypeScript interface specified below. Generate highly creative, realistic, and detailed business intelligence reports. Do not use generic placeholders. All content should feel fully realized and tailored exactly to this specific idea.

        CRITICAL SPEED REQUIREMENT: Write clean, punchy, and highly concise descriptions, bullet points, and captions. Do NOT output unnecessary fluff or filler text. Keep sentences short and professional to optimize for high-speed processing and minimal output tokens.

        Your response must be a single JSON object with the following structure:
        {
          "startupInfo": {
            "name": "The finalized or generated startup name (keep it to 1-3 words)",
            "tagline": "A punchy, memorable tagline (maximum 6 words)",
            "mission": "A clear inspiring mission statement (maximum 12 words)",
            "vision": "A grand 10-year vision statement (maximum 15 words)",
            "logoPrompt": "A highly descriptive, creative AI image generation prompt for a modern startup logo (maximum 15 words)"
          },
          "marketAnalysis": {
            "marketSize": "e.g., $12.5 Billion",
            "marketGrowth": "e.g., +14.2% CAGR",
            "industryTrend": [
              "Detailed trend 1 demonstrating momentum (maximum 12 words)",
              "Detailed trend 2 about technology or customer shifts (maximum 12 words)",
              "Detailed trend 3 about regulatory or global factors (maximum 12 words)"
            ],
            "opportunities": [
              "Specific market opportunity 1 (maximum 12 words)",
              "Specific market opportunity 2 (maximum 12 words)",
              "Specific market opportunity 3 (maximum 12 words)"
            ],
            "challenges": [
              "Critical market barrier 1 (maximum 12 words)",
              "Critical market barrier 2 (maximum 12 words)",
              "Critical market barrier 3 (maximum 12 words)"
            ],
            "demandScore": 85
          },
          "competitors": [
            {
              "name": "Competitor A (realistic or real competitor name)",
              "strengths": "What they do exceptionally well (maximum 12 words)",
              "weaknesses": "Their vulnerable spots or client complaints (maximum 12 words)",
              "pricing": "Their general price structure or model (maximum 6 words)",
              "marketPosition": "Leaders, incumbents, niche players, etc. (maximum 5 words)"
            },
            {
              "name": "Competitor B",
              "strengths": "What they do well (maximum 12 words)",
              "weaknesses": "What they lack (maximum 12 words)",
              "pricing": "Their pricing model (maximum 6 words)",
              "marketPosition": "Market segment they own (maximum 5 words)"
            },
            {
              "name": "Competitor C",
              "strengths": "Key advantage (maximum 12 words)",
              "weaknesses": "Limitation (maximum 12 words)",
              "pricing": "Price indicator (maximum 6 words)",
              "marketPosition": "Positioning strategy (maximum 5 words)"
            }
          ],
          "marketGaps": [
            "Market gap 1: Specific unmet need this startup exploits (maximum 12 words)",
            "Market gap 2: Specific customer pain point ignored by competitors (maximum 12 words)"
          ],
          "customerPersona": {
            "name": "e.g., Alex the Tech-Forward Professional (maximum 4 words)",
            "age": "e.g., 28-35",
            "gender": "e.g., All genders",
            "occupation": "e.g., Operations Manager (maximum 4 words)",
            "income": "e.g., $75,000 - $110,000/yr",
            "goals": [
              "Primary personal/business goal 1 (maximum 12 words)",
              "Primary personal/business goal 2 (maximum 12 words)"
            ],
            "painPoints": [
              "Specific daily pain point 1 (maximum 12 words)",
              "Specific daily pain point 2 (maximum 12 words)"
            ],
            "buyingBehaviour": "How they discover, evaluate, and purchase solutions (maximum 15 words)"
          },
          "financials": {
            "estimatedInvestment": "e.g., $50,000",
            "monthlyExpenses": "e.g., $4,200",
            "revenueForecastYear1": "e.g., $120,000",
            "revenueForecastYear2": "e.g., $340,000",
            "revenueForecastYear3": "e.g., $850,000",
            "breakEvenMonths": 8,
            "expectedProfitYear1": "e.g., $35,000",
            "roi": "e.g., 240% over 3 years",
            "chartData": [
              { "year": "Year 1", "revenue": 120000, "expenses": 85000, "profit": 35000 },
              { "year": "Year 2", "revenue": 340000, "expenses": 180000, "profit": 160000 },
              { "year": "Year 3", "revenue": 850000, "expenses": 320000, "profit": 530000 }
            ]
          },
          "mlPrediction": {
            "successProbability": 78,
            "riskLevel": "Medium / Low / High",
            "confidenceScore": 92,
            "recommendation": "A highly concise, actionable ML-driven recommendation (maximum 20 words)",
            "featureImportance": [
              { "feature": "Innovation Score", "importance": 88 },
              { "feature": "Market Growth Size", "importance": 74 },
              { "feature": "Competition Density", "importance": 65 },
              { "feature": "Budget Allocation", "importance": 52 },
              { "feature": "Team Capacity", "importance": 40 }
            ]
          },
          "marketingStrategy": {
            "instagramCaption": "Short premium social media caption with 1 hashtag (maximum 15 words)",
            "linkedinPost": "Professional short post explaining the problem and solution (maximum 25 words)",
            "facebookAd": "Compelling short ad hook and call-to-action (maximum 20 words)",
            "seoKeywords": [
              "primary keyword 1",
              "long-tail keyword 2",
              "buyer-intent keyword 3",
              "niche keyword 4"
            ],
            "websiteHero": {
              "heading": "A short extremely powerful hero heading (maximum 6 words)",
              "subheading": "A brief supporting subheading (maximum 12 words)",
              "cta": "Primary CTA button text (maximum 3 words)"
            }
          },
          "businessPlan": {
            "executiveSummary": "A very brief executive summary (maximum 20 words)",
            "businessModel": "How value is created (maximum 12 words)",
            "revenueModel": "Subscription, transactional, freemium, licensing, etc. (maximum 12 words)",
            "pricingStrategy": "Tiers and price points (maximum 12 words)",
            "swot": {
              "strengths": ["Strength 1 (maximum 6 words)", "Strength 2 (maximum 6 words)"],
              "weaknesses": ["Weakness 1 (maximum 6 words)", "Weakness 2 (maximum 6 words)"],
              "opportunities": ["Opportunity 1 (maximum 6 words)", "Opportunity 2 (maximum 6 words)"],
              "threats": ["Threat 1 (maximum 6 words)", "Threat 2 (maximum 6 words)"]
            },
            "expansionPlan": [
              { "phase": "Phase 1: Launch", "details": "Brief launch details (maximum 12 words)" },
              { "phase": "Phase 2: Scale", "details": "Brief scale details (maximum 12 words)" },
              { "phase": "Phase 3: Global", "details": "Brief global details (maximum 12 words)" }
            ]
          },
          "pitchDeckSlides": [
            { "slideNumber": 1, "title": "The Big Idea", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 2, "title": "The Problem", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 3, "title": "The Solution", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 4, "title": "Market Opportunity", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 5, "title": "Revenue Model", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 6, "title": "Financials", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] },
            { "slideNumber": 7, "title": "Funding Target", "bullets": ["Bullet 1 (max 8 words)", "Bullet 2 (max 8 words)", "Bullet 3 (max 8 words)"] }
          ],
          "finalReport": {
            "overallScore": 84,
            "innovationScore": 89,
            "marketScore": 82,
            "competitionLevel": "Moderate",
            "investmentEstimate": "$50,000",
            "finalRecommendation": "The ultimate brief verdict of the committee (maximum 20 words)"
          }
        }
      `;

      // Call the Gemini API to generate the highly detailed startup report
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response text from Gemini");
      }

      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini Analysis Error (Falling back to Smart Offline Generator):", error);
      try {
        const fallbackData = generateFallbackStartupData(req.body);
        res.json(fallbackData);
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to parse template or fallback: " + fallbackError.message });
      }
    }
  });

  // Serve static assets in development/production
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
