/* =========================================================
   CHAPTER 21 — EASY CUSTOMIZATION
   Change only the values inside birthdayConfig.
   ========================================================= */
const birthdayConfig = {
  herName: "You",
  yourName: "With love",
  birthdayAge: 21,
  personalMessage: `Today isn't just about turning 21.

It's about celebrating the person you've become and the person you're still becoming.

I hope this year brings you unexpected happiness.

I hope you discover places you've never seen.

I hope you meet people who appreciate your heart.

I hope you laugh more.

Dream bigger.

Take chances.

And most importantly, I hope you never forget how special you are.

Happy 21st birthday.

Here's to the next chapter.`,
};

const wishes = [
"May you always have a reason to smile.",
"May you never forget how loved you are.",
"May you find adventures that become stories.",
"May you laugh until your stomach hurts.",
"May you become everything you've dreamed of becoming.",
"May ordinary days surprise you with beautiful moments.",
"May you have the courage to choose yourself.",
"May your heart always have somewhere safe to land.",
"May you meet people who make life feel lighter.",
"May you discover a version of yourself you haven't met yet.",
"May you say yes to the moments you'll remember forever.",
"May you learn to celebrate how far you've already come.",
"May every wrong turn lead you somewhere meaningful.",
"May you never apologize for taking up space.",
"May you find peace in the middle of busy days.",
"May your dreams grow bigger than your fears.",
"May you always have something exciting to look forward to.",
"May you protect your softness without losing your strength.",
"May you collect memories, not just milestones.",
"May this year give you stories worth telling.",
"May 21 be only the beginning of something extraordinary."
];

const remember = [
"Keep your heart soft.",
"Protect your peace.",
"Take more pictures of ordinary days.",
"Say yes to adventures.",
"Don't shrink yourself for anyone.",
"Call the people who make you feel at home.",
"Let yourself change your mind.",
"Rest without feeling guilty.",
"Celebrate small wins.",
"Choose memories over perfection.",
"Be curious about the life ahead.",
"Never confuse being busy with being fulfilled.",
"Keep learning.",
"Let yourself be surprised.",
"Walk away from what repeatedly hurts you.",
"Speak kindly to yourself.",
"Take the trip.",
"Trust that slow progress is still progress.",
"Laugh loudly.",
"Make room for unexpected joy.",
"Remember: this is only chapter 21."
];

document.querySelectorAll("[data-her-name]").forEach(el=>el.textContent=birthdayConfig.herName);
document.querySelectorAll("[data-your-name]").forEach(el=>el.textContent=birthdayConfig.yourName);

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function typeText(el, text, speed=42){
  el.textContent="";
  [...text].forEach((char,i)=>setTimeout(()=>el.textContent+=char,i*speed));
}
typeText($("#introLine1"), "Tonight isn't just another night…", 45);
setTimeout(()=>typeText($("#introLine2"), "Because today, someone extraordinary turns 21.", 35), 1350);

const intro = $("#loader");
$("#enterBtn").addEventListener("click", ()=>{
  intro.classList.add("hidden");
  document.body.style.overflow="";
  window.scrollTo({top:0,behavior:"instant"});
});
document.body.style.overflow="hidden";

/* Ambient particles / petals */
const ambient = $("#ambientCanvas"), ac = ambient.getContext("2d");
let ambientParticles=[];
function resizeCanvas(c){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";c.getContext("2d").setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
function initAmbient(){
  resizeCanvas(ambient);
  ambientParticles=Array.from({length:100},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.3,s:Math.random()*.25+.05,a:Math.random()*.7+.1,phase:Math.random()*7}));
}
function drawAmbient(t){
  ac.clearRect(0,0,innerWidth,innerHeight);
  ambientParticles.forEach(p=>{
    p.y-=p.s;if(p.y<-5)p.y=innerHeight+5;
    const alpha=p.a*(.65+.35*Math.sin(t*.001+p.phase));
    ac.fillStyle=`rgba(226,197,133,${alpha})`;ac.beginPath();ac.arc(p.x,p.y,p.r,0,Math.PI*2);ac.fill();
  });
  requestAnimationFrame(drawAmbient);
}
initAmbient();requestAnimationFrame(drawAmbient);addEventListener("resize",initAmbient);

/* Cursor glow */
const cursor=$(".cursor-glow");
addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});

/* Wishes */
const wishGrid=$("#wishGrid");
wishes.forEach((w,i)=>{
  const card=document.createElement("article");
  card.className="wish-card";
  card.innerHTML=`<div class="wish-number">${String(i+1).padStart(2,"0")}</div><div class="wish-text">${w}</div>`;
  wishGrid.appendChild(card);
});

/* Remember list */
const rememberList=$("#rememberList");
remember.forEach((x,i)=>{
  const row=document.createElement("div");
  row.className="remember-item";
  row.innerHTML=`<span class="remember-num">${String(i+1).padStart(2,"0")}</span><span class="remember-text">${x}</span>`;
  rememberList.appendChild(row);
});

/* Scroll reveal */
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in-view","visible");
      if(entry.target.classList.contains("wish-card")) entry.target.style.transitionDelay=(entry.target.dataset.delay||0)+"ms";
    }
  });
},{threshold:.14});
$$(".reveal,.stagger-lines p,.wish-card,.remember-item").forEach((el,i)=>{
  if(el.classList.contains("wish-card")) el.dataset.delay=(i%6)*90;
  io.observe(el);
});

/* Reminder cinematic sequence */
const reminderObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const items=$$(".reminder-sequence p");
      items.forEach((x,i)=>setTimeout(()=>x.classList.add("active"),i*1150));
      reminderObs.disconnect();
    }
  });
},{threshold:.45});
reminderObs.observe($(".reminder"));

/* 3D tilt for wish cards */
wishGrid.addEventListener("pointermove",e=>{
  const card=e.target.closest(".wish-card"); if(!card)return;
  const r=card.getBoundingClientRect();
  const rx=((e.clientY-r.top)/r.height-.5)*-5;
  const ry=((e.clientX-r.left)/r.width-.5)*5;
  card.style.transform=`translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
wishGrid.addEventListener("pointerleave",()=>$$(".wish-card").forEach(c=>c.style.transform=""));

/* Constellation */
const cc=$("#constellationCanvas"), ctx=cc.getContext("2d");
let stars=[], mouse={x:0,y:0};
function initStars(){
  resizeCanvas(cc);
  stars=Array.from({length:150},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,tw:Math.random()*6.28}));
}
function drawStars(t){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  stars.forEach(s=>{
    const dx=mouse.x*10, dy=mouse.y*10;
    ctx.fillStyle=`rgba(246,228,184,${.25+.45*Math.abs(Math.sin(t*.001+s.tw))})`;
    ctx.beginPath();ctx.arc(s.x+dx,s.y+dy,s.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
initStars();requestAnimationFrame(drawStars);
addEventListener("resize",initStars);
$("#constellationSection").addEventListener("pointermove",e=>{
  const r=$("#constellationSection").getBoundingClientRect();
  mouse.x=(e.clientX-r.left)/r.width-.5;mouse.y=(e.clientY-r.top)/r.height-.5;
});
let constellationDone=false;
const constellationObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!constellationDone){
    constellationDone=true;
    setTimeout(()=>{$("#constellationSymbol").classList.add("heart");$("#constellationSymbol").textContent="♡"},2200);
  }
},{threshold:.5});
constellationObs.observe($("#constellationSection"));

/* Letter */
const envelope=$("#envelope"), letter=$("#letter");
$("#personalLetter").textContent=birthdayConfig.personalMessage;
envelope.addEventListener("click",()=>{
  envelope.querySelector(".envelope").classList.add("open");
  setTimeout(()=>letter.classList.add("open"),700);
});
$("#closeLetter").addEventListener("click",()=>{
  letter.classList.remove("open");
  setTimeout(()=>envelope.querySelector(".envelope").classList.remove("open"),400);
});
letter.addEventListener("click",e=>{if(e.target===letter)$("#closeLetter").click()});

/* Cake candles: 21, staggered lighting */
const candles=$("#candles");
for(let i=0;i<21;i++){
  const c=document.createElement("div");c.className="candle";c.style.animationDelay=(i*.07)+"s";
  c.innerHTML='<span class="flame"></span>';candles.appendChild(c);
}
const candleObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
    $$(".candle").forEach((c,i)=>setTimeout(()=>c.classList.add("lit"),i*90));
    setTimeout(()=>{$("#wishPromptOne").classList.add("active")},900);
    setTimeout(()=>{$("#wishPromptTwo").classList.add("active")},1900);
    setTimeout(()=>{$("#wishPromptThree").classList.add("active")},2900);
    candleObs.disconnect();
  }
},{threshold:.55});
candleObs.observe($(".cake-section"));

/* Wish celebration */
let wished=false;
$("#wishBtn").addEventListener("click",()=>{
  if(wished)return;wished=true;
  $$(".candle").forEach((c,i)=>setTimeout(()=>c.classList.add("off"),i*35));
  document.body.classList.add("wish-made");
  setTimeout(()=>launchConfetti(180),300);
  setTimeout(()=>{
    $("#celebration").classList.add("show");
    $("#celebration").scrollIntoView({behavior:"smooth"});
  },1100);
});
function launchConfetti(count){
  for(let i=0;i<count;i++){
    const p=document.createElement("i");p.className="confetti-piece";
    const angle=Math.random()*Math.PI*2, dist=180+Math.random()*600;
    p.style.setProperty("--x",Math.cos(angle)*dist+"px");
    p.style.setProperty("--y",(Math.sin(angle)*dist+250)+"px");
    p.style.setProperty("--r",(Math.random()*1000-500)+"deg");
    p.style.left=(50+Math.random()*6-3)+"%";p.style.top=(42+Math.random()*8)+"%";
    p.style.opacity=Math.random()*.8+.2;
    p.style.background=["#d6b06a","#f2dfb2","#b97783","#fff7e7","#6d3c48"][Math.floor(Math.random()*5)];
    p.style.animationDelay=Math.random()*.5+"s";
    document.body.appendChild(p);setTimeout(()=>p.remove(),3400);
  }
}

/* Hero parallax */
addEventListener("scroll",()=>{
  const y=scrollY;
  $$("[data-parallax]").forEach(el=>el.style.transform=`translateY(${y*Number(el.dataset.parallax)}px)`);
});

/* Small accessibility helpers */
addEventListener("keydown",e=>{
  if(e.key==="Escape"&&letter.classList.contains("open"))$("#closeLetter").click();
});
