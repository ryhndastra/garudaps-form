"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function RecruitmentForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState({
    growId: "",
    discord: "",
    age: "",
    role: "Moderator",
    experience: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // API Web3Forms buat ngirim ke Email lu langsung
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE", // TODO: Ganti ini pake key web3forms lu
          subject: `[New Staff Application] ${form.role} - ${form.growId}`,
          from_name: "GarudaPS Recruitment",
          ...form,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setMessage({
          type: "success",
          text: "Application submitted successfully! We will contact you via Discord.",
        });
        setForm({
          growId: "",
          discord: "",
          age: "",
          role: "Moderator",
          experience: "",
          reason: "",
        });
      } else {
        throw new Error(result.message || "Failed to send application.");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-10 pb-24 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 max-w-3xl px-4 mt-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-40 h-16 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            <Image
              src="/images/logo/GARUDAPS2026.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Staff{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
              Recruitment
            </span>
          </h1>
          <p className="text-white/60 font-medium max-w-lg mx-auto">
            Join the GarudaPS team! Fill out the form below carefully. Only the
            best candidates will be contacted via Discord.
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex items-start gap-3 p-4 rounded-xl mb-8 border ${message.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <p className="text-sm font-medium">{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1">
                  GrowID (In-Game Name)
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sho"
                  value={form.growId}
                  onChange={(e) => setForm({ ...form, growId: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1">
                  Discord Username
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. sho#1234 or sho_dev"
                  value={form.discord}
                  onChange={(e) =>
                    setForm({ ...form, discord: e.target.value })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1">
                  Real Age
                </label>
                <input
                  required
                  type="number"
                  min="10"
                  max="50"
                  placeholder="e.g. 18"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1">
                  Position Applied
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 appearance-none"
                >
                  <option value="Moderator">Moderator</option>
                  <option value="Event Admin">Event Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Support">Support/Helper</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">
                Past Experience
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your previous experience in GTPS..."
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">
                Why should we choose you?
              </label>
              <textarea
                required
                rows={4}
                placeholder="Convince us why you are a good fit for GarudaPS..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 resize-none"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" /> Submit Application
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
