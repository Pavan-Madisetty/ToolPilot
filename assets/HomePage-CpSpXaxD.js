import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{U as t,W as n,a as r,c as i,i as a,l as o,nt as s,o as c,q as l,s as u,u as d}from"./vendor-react-CYF9cNId.js";import{n as f,t as p}from"./vendor-ui-D7ThFfvz.js";import{a as m,i as h,l as g,s as _,t as v,u as y}from"./index-BFoSER0b.js";import{n as b,t as x}from"./userStore-vBjxi6AA.js";import{t as S}from"./ToolCard-Z7U1AsUy.js";var C=e(s(),1),w=t(),T={hidden:{opacity:0,y:32},visible:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}}},E={hidden:{},visible:{transition:{staggerChildren:.07,delayChildren:.1}}},D={hidden:{opacity:0,y:24,scale:.97},visible:{opacity:1,y:0,scale:1,transition:{duration:.45,ease:[.22,1,.36,1]}}},O=[{icon:u,title:`Privacy First`,description:`All processing happens in your browser. No data ever leaves your device. We have zero tracking, zero ads, zero analytics.`,color:`#10b981`,bg:`rgba(16, 185, 129, 0.08)`,border:`rgba(16, 185, 129, 0.2)`},{icon:a,title:`Lightning Fast`,description:`Optimized for performance with Lighthouse score 95+. Instant results with no server round-trips. Everything runs locally.`,color:`#f59e0b`,bg:`rgba(245, 158, 11, 0.08)`,border:`rgba(245, 158, 11, 0.2)`},{icon:r,title:`Works Offline`,description:`Full PWA support — install ToolPilot on your device and use all 500+ tools without an internet connection.`,color:`var(--text-link)`,bg:`rgba(79, 70, 229, 0.08)`,border:`rgba(79, 70, 229, 0.2)`}],k={"@context":`https://schema.org`,"@type":`WebSite`,name:`ToolPilot`,url:`https://toolpilot.app`,description:`500+ free browser tools for finance, developer, PDF, image, text and more.`,potentialAction:{"@type":`SearchAction`,target:{"@type":`EntryPoint`,urlTemplate:`https://toolpilot.app/search?q={search_term_string}`},"query-input":`required name=search_term_string`}};function A(){let e=m(e=>e.setIsOpen),{favorites:t}=x(),{history:r}=b(),[a,s]=(0,C.useState)(v[0]?.key||`finance`),u=(0,C.useCallback)(()=>e(!0),[e]),A=r.slice(0,6).map(e=>y[e.toolId]).filter(Boolean),j=t.map(e=>y[e.toolId]).filter(Boolean);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(n,{children:[(0,w.jsx)(`title`,{children:`ToolPilot — 500+ Free Online Tools for Finance, Developer, PDF & More`}),(0,w.jsx)(`meta`,{name:`description`,content:`ToolPilot offers 500+ free browser tools — EMI calculators, JSON formatters, PDF tools, image compressors, text utilities, and more. No signup. No tracking. Works offline.`}),(0,w.jsx)(`meta`,{name:`keywords`,content:`free online tools, emi calculator, json formatter, pdf tools, image compressor, text tools, developer tools`}),(0,w.jsx)(`link`,{rel:`canonical`,href:`https://toolpilot.app/`}),(0,w.jsx)(`meta`,{property:`og:type`,content:`website`}),(0,w.jsx)(`meta`,{property:`og:url`,content:`https://toolpilot.app/`}),(0,w.jsx)(`meta`,{property:`og:title`,content:`ToolPilot — 500+ Free Online Tools`}),(0,w.jsx)(`meta`,{property:`og:description`,content:`500+ free browser tools. No signup. No tracking. Works offline.`}),(0,w.jsx)(`meta`,{property:`og:image`,content:`https://toolpilot.app/og-image.png`}),(0,w.jsx)(`meta`,{property:`og:site_name`,content:`ToolPilot`}),(0,w.jsx)(`meta`,{name:`twitter:card`,content:`summary_large_image`}),(0,w.jsx)(`meta`,{name:`twitter:title`,content:`ToolPilot — 500+ Free Online Tools`}),(0,w.jsx)(`meta`,{name:`twitter:description`,content:`500+ free browser tools. No signup. No tracking. Works offline.`}),(0,w.jsx)(`meta`,{name:`twitter:image`,content:`https://toolpilot.app/og-image.png`}),(0,w.jsx)(`script`,{type:`application/ld+json`,children:JSON.stringify(k)})]}),(0,w.jsxs)(`main`,{id:`main-content`,className:`homepage`,children:[(0,w.jsx)(f,{children:j.length>0&&(0,w.jsxs)(p.section,{className:`section container`,"aria-labelledby":`favorites-heading`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4},children:[(0,w.jsx)(`div`,{className:`section__header`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`h2`,{id:`favorites-heading`,className:`section__title`,children:[(0,w.jsx)(c,{size:20,"aria-hidden":`true`,className:`section__title-icon`,style:{color:`#f59e0b`}}),`Your Favorites`]}),(0,w.jsx)(`p`,{className:`section__subtitle`,children:`Tools you've starred for quick access`})]})}),(0,w.jsx)(p.div,{className:`tools-grid`,variants:E,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-50px`},children:j.map(e=>(0,w.jsx)(S,{tool:e},e.id))})]})}),(0,w.jsxs)(`section`,{className:`section container`,"aria-labelledby":`workspace-tools-heading`,children:[(0,w.jsxs)(p.div,{className:`section__header`,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-80px`},variants:T,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h2`,{id:`workspace-tools-heading`,className:`section__title`,children:`Workspace Categories`}),(0,w.jsx)(`p`,{className:`section__subtitle`,children:`Select a category to explore secure, browser-based productivity tools`})]}),(0,w.jsxs)(l,{to:`/search`,className:`section__view-all`,"aria-label":`Browse all tools index`,children:[`Search index `,(0,w.jsx)(d,{size:16,"aria-hidden":`true`})]})]}),(0,w.jsx)(`div`,{className:`workspace-tabs-container`,children:(0,w.jsxs)(`div`,{className:`workspace-tabs`,role:`tablist`,"aria-label":`Tool modules`,children:[(0,w.jsxs)(`button`,{type:`button`,onClick:()=>s(`popular`),className:`workspace-tab ${a===`popular`?`workspace-tab--active`:``}`,"aria-selected":a===`popular`,role:`tab`,children:[(0,w.jsx)(`span`,{className:`workspace-tab__emoji`,"aria-hidden":`true`,children:`🔥`}),(0,w.jsx)(`span`,{className:`workspace-tab__name`,children:`Popular Tools`})]}),v.map(e=>{let t=a===e.key;return(0,w.jsxs)(`button`,{type:`button`,onClick:()=>s(e.key),className:`workspace-tab ${t?`workspace-tab--active`:``}`,"aria-selected":t,role:`tab`,children:[(0,w.jsx)(`span`,{className:`workspace-tab__emoji`,"aria-hidden":`true`,children:h(e.key)}),(0,w.jsx)(`span`,{className:`workspace-tab__name`,children:e.name})]},e.key)})]})}),(0,w.jsx)(p.div,{className:`tools-grid mt-6`,variants:E,initial:`hidden`,animate:`visible`,children:(a===`popular`?_.slice(0,12):g[a]||[]).map(e=>(0,w.jsx)(S,{tool:e},e.id))},a)]}),(0,w.jsxs)(`section`,{className:`section container`,"aria-labelledby":`features-heading`,children:[(0,w.jsx)(p.div,{className:`section__header section__header--center`,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-80px`},variants:T,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h2`,{id:`features-heading`,className:`section__title`,children:`Why ToolPilot?`}),(0,w.jsx)(`p`,{className:`section__subtitle`,children:`Built with your privacy and performance in mind`})]})}),(0,w.jsx)(p.div,{className:`features-grid`,variants:E,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-60px`},children:O.map(e=>(0,w.jsxs)(p.div,{className:`feature-card`,variants:D,whileHover:{y:-6,scale:1.02},style:{"--feature-color":e.color,"--feature-bg":e.bg,"--feature-border":e.border},children:[(0,w.jsx)(`div`,{className:`feature-card__icon-wrap`,"aria-hidden":`true`,children:(0,w.jsx)(e.icon,{size:24})}),(0,w.jsx)(`h3`,{className:`feature-card__title`,children:e.title}),(0,w.jsx)(`p`,{className:`feature-card__desc`,children:e.description})]},e.title))})]}),(0,w.jsx)(f,{children:A.length>0&&(0,w.jsxs)(p.section,{className:`section container`,"aria-labelledby":`recent-heading`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4},children:[(0,w.jsx)(`div`,{className:`section__header`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`h2`,{id:`recent-heading`,className:`section__title`,children:[(0,w.jsx)(o,{size:20,"aria-hidden":`true`,className:`section__title-icon`}),`Recently Used`]}),(0,w.jsx)(`p`,{className:`section__subtitle`,children:`Pick up where you left off`})]})}),(0,w.jsx)(p.div,{className:`tools-grid tools-grid--compact`,variants:E,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-50px`},children:A.map(e=>(0,w.jsx)(S,{tool:e,compact:!0},e.id))})]})}),(0,w.jsx)(`section`,{className:`cta-banner`,"aria-labelledby":`cta-heading`,children:(0,w.jsxs)(p.div,{className:`cta-banner__inner container`,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-80px`},variants:T,children:[(0,w.jsx)(`h2`,{id:`cta-heading`,className:`cta-banner__title`,children:`Ready to explore 500+ tools?`}),(0,w.jsx)(`p`,{className:`cta-banner__desc`,children:`All free. All private. All right here in your browser.`}),(0,w.jsxs)(`button`,{type:`button`,onClick:u,className:`cta-banner__btn`,id:`cta-search-btn`,"aria-label":`Search for tools`,children:[(0,w.jsx)(i,{size:18,"aria-hidden":`true`}),`Search Tools`]})]})})]}),(0,w.jsx)(`style`,{children:`
        /* ── Workspace Header ──────────────────── */
        .workspace-header {
          position: relative;
          overflow: hidden;
          padding: 3.5rem 1.5rem 2.5rem;
          background: var(--bg-base);
          text-align: center;
          border-bottom: 1px solid var(--border-subtle);
        }
        .workspace-header__pattern {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, var(--border-default) 1px, transparent 0);
          background-size: 32px 32px;
          opacity: 0.3;
          pointer-events: none;
        }
        .workspace-header__content {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .workspace-header__top-row {
          display: flex; justify-content: center;
        }
        .workspace-header__badge {
          display: inline-flex; align-items: center; gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          background: rgba(79, 70, 229, 0.08);
          border: 1px solid rgba(79, 70, 229, 0.15);
          border-radius: 9999px;
          color: var(--text-link);
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .workspace-header__title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800;
          line-height: 1.2;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin: 0;
        }
        .workspace-header__desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.5;
          margin: 0;
        }
        .workspace-header__search-wrap { width: 100%; max-width: 500px; }
        .workspace-header__search-bar {
          display: flex; align-items: center; gap: 0.6rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }
        .workspace-header__search-bar:hover {
          border-color: var(--border-focus);
          box-shadow: var(--shadow-md), 0 0 0 3px rgba(79, 70, 229, 0.08);
        }
        .workspace-header__search-bar:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }
        .workspace-header__search-icon { color: var(--text-tertiary); flex-shrink: 0; }
        .workspace-header__search-placeholder {
          flex: 1;
          text-align: left;
          color: var(--text-tertiary);
          font-size: 0.875rem;
        }
        .workspace-header__search-kbd {
          padding: 0.15rem 0.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          white-space: nowrap;
        }

        /* ── Sections ─────────────────────────── */
        .section { padding: 4rem 1.5rem; }
        .section--alt { background: var(--bg-surface); }
        .container { max-width: 1280px; margin: 0 auto; }

        .section__header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 2rem; gap: 1rem;
          flex-wrap: wrap;
        }
        .section__header--center { justify-content: center; text-align: center; }
        .section__title {
          font-size: 1.75rem; font-weight: 700;
          color: var(--text-primary); margin: 0 0 0.25rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .section__title-icon { color: var(--text-secondary); }
        .section__subtitle { font-size: 0.95rem; color: var(--text-secondary); margin: 0; }
        .section__view-all {
          display: inline-flex; align-items: center; gap: 0.3rem;
          color: var(--text-link); font-size: 0.9rem; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          transition: gap 0.2s ease;
        }
        .section__view-all:hover { gap: 0.5rem; }

        /* ── Workspace Tabs ────────────────────── */
        .workspace-tabs-container {
          width: 100%;
          border-bottom: 1px solid var(--border-default);
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .workspace-tabs-container::-webkit-scrollbar {
          display: none;
        }
        .workspace-tabs {
          display: flex;
          gap: 0.5rem;
          padding-inline: 0.25rem;
          min-width: max-content;
        }
        .workspace-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          border: 1.5px solid transparent;
          background: transparent;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }
        .workspace-tab:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }
        .workspace-tab--active {
          color: var(--text-link);
          background: rgba(79, 70, 229, 0.08);
          border-color: rgba(79, 70, 229, 0.15);
          font-weight: 600;
        }
        .workspace-tab__emoji {
          font-size: 1.1rem;
        }
        .module-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.25rem;
          background: var(--bg-elevated);
          border: 1px solid var(--accent, var(--border-default));
          border-color: var(--border, var(--border-default));
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .module-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--bg);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .module-card:hover::before { opacity: 1; }
        .module-card:hover { border-color: var(--accent); box-shadow: var(--shadow-md); }
        .module-card__icon-wrap {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 10px;
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          position: relative;
          z-index: 1;
        }
        .module-card__emoji { line-height: 1; }
        .module-card__body { flex: 1; min-width: 0; position: relative; z-index: 1; }
        .module-card__name {
          font-size: 0.95rem; font-weight: 600;
          color: var(--text-primary); margin: 0 0 0.15rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .module-card__desc {
          font-size: 0.78rem; color: var(--text-secondary);
          margin: 0 0 0.35rem; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .module-card__count {
          font-size: 0.72rem; font-weight: 600;
          color: var(--accent); text-transform: uppercase; letter-spacing: 0.04em;
        }
        .module-card__arrow {
          flex-shrink: 0; color: var(--text-tertiary);
          transition: transform 0.2s ease, color 0.2s ease;
          position: relative; z-index: 1;
        }
        .module-card:hover .module-card__arrow { transform: translateX(3px); color: var(--accent); }

        /* ── Tools Grid ──────────────────────── */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.85rem;
        }
        .tools-grid--compact {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .tool-card {
          display: flex; align-items: flex-start; gap: 0.85rem;
          padding: 1rem 1.1rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .tool-card:hover { border-color: var(--border-focus); box-shadow: var(--shadow-md); }
        .tool-card__icon {
          flex-shrink: 0; width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; font-weight: 700;
        }
        .tool-card__content { flex: 1; min-width: 0; }
        .tool-card__header { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.2rem; }
        .tool-card__name {
          font-size: 0.9rem; font-weight: 600;
          color: var(--text-primary); margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tool-card__badge {
          font-size: 0.65rem; font-weight: 700;
          padding: 0.1rem 0.4rem; border-radius: 4px;
          text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;
        }
        .tool-card__badge--new { background: rgba(16,185,129,0.12); color: #10b981; }
        .tool-card__badge--popular { background: rgba(245,158,11,0.12); color: #f59e0b; }
        .tool-card__desc {
          font-size: 0.8rem; color: var(--text-secondary);
          margin: 0 0 0.3rem; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tool-card__module {
          font-size: 0.7rem; color: var(--text-tertiary);
          text-transform: capitalize; font-weight: 500;
        }
        .tool-card--compact .tool-card__icon { width: 34px; height: 34px; font-size: 0.95rem; }
        .tool-card--compact .tool-card__name { font-size: 0.85rem; }

        /* ── Features ────────────────────────── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .feature-card {
          padding: 2rem 1.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--feature-border, var(--border-default));
          border-radius: 16px;
          transition: all 0.25s ease;
        }
        .feature-card:hover { box-shadow: var(--shadow-lg); }
        .feature-card__icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--feature-bg);
          color: var(--feature-color);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
        }
        .feature-card__title {
          font-size: 1.1rem; font-weight: 700;
          color: var(--text-primary); margin: 0 0 0.6rem;
        }
        .feature-card__desc {
          font-size: 0.9rem; color: var(--text-secondary);
          line-height: 1.65; margin: 0;
        }

        /* ── CTA Banner ──────────────────────── */
        .cta-banner {
          padding: 5rem 1.5rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .cta-banner__inner { position: relative; z-index: 1; }
        .cta-banner__title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800; color: #fff; margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
        }
        .cta-banner__desc {
          font-size: 1.1rem; color: rgba(255,255,255,0.75); margin: 0 0 2rem;
        }
        .cta-banner__btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: #fff; color: #1e3a8a;
          border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .cta-banner__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
        .cta-banner__btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* ── Responsive ──────────────────────── */
        @media (max-width: 640px) {
          .workspace-header { padding: 2.5rem 1rem 1.5rem; }
          .modules-grid { grid-template-columns: 1fr; }
          .tools-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .section__header { flex-direction: column; align-items: flex-start; }
        }
      `})]})}export{A as default};