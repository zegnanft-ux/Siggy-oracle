import { useState, useEffect, useRef, useCallback } from "react";

const LOGO = "data:image/png;base64,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";
const GREEN = "brightness(0) invert(1) sepia(1) saturate(50) hue-rotate(70deg)";
const LED = GREEN + " drop-shadow(0 0 4px #39ff14) drop-shadow(0 0 8px #39ff14) drop-shadow(0 0 16px rgba(57,255,20,0.4))";
const LED_SM = GREEN + " drop-shadow(0 0 3px #39ff14) drop-shadow(0 0 6px rgba(57,255,20,0.5))";

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let id;
    const ps = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) ps.push({ x: Math.random()*c.width, y: Math.random()*c.height, r: Math.random()*2+0.5, dx: (Math.random()-0.5)*0.3, dy: (Math.random()-0.5)*0.2-0.1, o: Math.random()*0.35+0.1, p: Math.random()*Math.PI*2 });
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      ps.forEach(p => {
        p.x += p.dx; p.y += p.dy; p.p += 0.015;
        const o = p.o*(0.6+0.4*Math.sin(p.p));
        if(p.x<-10) p.x=c.width+10; if(p.x>c.width+10) p.x=-10;
        if(p.y<-10) p.y=c.height+10; if(p.y>c.height+10) p.y=-10;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(57,255,20,${o})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2);
        ctx.fillStyle=`rgba(57,255,20,${o*0.12})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1 }} />;
}

function SiggyCat({ sz = 140 }) {
  return (
    <div style={{ position:"relative", width:sz, height:sz, margin:"0 auto" }}>
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:sz*1.3,height:sz*1.3,borderRadius:"50%",background:"radial-gradient(circle,rgba(57,255,20,0.15) 0%,rgba(120,0,200,0.08) 50%,transparent 70%)",animation:"aura 3s ease-in-out infinite" }} />
      <svg viewBox="0 0 200 200" width={sz} height={sz} style={{ position:"relative",zIndex:2,filter:"drop-shadow(0 0 12px rgba(57,255,20,0.4))" }}>
        <ellipse cx="100" cy="140" rx="45" ry="35" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1.2" opacity="0.9" />
        <path d="M145 140Q170 110 155 80Q148 68 155 60" fill="none" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
        <path d="M145 140Q170 110 155 80Q148 68 155 60" fill="none" stroke="#39ff14" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <circle cx="100" cy="90" r="38" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1.2" />
        <polygon points="70,62 58,28 82,52" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1.2" />
        <polygon points="69,58 63,38 79,52" fill="#2d1b4e" opacity="0.6" />
        <polygon points="130,62 142,28 118,52" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1.2" />
        <polygon points="131,58 137,38 121,52" fill="#2d1b4e" opacity="0.6" />
        <ellipse cx="86" cy="92" rx="6" ry="7" fill="#0d0d1a" />
        <ellipse cx="114" cy="92" rx="6" ry="7" fill="#0d0d1a" />
        <ellipse cx="86" cy="92" rx="3" ry="6.5" fill="#39ff14" opacity="0.9"><animate attributeName="ry" values="6.5;2;6.5" dur="4s" repeatCount="indefinite" /></ellipse>
        <ellipse cx="114" cy="92" rx="3" ry="6.5" fill="#39ff14" opacity="0.9"><animate attributeName="ry" values="6.5;2;6.5" dur="4s" repeatCount="indefinite" /></ellipse>
        <circle cx="84" cy="89" r="1.5" fill="white" opacity="0.8" /><circle cx="112" cy="89" r="1.5" fill="white" opacity="0.8" />
        <polygon points="100,99 97,103 103,103" fill="#39ff14" opacity="0.5" />
        <path d="M94 106Q100 112 106 106" fill="none" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
        <line x1="78" y1="98" x2="55" y2="94" stroke="#39ff14" strokeWidth="0.6" opacity="0.35" />
        <line x1="78" y1="102" x2="55" y2="104" stroke="#39ff14" strokeWidth="0.6" opacity="0.35" />
        <line x1="122" y1="98" x2="145" y2="94" stroke="#39ff14" strokeWidth="0.6" opacity="0.35" />
        <line x1="122" y1="102" x2="145" y2="104" stroke="#39ff14" strokeWidth="0.6" opacity="0.35" />
        <ellipse cx="80" cy="168" rx="12" ry="8" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1" opacity="0.8" />
        <ellipse cx="120" cy="168" rx="12" ry="8" fill="#1a1a2e" stroke="#39ff14" strokeWidth="1" opacity="0.8" />
      </svg>
      <img src={LOGO} alt="" style={{ position:"absolute",top:"37%",left:"50%",transform:"translate(-50%,-50%)",width:sz*0.18,height:sz*0.18,objectFit:"contain",zIndex:3,filter:LED,animation:"led 2s ease-in-out infinite" }} />
    </div>
  );
}

function Avatar() {
  return (
    <div style={{ width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#0a0f0a,#1a1a2e)",border:"1px solid rgba(57,255,20,0.4)",display:"flex",alignItems:"center",justifyContent:"center",marginRight:8,flexShrink:0,marginTop:2,overflow:"hidden",boxShadow:"0 0 8px rgba(57,255,20,0.2)" }}>
      <img src={LOGO} alt="" style={{ width:18,height:18,objectFit:"contain",filter:LED_SM }} />
    </div>
  );
}

function Msg({ text, isUser }) {
  return (
    <div style={{ display:"flex",justifyContent:isUser?"flex-end":"flex-start",marginBottom:12,animation:"fadeIn 0.4s ease-out" }}>
      {!isUser && <Avatar />}
      <div style={{ maxWidth:"75%",padding:"12px 16px",borderRadius:isUser?"18px 18px 4px 18px":"18px 18px 18px 4px",
        background:isUser?"linear-gradient(135deg,rgba(57,255,20,0.15),rgba(57,255,20,0.08))":"linear-gradient(135deg,rgba(45,27,78,0.6),rgba(26,26,46,0.8))",
        border:isUser?"1px solid rgba(57,255,20,0.3)":"1px solid rgba(120,0,200,0.3)",
        color:isUser?"#c8ffc8":"#d4d0e0",fontSize:14,lineHeight:1.6,fontFamily:"'Crimson Text',Georgia,serif",
        boxShadow:isUser?"0 2px 12px rgba(57,255,20,0.1)":"0 2px 12px rgba(120,0,200,0.15)" }}>{text}</div>
    </div>
  );
}

function Typing({ text, onDone }) {
  const [d, setD] = useState("");
  const i = useRef(0), done = useRef(false);
  useEffect(() => {
    i.current=0; done.current=false; setD("");
    const iv = setInterval(() => {
      i.current += 2;
      if (i.current >= text.length) { setD(text); clearInterval(iv); if(!done.current){done.current=true; onDone?.();} }
      else setD(text.slice(0, i.current));
    }, 18);
    return () => clearInterval(iv);
  }, [text, onDone]);
  return <>{d}{d.length<text.length && <span style={{ display:"inline-block",width:6,height:16,background:"rgba(57,255,20,0.6)",marginLeft:2,animation:"blink 0.8s step-end infinite",verticalAlign:"text-bottom" }} />}</>;
}

function StreamMsg({ text, onDone }) {
  return (
    <div style={{ display:"flex",justifyContent:"flex-start",marginBottom:12,animation:"fadeIn 0.4s ease-out" }}>
      <Avatar />
      <div style={{ maxWidth:"75%",padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:"linear-gradient(135deg,rgba(45,27,78,0.6),rgba(26,26,46,0.8))",border:"1px solid rgba(120,0,200,0.3)",color:"#d4d0e0",fontSize:14,lineHeight:1.6,fontFamily:"'Crimson Text',Georgia,serif",boxShadow:"0 2px 12px rgba(120,0,200,0.15)" }}>
        <Typing text={text} onDone={onDone} />
      </div>
    </div>
  );
}

export default function App() {
  const [msgs, setMsgs] = useState([{ text:"ayo what's good \u{1F44B} I'm Siggy, the oracle cat of the dark forest. been guarding secrets all night so I'm lowkey tired but still gonna put you on game. ask me literally anything fam, I got 9 lives and all the answers \u{1F431}\u2728", isUser:false }]);
  const [inp, setInp] = useState("");
  const [phase, setPhase] = useState("idle");
  const [pending, setPending] = useState(null);
  const [err, setErr] = useState(null);
  const endRef = useRef(null);
  const hist = useRef([]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, phase, pending]);

  const ask = async (msg) => {
    hist.current = [...hist.current, { role:"user", content:msg }];
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: hist.current.slice(-10) }),
      });
      const data = await r.json();
      if (!r.ok || !data.reply) throw new Error(data.error || "no reply");
      hist.current = [...hist.current, { role:"assistant", content: data.reply }];
      setErr(null);
      return data.reply;
    } catch (e) {
      setErr("Siggy's connection to the spirit realm is having issues. Make sure the API key is set in Vercel environment variables.");
      return "ayo something's off with my mystical connection rn \u{1F480} the dark forest wifi acting up fr. try again in a sec fam";
    }
  };

  const send = async () => {
    const t = inp.trim(); if (!t || phase!=="idle") return;
    setMsgs(p=>[...p,{text:t,isUser:true}]); setInp(""); setPhase("loading");
    const reply = await ask(t);
    setPending(reply); setPhase("streaming");
  };

  const onDone = useCallback(() => {
    setPending(p => { if(p) setMsgs(m=>[...m,{text:p,isUser:false}]); return null; });
    setPhase("idle");
  }, []);

  const busy = phase !== "idle";

  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(180deg,#050508 0%,#0a0f0a 30%,#0d0a15 60%,#080510 100%)",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"fixed",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(13,40,13,0.4) 0%,transparent 60%)",pointerEvents:"none" }} />
      <div style={{ position:"fixed",inset:0,background:"radial-gradient(ellipse at 30% 80%,rgba(45,10,60,0.2) 0%,transparent 50%)",pointerEvents:"none" }} />
      <Particles />
      <div style={{ position:"relative",zIndex:2,maxWidth:640,margin:"0 auto",padding:"24px 16px",display:"flex",flexDirection:"column",minHeight:"100vh" }}>
        <div style={{ textAlign:"center",marginBottom:8 }}>
          <img src={LOGO} alt="Ritual" style={{ width:72,height:72,objectFit:"contain",filter:LED,animation:"float 4s ease-in-out infinite" }} />
        </div>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <h1 style={{ fontFamily:"'Cinzel Decorative','Cinzel',Georgia,serif",fontSize:"clamp(18px,4.5vw,28px)",fontWeight:700,color:"#39ff14",textShadow:"0 0 20px rgba(57,255,20,0.5),0 0 40px rgba(57,255,20,0.2),0 0 80px rgba(57,255,20,0.1)",letterSpacing:"0.15em",margin:0,lineHeight:1.3 }}>RITUAL SUMMONING<br/>TERMINAL</h1>
          <div style={{ width:120,height:1,background:"linear-gradient(90deg,transparent,rgba(57,255,20,0.5),transparent)",margin:"12px auto 0" }} />
        </div>
        <div style={{ marginBottom:16 }}>
          <SiggyCat sz={140} />
          <p style={{ textAlign:"center",fontFamily:"'Cinzel',Georgia,serif",color:"rgba(57,255,20,0.5)",fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",margin:"6px 0 0" }}>Siggy \u2022 Mystical Oracle Cat</p>
        </div>
        <div style={{ flex:1,background:"rgba(10,10,18,0.6)",border:"1px solid rgba(57,255,20,0.12)",borderRadius:16,padding:16,marginBottom:16,minHeight:260,maxHeight:"40vh",overflowY:"auto",boxShadow:"inset 0 0 40px rgba(0,0,0,0.4),0 0 30px rgba(57,255,20,0.05)",backdropFilter:"blur(8px)" }}>
          {msgs.map((m,i) => <Msg key={i} text={m.text} isUser={m.isUser} />)}
          {phase==="streaming" && pending && <StreamMsg text={pending} onDone={onDone} />}
          {phase==="loading" && (
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 0",animation:"fadeIn 0.3s ease-out" }}>
              <Avatar />
              <div style={{ fontFamily:"'Cinzel',Georgia,serif",color:"rgba(57,255,20,0.7)",fontSize:13,letterSpacing:"0.08em",fontStyle:"italic",display:"flex",alignItems:"center",gap:6 }}>
                Summoning Siggy
                <span style={{ display:"flex",gap:3 }}>
                  {[0,0.2,0.4].map(dl => <span key={dl} style={{ width:4,height:4,borderRadius:"50%",background:"#39ff14",animation:"bounce 1.4s ease-in-out infinite",animationDelay:dl+"s" }} />)}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        {err && <div style={{ background:"rgba(255,50,50,0.1)",border:"1px solid rgba(255,50,50,0.3)",borderRadius:8,padding:"8px 12px",marginBottom:12,color:"#ff6b6b",fontSize:12,fontFamily:"monospace" }}>{err}</div>}
        <div style={{ display:"flex",gap:10 }}>
          <div style={{ flex:1,borderRadius:12,background:"rgba(10,10,18,0.7)",border:"1px solid rgba(57,255,20,0.2)",boxShadow:"0 0 20px rgba(57,255,20,0.05)" }}>
            <input type="text" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask Siggy anything..." disabled={busy}
              style={{ width:"100%",padding:"14px 16px",background:"transparent",border:"none",outline:"none",color:"#c8ffc8",fontFamily:"'Crimson Text',Georgia,serif",fontSize:15,boxSizing:"border-box",opacity:busy?0.5:1 }} />
          </div>
          <button onClick={send} disabled={!inp.trim()||busy} style={{ width:48,height:48,borderRadius:12,border:"1px solid rgba(57,255,20,0.3)",
            background:inp.trim()&&!busy?"linear-gradient(135deg,rgba(57,255,20,0.2),rgba(57,255,20,0.1))":"rgba(10,10,18,0.5)",
            color:inp.trim()&&!busy?"#39ff14":"rgba(57,255,20,0.3)",cursor:inp.trim()&&!busy?"pointer":"default",
            display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s",flexShrink:0,
            boxShadow:inp.trim()&&!busy?"0 0 15px rgba(57,255,20,0.15)":"none" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="15" x2="9" y2="3"/><polyline points="3,8 9,2 15,8"/></svg>
          </button>
        </div>
        <p style={{ textAlign:"center",color:"rgba(57,255,20,0.2)",fontSize:10,fontFamily:"'Cinzel',Georgia,serif",letterSpacing:"0.15em",marginTop:16,textTransform:"uppercase" }}>Powered by Dark Forest Magic \u2726 Ritual Network</p>
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes aura{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1}50%{transform:translate(-50%,-50%) scale(1.12);opacity:0.7}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes led{0%,100%{opacity:0.85}50%{opacity:1}}
        *{box-sizing:border-box}body{margin:0;padding:0}
        input::placeholder{color:rgba(57,255,20,0.3)}input:disabled::placeholder{color:rgba(57,255,20,0.15)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(57,255,20,0.2);border-radius:4px}
      `}</style>
    </div>
  );
}
