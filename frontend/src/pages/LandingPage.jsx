import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F0F2F5]">

      {/* Navbar */}
      <div className="bg-[#ffffff] border-b border-[#E8E7E2] px-6 h-15 flex items-center justify-between  sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A3CFF]"></div>
          <span className="text-base font-medium text-[#0B0F1A]">Electron Pay</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/signin")}
            className="border border-[#E8E7E2] text-[#0B0F1A] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#F0F2F5] transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#1A3CFF] hover:bg-[#0A1FA8] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#ffffff] px-6 py-20 flex items-center justify-center gap-10 flex-wrap">
        <div className="max-w-max">
          <div className="inline-flex items-center gap-2 bg-[#E8EDFF] text-[#1A3CFF] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A3CFF]"></div>
            Now live — instant transfers
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F1A] mb-4">
            Send money instantly, without the hassle
          </h1>
          <p className="text-base text-[#8A8F9E] leading-relaxed mb-8">
            Electron Pay makes transferring money as easy as sending a message. Fast, secure, and completely free.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#1A3CFF] hover:bg-[#0A1FA8] text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="border border-[#E8E7E2] text-[#0B0F1A] text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#F0F2F5] transition-colors cursor-pointer"
            >
              Sign In →
            </button>
          </div>
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            {["No hidden fees", "Secure transactions ", "Instant transfers"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs text-[#8A8F9E]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Features */}
      <div className="bg-[#F0F2F5] py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B0F1A] tracking-tight">Everything you need</h2>
          <p className="text-sm text-[#8A8F9E] mt-2">Built for speed, security, and simplicity</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              bg: "bg-[#E8EDFF]",
              iconColor: "#1A3CFF",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
                </svg>
              ),
              title: "Instant transfers",
              desc: "Send money in under a second to anyone on Electron Pay.",
            },
            {
              bg: "bg-[#D4F5E9]",
              iconColor: "#00875A",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              ),
              title: "Secure transactions",
              desc: "Your data is securely protected at all times.",
            },
            {
              bg: "bg-[#FDE8D0]",
              iconColor: "#E8720C",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              ),
              title: "Zero fees",
              desc: "Send any amount with absolutely no transaction fees.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-[#ffffff] rounded-xl p-6 border border-[#E8E7E2]">
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <div className="text-sm font-medium text-[#0B0F1A] mb-1">{f.title}</div>
              <div className="text-xs text-[#8A8F9E] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#ffffff] py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#0B0F1A] tracking-tight">How it works</h2>
          <p className="text-sm text-[#8A8F9E] mt-2">Up and running in 3 simple steps</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 flex-wrap max-w-2xl mx-auto">
          {[
            { step: "1", title: "Create account", desc: "Sign up in under 30 seconds with just your name and email." },
            { step: "2", title: "Find a user", desc: "Search users by their unique username."},
            { step: "3", title: "Send money", desc: "Enter amount and hit send. Money arrives instantly." },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center max-w-40">
                <div className="w-11 h-11 rounded-full bg-[#1A3CFF] text-white flex items-center justify-center text-base font-bold mb-3">
                  {s.step}
                </div>
                <div className="text-sm font-medium text-[#0B0F1A] mb-1">{s.title}</div>
                <div className="text-xs text-[#8A8F9E] leading-relaxed">{s.desc}</div>
              </div>
              {i < 2 && (
                <div className="w-10 h-px bg-[#E8E7E2] shrink-0 mb-6 hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0B0F1A] py-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-3">Ready to get started?</h2>
        <p className="text-sm text-[#8A8F9E] mb-8">Join and experience seamless money transfers.</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#1A3CFF] hover:bg-[#0A1FA8] text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer"
        >
          Create Free Account
        </button>
      </div>

      {/* Footer */}
      <div className="bg-[#0B0F1A] border-t border-[#3D4155] px-6 py-5 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1A3CFF]"></div>
          <span className="text-sm font-medium text-white">Electron Pay</span>
        </div>
        <div className="text-xs text-[#8A8F9E]">© 2026 Electron Pay. All rights reserved.</div>
      </div>

    </div>
  );
}