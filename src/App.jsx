import React, { useState } from "react";
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  CheckCircle2,
  Sparkles,
  Download,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Info,
  Clock,
  Play,
  Bell,
  X,
} from "lucide-react";


const NAVY = "#1E2761";
const ICE = "#CADCFC";
const AMBER = "#D9822B";
const BG = "#F6F8FC";
const MUTED = "#5B6B8C";
const TEXT = "#222B45";

const screens = [
  "signup",
  "detected",
  "parentContact",
  "parentNotified",
  "otp",
  "permissions",
  "confirmed",
  "hub",
  "timeline",
  "rightsConfirm",
  "home",
];

function Toggle({ on, onClick, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      style={{
        width: 44,
        height: 26,
        borderRadius: 14,
        background: on ? AMBER : "#d7dce8",
        position: "relative",
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background .18s ease",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.3)",
          transition: "left .18s ease",
          display: "block",
        }}
      />
    </button>
  );
}

function Card({ children, white, style, ...rest }) {
  return (
    <div
      {...rest}
      style={{
        background: white ? "#fff" : BG,
        border: white ? "1px solid #e8ecf6" : "none",
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style, ...rest }) {
  const base = {
    display: "block",
    width: "100%",
    textAlign: "center",
    borderRadius: 12,
    padding: "13px 14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 6,
    border: "none",
    transition: "transform .08s ease, opacity .15s ease",
  };
  const variants = {
    primary: { background: NAVY, color: "#fff" },
    amber: { background: AMBER, color: "#fff" },
    secondary: { background: "transparent", color: NAVY, border: `1px solid ${NAVY}` },
  };
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

function IconCircle({ children, big, tone = ICE }) {
  const size = big ? 76 : 60;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: tone,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
        color: NAVY,
      }}
    >
      {children}
    </div>
  );
}

function TopBar({ tag, title, step, total, onBack }) {
  return (
    <div
      style={{
        background: NAVY,
        color: "#fff",
        padding: "16px 18px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {onBack && (
        <button
          aria-label="Go back"
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,.12)",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={16} />
        </button>
      )}
      <div style={{ flex: 1 }}>
        {tag && (
          <div style={{ fontSize: 10.5, fontWeight: 700, color: ICE, letterSpacing: 1, marginBottom: 2 }}>
            {tag}
          </div>
        )}
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{title}</div>
      </div>
      {step && (
        <div style={{ fontSize: 11, color: ICE, fontWeight: 600 }}>
          {step}/{total}
        </div>
      )}
    </div>
  );
}

function WhyRow({ label, desc, on, onToggle, why, whyOpen, setWhyOpen, id }) {
  return (
    <div style={{ borderBottom: "1px solid #e8ecf6", padding: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: TEXT }}>{label}</div>
          <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>{desc}</div>
        </div>
        <Toggle on={on} onClick={onToggle} label={label} />
      </div>
      <button
        onClick={() => setWhyOpen(whyOpen === id ? null : id)}
        style={{
          background: "none",
          border: "none",
          color: NAVY,
          fontSize: 11.5,
          fontWeight: 700,
          padding: 0,
          marginTop: 6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Info size={12} /> Why we ask
      </button>
      {whyOpen === id && (
        <div
          style={{
            fontSize: 12,
            color: MUTED,
            background: BG,
            borderRadius: 10,
            padding: "10px 12px",
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {why}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [i, setI] = useState(0);
  const [whyOpen, setWhyOpen] = useState(null);
  const [perms, setPerms] = useState({
    recs: true,
    ads: false,
    location: false,
    comments: false,
  });
  const [toast, setToast] = useState(null);

  const go = (name) => setI(screens.indexOf(name));
  const screen = screens[i];
  const back = i > 0 ? () => setI(i - 1) : null;

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const permMeta = [
    {
      id: "recs",
      label: "Personalised recommendations",
      desc: "Uses watch history to suggest videos",
      why: "We look at what Anaya's watched to surface more of what she likes — nothing is shared outside her account.",
    },
    {
      id: "ads",
      label: "Ad personalisation",
      desc: "Uses activity to choose which ads show",
      why: "Off by default for under-18 accounts. Turning this on lets ads be based on viewing activity instead of being generic.",
    },
    {
      id: "location",
      label: "Location access",
      desc: "Local-language and nearby content",
      why: "Only approximate location (city-level), never exact GPS. Used to suggest content in Anaya's language and region.",
    },
    {
      id: "comments",
      label: "Comments & public activity",
      desc: "Post comments, likes visible to others",
      why: "This makes Anaya's activity visible to other users. Most parents leave this off until their child is a bit older.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: TEXT,
      }}
    >
      <div
        style={{
          width: 380,
          minHeight: 720,
          maxHeight: 720,
          background: "#fff",
          borderRadius: 34,
          boxShadow: "0 30px 60px rgba(15,21,51,.35)",
          overflow: "hidden",
          position: "relative",
          border: "8px solid #111",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {toast && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              background: NAVY,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: 20,
              zIndex: 20,
              boxShadow: "0 6px 16px rgba(0,0,0,.25)",
            }}
          >
            {toast}
          </div>
        )}

        {/* SIGNUP */}
        {screen === "signup" && (
          <>
            <TopBar tag="STEP 1 OF 6" title="Sign up" />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle big>
                <Play size={30} fill={NAVY} color={NAVY} />
              </IconCircle>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>Create your account</h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                Just a couple of details to get started.
              </p>
              <Card white style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6 }}>NAME</div>
                  <div style={{ border: "1px solid #e0e4f0", borderRadius: 10, padding: 12, fontSize: 14 }}>
                    Anaya Sharma
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6 }}>DATE OF BIRTH</div>
                  <div style={{ border: "1px solid #e0e4f0", borderRadius: 10, padding: 12, fontSize: 14 }}>
                    14 / 03 / 2012
                  </div>
                </div>
              </Card>
              <Btn onClick={() => go("detected")}>Continue</Btn>
            </div>
          </>
        )}

        {/* DETECTED */}
        {screen === "detected" && (
          <>
            <TopBar tag="STEP 2 OF 6" title="We noticed something" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle>
                <ShieldCheck size={28} />
              </IconCircle>
              <div
                style={{
                  display: "inline-block",
                  background: ICE,
                  color: NAVY,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              >
                UNDER 18 DETECTED
              </div>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>
                Let's keep this account extra safe
              </h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                Because Anaya is under 18, a parent needs to approve how her data is used. It's
                quick, and it's what India's data protection law (the DPDP Act) requires.
              </p>
              <Card style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>
                  Starting now, in "Minimal Data Mode"
                </div>
                <div style={{ fontSize: 11.5, color: MUTED }}>
                  No ad personalisation · no location use · comments off — until a parent
                  approves.
                </div>
              </Card>
              <Btn onClick={() => go("parentContact")}>Notify my parent</Btn>
              <Btn variant="secondary" onClick={() => go("parentContact")}>
                Add a parent's number
              </Btn>
            </div>
          </>
        )}

        {/* PARENT CONTACT */}
        {screen === "parentContact" && (
          <>
            <TopBar tag="STEP 3 OF 6" title="Parent's contact" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto" }}>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>
                Who's your parent or guardian?
              </h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                We'll send them a quick, secure request to review and approve your privacy
                settings.
              </p>
              <Card white>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6 }}>
                  PARENT'S MOBILE NUMBER
                </div>
                <div style={{ border: "1px solid #e0e4f0", borderRadius: 10, padding: 12, fontSize: 14 }}>
                  +91 98765 43210
                </div>
              </Card>
              <Card white>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6 }}>
                  RELATIONSHIP
                </div>
                <div style={{ border: "1px solid #e0e4f0", borderRadius: 10, padding: 12, fontSize: 14 }}>
                  Mother
                </div>
              </Card>
              <Btn onClick={() => go("parentNotified")}>Send request</Btn>
            </div>
          </>
        )}

        {/* PARENT NOTIFIED */}
        {screen === "parentNotified" && (
          <>
            <TopBar tag="ON PARENT'S PHONE" title="Rekha gets notified" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle big>
                <Bell size={28} />
              </IconCircle>
              <h1 style={{ fontSize: 18, color: NAVY, margin: "0 0 12px" }}>
                SMS to +91 98765 43210
              </h1>
              <Card white style={{ textAlign: "left" }}>
                <p style={{ fontSize: 13.5, margin: 0, lineHeight: 1.5 }}>
                  <b>YouTube:</b> Anaya (14) wants to use YouTube. Tap to review and approve what
                  data can be used — takes under a minute. Reply STOP to decline.
                </p>
              </Card>
              <p style={{ fontSize: 10.5, color: MUTED, textAlign: "center", marginTop: 14, lineHeight: 1.4 }}>
                In the real product this arrives as SMS + push, with a secure one-tap link. Tap
                below to simulate opening it.
              </p>
              <Btn variant="amber" onClick={() => go("otp")}>
                Open parent request →
              </Btn>
            </div>
          </>
        )}

        {/* OTP */}
        {screen === "otp" && (
          <>
            <TopBar tag="VERIFYING IT'S REALLY YOU" title="Confirm with OTP" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle>
                <KeyRound size={26} />
              </IconCircle>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>
                Enter the code we sent
              </h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                We sent a 4-digit code to +91 98765 43210 to confirm you're Anaya's parent.
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "22px 0" }}>
                {["4", "8", "1", "2"].map((d, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 42,
                      height: 52,
                      border: `2px solid ${ICE}`,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 700,
                      color: NAVY,
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <Btn onClick={() => go("permissions")}>Verify</Btn>
            </div>
          </>
        )}

        {/* PERMISSIONS */}
        {screen === "permissions" && (
          <>
            <TopBar tag="FAMILY PRIVACY HUB" title="Review & approve" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto" }}>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>
                What can Anaya's account use?
              </h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 14px" }}>
                Turn each of these on or off. You can change your mind anytime, and every change
                is saved to Anaya's Trust Timeline.
              </p>
              <Card white style={{ paddingTop: 4, paddingBottom: 4 }}>
                {permMeta.map((p) => (
                  <WhyRow
                    key={p.id}
                    id={p.id}
                    label={p.label}
                    desc={p.desc}
                    why={p.why}
                    on={perms[p.id]}
                    onToggle={() => setPerms((s) => ({ ...s, [p.id]: !s[p.id] }))}
                    whyOpen={whyOpen}
                    setWhyOpen={setWhyOpen}
                  />
                ))}
              </Card>
              <Btn
                onClick={() => {
                  flash("Choices saved to Trust Timeline");
                  go("confirmed");
                }}
              >
                Confirm my choices
              </Btn>
            </div>
          </>
        )}

        {/* CONFIRMED */}
        {screen === "confirmed" && (
          <>
            <TopBar tag="ALL SET" title="Consent recorded" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle big tone="#DCF3E4">
                <CheckCircle2 size={32} color="#1E7A46" />
              </IconCircle>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>Thanks, Rekha</h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                Anaya's account now reflects your choices. This is the first entry on her Trust
                Timeline — you'll see every future change here too.
              </p>
              <Card style={{ textAlign: "left" }}>
                {permMeta.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #e8ecf6",
                      fontSize: 13,
                    }}
                  >
                    <span>{p.label}</span>
                    <span style={{ fontWeight: 700, color: perms[p.id] ? NAVY : MUTED }}>
                      {perms[p.id] ? "On" : "Off"}
                    </span>
                  </div>
                ))}
              </Card>
              <Btn onClick={() => go("hub")}>Go to Family Privacy Hub</Btn>
            </div>
          </>
        )}

        {/* HUB */}
        {screen === "hub" && (
          <>
            <TopBar tag="REKHA'S ACCOUNT" title="Family Privacy Hub" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto" }}>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>Anaya's account</h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 14px" }}>
                Manage consent, review data, or make a request — anytime.
              </p>

              <Card
                white
                onClick={() => go("timeline")}
                style={{ cursor: "pointer", border: `1px solid ${ICE}` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Clock size={18} color={NAVY} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY }}>
                        Trust Timeline
                      </div>
                      <div style={{ fontSize: 11.5, color: MUTED }}>
                        3 entries · 1 upcoming milestone
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color={MUTED} />
                </div>
              </Card>

              <Card white>
                {permMeta.slice(0, 2).map((p) => (
                  <WhyRow
                    key={p.id}
                    id={"hub-" + p.id}
                    label={p.label}
                    desc={p.desc}
                    why={p.why}
                    on={perms[p.id]}
                    onToggle={() => setPerms((s) => ({ ...s, [p.id]: !s[p.id] }))}
                    whyOpen={whyOpen}
                    setWhyOpen={setWhyOpen}
                  />
                ))}
              </Card>

              <Card white onClick={() => go("rightsConfirm")} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Download size={16} color={MUTED} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>Download or view Anaya's data</div>
                      <div style={{ fontSize: 11.5, color: MUTED }}>Your access right under DPDP</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color={MUTED} />
                </div>
              </Card>
              <Card white onClick={() => go("rightsConfirm")} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Trash2 size={16} color={MUTED} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>Request data deletion</div>
                      <div style={{ fontSize: 11.5, color: MUTED }}>Your erasure right under DPDP</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color={MUTED} />
                </div>
              </Card>

              <Btn variant="secondary" onClick={() => go("home")}>
                Back to Anaya's app view
              </Btn>
            </div>
          </>
        )}

        {/* TRUST TIMELINE — new screen, signature idea */}
        {screen === "timeline" && (
          <>
            <TopBar tag="NEW" title="Anaya's Trust Timeline" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto" }}>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 16px" }}>
                Every consent decision, in one place — so nothing about Anaya's data ever happens
                without a record you can see.
              </p>

              <div style={{ position: "relative", paddingLeft: 22 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 6,
                    top: 6,
                    bottom: 6,
                    width: 2,
                    background: "#e0e4f0",
                  }}
                />
                {[
                  {
                    date: "Today",
                    title: "Initial consent given",
                    detail: "Recommendations on · Ads, location, comments off",
                    color: NAVY,
                  },
                  {
                    date: "Today",
                    title: "Parent identity verified",
                    detail: "Confirmed via OTP to +91 98765 43210",
                    color: NAVY,
                  },
                  {
                    date: "Today",
                    title: "Account flagged as minor",
                    detail: "Self-declared DOB placed account in Minimal Data Mode",
                    color: MUTED,
                  },
                ].map((e, idx) => (
                  <div key={idx} style={{ position: "relative", marginBottom: 18 }}>
                    <div
                      style={{
                        position: "absolute",
                        left: -22,
                        top: 3,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: e.color,
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 2px #e0e4f0",
                      }}
                    />
                    <div style={{ fontSize: 10.5, color: MUTED, fontWeight: 700, marginBottom: 2 }}>
                      {e.date}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{e.title}</div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>{e.detail}</div>
                  </div>
                ))}
              </div>

              <Card style={{ background: "#FBF0E1", border: "1px solid #f0dcb8" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Sparkles size={18} color="#8a5a1f" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#8a5a1f", marginBottom: 3 }}>
                      Upcoming milestone · in 3 months
                    </div>
                    <div style={{ fontSize: 12, color: "#8a5a1f", lineHeight: 1.5 }}>
                      Anaya turns 16. We'll suggest easing comments access — you'll get a
                      one-tap prompt to approve, adjust, or leave things as they are. Nothing
                      changes unless you say so.
                    </div>
                  </div>
                </div>
              </Card>

              <Btn variant="secondary" onClick={() => go("hub")}>
                Back to Privacy Hub
              </Btn>
            </div>
          </>
        )}

        {/* RIGHTS CONFIRM */}
        {screen === "rightsConfirm" && (
          <>
            <TopBar title="Request submitted" onBack={back} />
            <div style={{ flex: 1, padding: "22px 20px", overflowY: "auto", textAlign: "center" }}>
              <IconCircle big>
                <ShieldCheck size={30} />
              </IconCircle>
              <h1 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>Request received</h1>
              <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.45, margin: "0 0 18px" }}>
                We'll process this within the timeline required under the DPDP Act, and this
                request is now logged on Anaya's Trust Timeline. We'll notify you by SMS and
                email once it's done.
              </p>
              <Btn onClick={() => go("hub")}>Back to Family Privacy Hub</Btn>
            </div>
          </>
        )}

        {/* HOME */}
        {screen === "home" && (
          <>
            <div style={{ padding: "14px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 800, color: "#e02020", fontSize: 19, display: "flex", alignItems: "center", gap: 6 }}>
                <Play size={18} fill="#e02020" color="#e02020" /> YouTube
              </div>
              <Bell size={18} color={MUTED} />
            </div>
            <div style={{ flex: 1, padding: "8px 20px 20px", overflowY: "auto" }}>
              <div
                style={{
                  background: "#FBF0E1",
                  border: "1px solid #f0dcb8",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 12,
                  color: "#8a5a1f",
                  marginBottom: 16,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  Recommendations are on because your parent approved it. Ads & location stay
                  off.
                </span>
              </div>
              {[
                ["NCERT Physics — Laws of Motion, simplified", "EduSpark · 1.2M views"],
                ["10-min desk workout for study breaks", "MoveDaily · 340K views"],
                ["How volcanoes actually work", "Curiosity Lab · 890K views"],
              ].map(([title, meta], idx) => (
                <div key={idx} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      background: "#e9edf6",
                      borderRadius: 10,
                      height: 90,
                      marginBottom: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: MUTED,
                      fontSize: 11,
                    }}
                  >
                    Video thumbnail
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{meta}</div>
                </div>
              ))}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => go("signup")}
                  style={{
                    background: "none",
                    border: "none",
                    color: NAVY,
                    fontWeight: 700,
                    fontSize: 12.5,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  ↺ Restart prototype
                </button>
              </div>
            </div>
          </>
        )}

        {/* progress dots */}
        {screen !== "home" && (
          <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "0 0 12px" }}>
            {screens.slice(0, 7).map((s, idx) => (
              <span
                key={s}
                style={{
                  width: idx === Math.min(i, 6) ? 16 : 6,
                  height: 6,
                  borderRadius: 4,
                  background: idx <= i && idx < 7 ? AMBER : "#d7dce8",
                  transition: "all .15s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
