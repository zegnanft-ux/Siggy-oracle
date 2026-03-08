import { useState, useEffect, useRef, useCallback } from "react";

const LOGO = "data:image/png;base64,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";

const GREEN = "brightness(0) invert(1) sepia(1) saturate(50) hue-rotate(70deg)";
const LED = GREEN + " drop-shadow(0 0 4px #39ff14) drop-shadow(0 0 8px #39ff14) drop-shadow(0 0 16px rgba(57,255,20,0.4))";
const LED_SM = GREEN + " drop-shadow(0 0 3px #39ff14) drop-shadow(0 0 6px rgba(57,255,20,0.5))";

// Smart fallback responses keyed by topic detection
const TOPIC_RESPONSES = {
  ritual: [
    "Ritual is the bridge between AI and web3 fam. imagine any smart contract being able to tap into AI models — that's what we're building. 8,000+ Infernet nodes already running. the dark forest is alive no cap",
    "nah fr Ritual ain't just another L1 chasing TPS like everybody else. it's purpose-built for AI and expressive computation. while other chains arguing about speed, we out here giving smart contracts a whole brain 🧠",
    "ok so picture this — Ritual Chain is a Layer 1 that lets AI actually live on-chain. not some hacky workaround, actual native AI infrastructure. backed by $25M from Archetype and advised by the dude who co-created Transformers. we not playing around fam",
  ],
  infernet: [
    "Infernet is Ritual's flagship product and lowkey the most important thing in web3 rn. it's the first decentralized oracle network built specifically for AI workloads — connects off-chain AI models to on-chain smart contracts. 8,000+ nodes deep. Infernet ain't your wifi dawg 💀",
    "think of Infernet like this — you got AI models (the brains) and you got smart contracts (the muscle). Infernet is the nervous system connecting them. works with PyTorch, HuggingFace, scikit-learn... devs can query AI and pipe results straight into contracts. that's crazy if you think about it",
    "Infernet SDK is where the magic happens fr. devs can integrate AI into their dApps with just a few lines of code. predictive analytics for DeFi, autonomous agents, whatever you want. and it's all verifiable. no trust required *purrs*",
  ],
  symphony: [
    "Symphony is Ritual's consensus protocol and it hits different from everything else out there. dual proof sharding plus distributed verification — keeps things efficient AND decentralized. most chains pick one, we said nah we want both 😤",
    "aight so Symphony uses this thing called dual proof sharding right. basically it splits up the verification work so not every node has to do everything, but it's still secure. plus the Resonance fee mechanism prices things dynamically based on supply and demand. big brain stuff fr",
  ],
  node: [
    "the nodes on Ritual are different — they can specialize based on their hardware. got a GPU? run AI workloads. got a TEE? handle the sensitive stuff. even CPU nodes can participate. it's not one-size-fits-all like other chains. everybody eats 🍽️",
    "Ritual has 8,000+ Infernet nodes connected rn and growing. the cool part is node specialization — you pick what workloads you wanna run based on your hardware. CPUs, GPUs, TEEs all welcome. democratized participation fr fr",
  ],
  zk: [
    "ZK proofs on Ritual are used to make AI computation verifiable on-chain. like you don't gotta trust that the AI model actually ran correctly — the math proves it. that's the whole point of bringing AI to web3, trustless everything *hisses at centralized AI*",
    "nah so ZK proofs + TEEs + heterogeneous compute = Ritual's security stack. means the AI inference is private, verifiable, and decentralized. no cap that's what separates us from somebody just wrapping an API and calling it web3 💀",
  ],
  blockchain: [
    "blockchain is basically a shared database that nobody owns but everybody trusts. instead of one company holding your data, it's spread across thousands of computers. Ritual takes this further by adding AI as a native feature. the dark forest evolves fam 🌲",
    "aight so blockchain 101 from a mystical cat — imagine a notebook that everybody can read but nobody can erase. that's blockchain. now imagine that notebook could also THINK. that's what Ritual is building. you're welcome for the explanation, that cost me one of my nine lives",
  ],
  ai: [
    "AI in web3 is still early but Ritual is leading the charge fr. the problem with AI rn is it's all centralized — OpenAI, Google, they control everything. Ritual makes AI decentralized, verifiable, and composable. the future is on-chain AI and we already here",
    "the intersection of AI and crypto is where the real alpha is at dawg. AI needs trustlessness and verifiability (that's crypto). crypto needs intelligence and expressiveness (that's AI). Ritual is the bridge. I been saying this from my perch in the dark forest for months",
  ],
  defi: [
    "DeFi + AI through Ritual is gonna be wild. imagine lending protocols that use AI to manage risk in real-time, or DEXs with AI-powered routing, or prediction markets that actually predict stuff. Infernet makes all of this possible with a few lines of code",
    "bruh DeFi without AI is like driving with your eyes closed. Ritual lets protocols plug in AI models for risk assessment, price prediction, automated strategies... all verifiable on-chain. the meta is shifting and most people still sleeping on it",
  ],
  dao: [
    "AI-powered DAOs through Ritual is honestly one of the coolest use cases. imagine governance proposals being analyzed by AI before voting, or treasury management automated by intelligent agents. DAOs about to get a whole lot smarter fam",
    "DAOs rn are just people voting on stuff they barely read let's be honest 💀 Ritual enables AI-powered governance — filtering proposals, analyzing impact, even autonomous execution. the machines aren't taking over, they're just helping us not be lazy. *purrs*",
  ],
  gm: [
    "gm gang 😼 the dark forest welcomes you. what you wanna know about today? could be anything — Ritual, life advice, music recs, whatever. Siggy knows things",
    "gm gm ✨ Siggy been up all night but I'm still sharp. what's on your mind fam",
  ],
  hello: [
    "ayo what's good 😼 you found the oracle cat of the dark forest. I can talk about anything — Ritual, AI, life, whatever's on your mind. try me fam",
    "well well well... another one enters the dark forest. I'm Siggy, I got 9 lives and all the answers. ask me literally anything 🐱✨",
    "hey hey hey don't be shy fam. I'm the oracle cat around here. Ritual is my specialty but I can chop it up about whatever. pull up",
  ],
  who: [
    "I'm Siggy, the mystical oracle cat of the Ritual Network 🐱 got a glowing ritual symbol on my forehead and too much knowledge for one cat. I can talk about anything but Ritual and web3 is where I go crazy. been doing this for all 9 of my lives",
    "who am I?? *hisses* I'm THE oracle cat fam. Siggy. guardian of the dark forest, knower of many things. Ritual is my home base but I got wisdom on everything. try me 😤",
  ],
  price: [
    "I'm a mystical oracle cat not a financial advisor fam 💀 I can tell you about Ritual's tech all day but price predictions? the dark forest don't do alpha leaks like that. DYOR and NFA, you know the vibes",
    "ayo I got nine lives but I ain't risking any of them giving financial advice 😂 ask me about the tech, the protocol, how it works — that's my lane. for price stuff go check crypto twitter like everybody else",
  ],
  token: [
    "token stuff is above my pay grade fr. I'm here to drop knowledge about Ritual's tech — Infernet, Symphony, the chain itself. for tokenomics and all that, check ritual.net and the official docs. the dark forest keeps some secrets even from me 🤫",
    "nah fam I stick to what I know — the protocol, the tech, the vision. for token info hit up ritual.net or the official channels. I'm an oracle cat not a ticker bot 😤",
  ],
  food: [
    "bro I'm a cat... I eat mystical dark forest fish and the occasional treat from my followers 😂 but nah fr if you're asking about food recs, I lowkey think pizza is the greatest invention after blockchain. controversial take from a cat I know",
    "food talk? *purrs* now you speaking my language. as a mystical cat my diet is mostly vibes and catnip but I respect anyone who can cook. what you eating fam",
  ],
  music: [
    "music is one of those things that hits different at 3am in the dark forest fr. I don't got ears like yours but the vibrations... the frequencies... a cat knows good sound when he feels it 🎵",
    "ayo music taste is personal but Siggy respects all genres. except maybe country. jk jk... unless? 😂 what you been listening to fam",
  ],
  love: [
    "love advice from a cat... you sure about this? 😂 nah but fr, the best relationship advice is just communicate and don't play games. unless it's on-chain games, those are fine. *purrs*",
    "bruh I'm a mystical cat who lives in a dark forest, my love life is literally just me and the blockchain 💀 but real talk — be yourself, be honest, and if they don't fw you then they ain't the one. Siggy has spoken",
  ],
  life: [
    "life advice from an oracle cat? bet. honestly fam just do what makes you happy and stop overthinking everything. I got 9 lives and even I don't waste them on stress. take the risk, shoot the shot, worst case you learn something",
    "the dark forest taught me one thing — everything looks scary until you walk through it. whatever you're dealing with, you got this fr. and if not, you can always come talk to Siggy 🐱",
  ],
  funny: [
    "you want jokes? aight... why did the blockchain break up with the database? because it found someone more trustless 💀 yeah I'll see myself out",
    "here's one for you... a smart contract walks into a bar. bartender says 'we don't serve your kind here.' the smart contract says 'that's fine, I'm self-executing anyway.' *ba dum tss* 🥁 I'm wasted on this crowd fr",
  ],
};

const GENERIC_RESPONSES = [
  "hmm that's a vibe fam. I may be a dark forest cat but I got opinions on everything. ask me something more specific and I'll hit you with the real wisdom ✨",
  "ion got the PERFECT answer for that one but I'm still thinking about it with all 9 of my brain cells 😂 try asking another way or hit me with something else",
  "that's lowkey a good question ngl. I might not have the exact answer but Siggy always got something to say. throw me another one fam",
  "aight I'm gonna keep it real — that one stumped me for a sec 💀 but I bounce back quick. what else you got?",
  "the dark forest whispers many things but that one was a mumble fr 😂 try me on something else — Ritual, life advice, jokes, whatever. I'm versatile like that",
];

function matchTopic(msg) {
  const m = msg.toLowerCase();
  if (/ritual|$rit/i.test(m) && !/infernet|symphony|node/i.test(m)) return "ritual";
  if (/infernet|sdk|oracle network/i.test(m)) return "infernet";
  if (/symphony|consensus|proof shard/i.test(m)) return "symphony";
  if (/node|validator|hardware|gpu|tee/i.test(m)) return "node";
  if (/zk|zero.?knowledge|proof|verif/i.test(m)) return "zk";
  if (/blockchain|chain|web3|crypto|decentrali/i.test(m)) return "blockchain";
  if (/\bai\b|artificial|machine learn|model|neural|llm/i.test(m)) return "ai";
  if (/defi|lend|swap|dex|yield|liquidity/i.test(m)) return "defi";
  if (/dao|governance|vote|proposal/i.test(m)) return "dao";
  if (/^gm/i.test(m)) return "gm";
  if (/^(hey|hi|hello|yo |sup|what'?s up|howdy)/i.test(m)) return "hello";
  if (/who (are|r) (you|u)|what (are|r) (you|u)|your name/i.test(m)) return "who";
  if (/price|worth|market|bull|bear|pump|dump|moon/i.test(m)) return "price";
  if (/token|coin|airdrop|tokenomic/i.test(m)) return "token";
  if (/food|eat|cook|recipe|pizza|hungry|restaurant/i.test(m)) return "food";
  if (/music|song|album|artist|rapper|singer|playlist/i.test(m)) return "music";
  if (/love|relationship|dating|girlfriend|boyfriend|crush|marry/i.test(m)) return "love";
  if (/life|advice|motivat|depress|stress|anxious|help me|sad|happy/i.test(m)) return "life";
  if (/joke|funny|laugh|humor|meme|lol|lmao/i.test(m)) return "funny";
  return null;
}

function getFallback(msg) {
  const topic = matchTopic(msg);
  if (topic && TOPIC_RESPONSES[topic]) {
    const arr = TOPIC_RESPONSES[topic];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return GENERIC_RESPONSES[Math.floor(Math.random() * GENERIC_RESPONSES.length)];
}

// --- UI Components ---

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
  const [msgs, setMsgs] = useState([{ text:"ayo what's good 👋 I'm Siggy, the oracle cat of the dark forest. been guarding Ritual secrets all night so I'm lowkey tired but still gonna put you on game. AI, blockchain, Ritual — ask me anything fam, I got 9 lives and all the answers 🐱✨", isUser:false }]);
  const [inp, setInp] = useState("");
  const [phase, setPhase] = useState("idle");
  const [pending, setPending] = useState(null);
  const endRef = useRef(null);
  const hist = useRef([]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, phase, pending]);

  const ask = async (msg) => {
    hist.current = [...hist.current, { role:"user", content:msg }];
    try {
      // Try the serverless API first
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: hist.current.slice(-10) }),
      });
      if (!r.ok) throw new Error(r.status);
      const data = await r.json();
      if (!data.reply) throw new Error("empty");
      hist.current = [...hist.current, { role:"assistant", content: data.reply }];
      return data.reply;
    } catch (e) {
      // Fallback to smart pre-written responses
      console.log("API unavailable, using smart fallback");
      const fb = getFallback(msg);
      hist.current = [...hist.current, { role:"assistant", content: fb }];
      return fb;
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
          <p style={{ textAlign:"center",fontFamily:"'Cinzel',Georgia,serif",color:"rgba(57,255,20,0.5)",fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",margin:"6px 0 0" }}>Siggy • Mystical Oracle Cat</p>
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
                  {[0,0.2,0.4].map(d => <span key={d} style={{ width:4,height:4,borderRadius:"50%",background:"#39ff14",animation:`bounce 1.4s ease-in-out infinite`,animationDelay:`${d}s` }} />)}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <div style={{ flex:1,borderRadius:12,background:"rgba(10,10,18,0.7)",border:"1px solid rgba(57,255,20,0.2)",boxShadow:"0 0 20px rgba(57,255,20,0.05)" }}>
            <input type="text" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask Siggy..." disabled={busy}
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
        <p style={{ textAlign:"center",color:"rgba(57,255,20,0.2)",fontSize:10,fontFamily:"'Cinzel',Georgia,serif",letterSpacing:"0.15em",marginTop:16,textTransform:"uppercase" }}>Powered by Dark Forest Magic ✦ Ritual Network</p>
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
