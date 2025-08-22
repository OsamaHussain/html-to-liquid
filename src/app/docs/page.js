export const metadata = {
  title: "Product Documentation | HTML → Liquid Converter",
  description:
    "Professional guide for setup, configuration, usage, outputs, and Shopify installation (OpenAI-only).",
};

export default function DocsPage() {
  return (
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "40px 20px",
        color: "#eaeaea",
      }}
    >
      <h1
        style={{
          fontSize: "34px",
          fontWeight: 900,
          marginBottom: 10,
          background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        HTML → Shopify Liquid Converter — Documentation
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 28 }}>
        Last updated: 17 Aug 2025
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2>Overview</h2>
        <p>
          This application converts clean HTML into Shopify-ready Liquid
          sections using OpenAI for AI-assisted generation, then applies light
          post-processing for schema alignment and safety.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Processing Flow</h2>
        <div
          style={{
            background: "#0b1220",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 16,
            overflowX: "auto",
          }}
          aria-label="Conversion flow diagram"
        >
          <svg
            width="1400"
            height="260"
            viewBox="0 0 1400 260"
            role="img"
            aria-labelledby="flowTitle flowDesc"
          >
            <title id="flowTitle">HTML to Shopify Liquid Conversion Flow</title>
            <desc id="flowDesc">
              Input HTML and section name go through provider (OpenAI) check, AI
              conversion, post-processing, page type detection, file generation,
              packaging, and download for Shopify install.
            </desc>

            {/* Styles */}
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#00ff88" />
              </linearGradient>
            </defs>

            {/* Boxes */}
            <g
              fontFamily="Inter, system-ui, Arial"
              fontSize="12"
              fill="#0b1220"
            >
              {/* 1. Input */}
              <rect
                x="20"
                y="30"
                width="180"
                height="70"
                rx="10"
                fill="#e5f7ff"
                stroke="#00d4ff"
              />
              <foreignObject x="20" y="30" width="180" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Input</strong>
                  <br />
                  HTML + Assets
                  <br />
                  Section name (kebab-case)
                </div>
              </foreignObject>

              {/* 2. Provider */}
              <rect
                x="230"
                y="30"
                width="210"
                height="70"
                rx="10"
                fill="#f1fff7"
                stroke="#00ff88"
              />
              <foreignObject x="230" y="30" width="210" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Provider</strong>
                  <br />
                  OpenAI (configured)
                </div>
              </foreignObject>

              {/* 3. Health Check */}
              <rect
                x="470"
                y="30"
                width="210"
                height="70"
                rx="10"
                fill="#fffaf0"
                stroke="#ffd166"
              />
              <foreignObject x="470" y="30" width="210" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>API Health Check</strong>
                  <br />
                  OpenAI must be reachable
                </div>
              </foreignObject>

              {/* 4. AI Conversion */}
              <rect
                x="710"
                y="30"
                width="210"
                height="70"
                rx="10"
                fill="#eef2ff"
                stroke="#7aa2ff"
              />
              <foreignObject x="710" y="30" width="210" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>AI Conversion</strong>
                  <br />
                  HTML → Liquid section + schema
                </div>
              </foreignObject>

              {/* 5. Post-processing */}
              <rect
                x="950"
                y="30"
                width="210"
                height="70"
                rx="10"
                fill="#f3f4f6"
                stroke="#94a3b8"
              />
              <foreignObject x="950" y="30" width="210" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Post-processing</strong>
                  <br />
                  Quotes & consistency checks
                </div>
              </foreignObject>

              {/* 6. Page Type Detection */}
              <rect
                x="1190"
                y="30"
                width="190"
                height="70"
                rx="10"
                fill="#ecfeff"
                stroke="#06b6d4"
              />
              <foreignObject x="1190" y="30" width="190" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Page Type</strong>
                  <br />
                  page | product | collection | blog
                </div>
              </foreignObject>

              {/* 7. File Generation */}
              <rect
                x="230"
                y="150"
                width="300"
                height="70"
                rx="10"
                fill="#f0f9ff"
                stroke="#38bdf8"
              />
              <foreignObject x="230" y="150" width="300" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Generate Files</strong>
                  <br />
                  sections/name.liquid
                  <br />
                  templates/type.name.json
                  <br />
                  layout/theme.liquid (optional)
                </div>
              </foreignObject>

              {/* 8. Packaging */}
              <rect
                x="560"
                y="150"
                width="240"
                height="70"
                rx="10"
                fill="#fef3c7"
                stroke="#f59e0b"
              />
              <foreignObject x="560" y="150" width="240" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>ZIP Packaging</strong>
                  <br />
                  Shopify folder structure + README
                </div>
              </foreignObject>

              {/* 9. Download/Install */}
              <rect
                x="830"
                y="150"
                width="260"
                height="70"
                rx="10"
                fill="#dcfce7"
                stroke="#22c55e"
              />
              <foreignObject x="830" y="150" width="260" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    padding: 10,
                    color: "#0b1220",
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontFamily: "Inter, system-ui, Arial",
                  }}
                >
                  <strong>Download & Install</strong>
                  <br />
                  Upload to Shopify, assign templates
                </div>
              </foreignObject>
            </g>

            {/* Arrows */}
            <g stroke="url(#g)" strokeWidth="2" fill="none">
              <line x1="200" y1="65" x2="230" y2="65" />
              <line x1="440" y1="65" x2="470" y2="65" />
              <line x1="680" y1="65" x2="710" y2="65" />
              <line x1="920" y1="65" x2="950" y2="65" />
              <line x1="1160" y1="65" x2="1190" y2="65" />

              <line x1="1285" y1="100" x2="1285" y2="150" />
              <line x1="530" y1="185" x2="560" y2="185" />
              <line x1="800" y1="185" x2="830" y2="185" />
              <line x1="1285" y1="150" x2="530" y2="150" />
            </g>
          </svg>
        </div>
        <p style={{ marginTop: 12, opacity: 0.9 }}>
          The system validates OpenAI, converts HTML → Liquid, applies safety
          checks, detects the page type, generates Shopify-ready files, and
          packages everything into a ZIP for installation.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Key Capabilities</h2>
        <ul>
          <li>
            Generates a single <code>sections/&lt;name&gt;.liquid</code> with
            complete <code>{"{% schema %}"}</code>
          </li>
          <li>
            Creates matching JSON templates under <code>templates/</code> based
            on page type detection
          </li>
          <li>
            Optional <code>layout/theme.liquid</code> when HEAD assets are
            extracted
          </li>
          <li>
            Filename validation and auto-correction to Shopify conventions
            (kebab-case)
          </li>
          <li>
            Post-processing: quote escaping, schema/file consistency checks
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>System Requirements</h2>
        <ul>
          <li>Node.js 18+ and npm</li>
          <li>
            OpenAI API key: <code>OPENAI_API_KEY</code>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Quick Start</h2>
        <ol>
          <li>
            Clone the repository and <code>cd</code> into the project folder
          </li>
          <li>
            Install dependencies: <code>npm install</code>
          </li>
          <li>
            Create <code>.env.local</code> with:
            <ul>
              <li>
                <code>OPENAI_API_KEY=...</code>
              </li>
            </ul>
          </li>
          <li>
            Start the development server: <code>npm run dev</code> → open{" "}
            <code>http://localhost:3000</code>
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Configuration</h2>
        <p>
          Edit <code>src/app/api/config/conversion.config.js</code>:
        </p>
        <ul>
          <li>
            <code>CONVERSION_MODE</code>: <code>OPENAI_FIRST</code>
          </li>
          <li>
            <code>SIZE_LIMIT</code> (lines): Above this threshold, large inputs
            may be deferred
          </li>
          <li>
            <code>WAIT_TIME</code> (ms): Delay applied when size limit is
            exceeded
          </li>
          <li>
            <code>ENABLE_LOGS</code>: Console logging toggle
          </li>
        </ul>
        <p style={{ opacity: 0.9 }}>
          The API validates OpenAI before conversion. If the precheck or
          conversion fails, the request is blocked with a clear error response.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Usage (App)</h2>
        <ol>
          <li>Paste or upload HTML</li>
          <li>
            Enter a Shopify section name in kebab-case (e.g.,{" "}
            <code>hero-banner</code>)
          </li>
          <li>Click “Convert to Liquid” and download the generated ZIP</li>
        </ol>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Usage (API)</h2>
        <ul>
          <li>
            POST <code>/api/convert-html</code> — uses OpenAI as configured
          </li>
          <li>
            POST <code>/api/convert-html-openai</code> — force OpenAI
          </li>
        </ul>
        <p>
          <strong>Request body</strong>:
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >{`{
  "htmlContent": "<html>...your markup...</html>",
  "fileName": "section-name"
}`}</pre>
        <p>
          <strong>Response (key fields)</strong>:
        </p>
        <ul>
          <li>
            <code>liquidContent</code>, <code>jsonTemplate</code>,{" "}
            <code>headContent</code>
          </li>
          <li>
            <code>validation</code>: metadata about checks
          </li>
          <li>
            <code>shopifyInfo</code>: paths, injected blocks, processing notes
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Output Artifacts</h2>
        <ul>
          <li>
            <code>sections/&lt;name&gt;.liquid</code> — includes schema,
            comments, and safe quote handling
          </li>
          <li>
            <code>templates/&lt;type&gt;.&lt;name&gt;.json</code> — where type ∈
            page | product | collection | blog, based on detection
          </li>
          <li>
            <code>layout/theme.liquid</code> — generated only if HEAD resources
            are extracted; included for integration
          </li>
          <li>
            <code>README.txt</code> — summary and installation instructions
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Shopify Installation</h2>
        <ol>
          <li>
            Upload files to your theme: <code>sections/</code> and{" "}
            <code>templates/</code>
          </li>
          <li>
            If provided, review <code>layout/theme.liquid</code>:
            <ul>
              <li>
                Backup your current file, then replace with the generated
                version if adopting provided assets
              </li>
              <li>
                This file consolidates styles/scripts to ensure parity with
                source HTML
              </li>
            </ul>
          </li>
          <li>
            Assign the generated template (Page/Product/Collection/Blog) in
            Shopify Admin
          </li>
          <li>Customize content via Theme Editor (blocks and settings)</li>
        </ol>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Project Structure (high level)</h2>
        <ul>
          <li>
            <code>src/app/api/convert-html</code> and{" "}
            <code>convert-html-openai</code>: API routes
          </li>
          <li>
            <code>src/utils/</code>: helpers for schema/validation and ZIP
            generation
          </li>
          <li>
            <code>src/components/</code>: UI (editor, upload, popups, etc.)
          </li>
          <li>
            Configs: <code>next.config.mjs</code>,{" "}
            <code>postcss.config.mjs</code>, <code>jsconfig.json</code>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Hosting & Deployment (DigitalOcean)</h2>
        <ul>
          <li>Hosting: DigitalOcean Droplet (Ubuntu/Linux server)</li>
          <li>Runtime: Node.js 18+, Next.js 15</li>
          <li>
            Process manager: PM2 app name <code>html-to-liquid</code>
          </li>
          <li>
            Deploy script: <code>.scripts/deploy.sh</code>
          </li>
        </ul>
        <p style={{ opacity: 0.9 }}>
          The deploy script pulls the latest <code>master</code>, hard-resets
          the working tree, installs dependencies, builds the app, and restarts
          the PM2 process.
        </p>
        <p>
          <strong>One-command deploy (run on the server)</strong>:
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >{`bash .scripts/deploy.sh`}</pre>
        <p>
          <strong>PM2 management</strong>:
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >{`pm2 status
pm2 logs html-to-liquid
pm2 restart html-to-liquid`}</pre>
        <p style={{ opacity: 0.85 }}>
          Environment variables are read from <code>.env.local</code> (e.g.,{" "}
          <code>OPENAI_API_KEY</code>). Ensure they are present on the server
          before deploying.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>Invalid filename</strong>: Use lowercase kebab-case (e.g.,{" "}
            <code>feature-grid</code>)
          </li>
          <li>
            <strong>OpenAI check failed (503)</strong>: Ensure your{" "}
            <code>OPENAI_API_KEY</code> is present and valid
          </li>
          <li>
            <strong>Large input</strong>: Consider splitting HTML or increasing{" "}
            <code>SIZE_LIMIT</code>/<code>WAIT_TIME</code>
          </li>
          <li>
            <strong>Overly complex HTML</strong>: Simplify structure or convert
            in parts
          </li>
          <li>
            <strong>theme.liquid differences</strong>: Always backup; test in
            preview before publishing
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Security & Data</h2>
        <ul>
          <li>Your HTML is sent to OpenAI for conversion</li>
        </ul>
      </section>

      <footer style={{ opacity: 0.65 }}>
        For implementation support, contact your development team.
      </footer>
    </main>
  );
}
