/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  SendHorizontal,
  Smartphone,
  X,
  ShieldCheck,
  IdCard,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";

const AnimatedCheckmark = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-green-500"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M8 12.5l3 3 5-6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
    />
  </motion.svg>
);

export default function RecruitmentForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const [form, setForm] = useState({
    growId: "",
    discord: "",
    whatsapp: "",
    age: "",
    experience: "",
    reason: "",
  });

  useEffect(() => {
    // Cek memori browser
    const checkStorage = localStorage.getItem("garudaps_staff_applied");
    if (checkStorage === "true") {
      setHasApplied(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasApplied) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "KEY",
          subject: `Staff Application - ${form.growId}`,
          from_name: "GarudaPS System",
          ...form,
        }),
      });

      if (response.status === 200) {
        setShowModal(true);
        setForm({
          growId: "",
          discord: "",
          whatsapp: "",
          age: "",
          experience: "",
          reason: "",
        });

        // Simpan status dan ganti View
        localStorage.setItem("garudaps_staff_applied", "true");
        setHasApplied(true);
      } else {
        throw new Error("Transmission failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during transmission.");
    } finally {
      setLoading(false);
    }
  };

  // Input Styling
  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500 focus:bg-white/[0.05] focus:ring-1 focus:ring-orange-500/50 transition-all duration-300";
  const labelClass =
    "block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 ml-1";

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-[#020202] selection:bg-orange-500/30 selection:text-orange-200">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/banner.jpg"
          alt="GarudaPS Background"
          fill
          priority
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#020202]/50 via-[#020202]/80 to-[#020202]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-200 h-75 bg-orange-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-225 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-100"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-6">
          <div className="relative w-24 h-12 mb-4 md:mb-0">
            <Image
              src="/images/logo/GARUDAPS2026.png"
              alt="GarudaPS Logo"
              className="object-contain drop-shadow-md"
              priority
              fill
            />
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
              Staff <span className="text-orange-500">Recruitment</span>
            </h1>
            <p className="text-white/40 text-xs font-medium mt-1 tracking-wider uppercase">
              Strictly for Elite Candidates
            </p>
          </div>
        </div>

        {/* --- DYNAMIC VIEW: Gonta ganti antara Form dan Status --- */}
        <AnimatePresence mode="wait">
          {hasApplied ? (
            /* UDAH PERNAH APPLY */
            <motion.div
              key="applied-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-24 h-24 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                <ShieldCheck className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">
                Response Received
              </h2>
              <p className="text-white/50 font-medium max-w-md mx-auto leading-relaxed">
                Your data is securely locked in our system. You have already
                submitted an application from this device. Please monitor your
                Discord and WhatsApp for further instructions.
              </p>
            </motion.div>
          ) : (
            /* ORM INPUT */
            <motion.div
              key="form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Error Message Biasa */}
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{errorMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>GrowID (In-Game)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <IdCard className="w-4 h-4 text-white/30" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Sho"
                        value={form.growId}
                        onChange={(e) =>
                          setForm({ ...form, growId: e.target.value })
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Discord Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MessageSquare className="w-4 h-4 text-white/30" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="e.g. sho_dev"
                        value={form.discord}
                        onChange={(e) =>
                          setForm({ ...form, discord: e.target.value })
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>WhatsApp Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Smartphone className="w-4 h-4 text-white/30" />
                      </div>
                      <input
                        required
                        type="tel"
                        placeholder="+62 8..."
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm({ ...form, whatsapp: e.target.value })
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Real Age</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <CalendarDays className="w-4 h-4 text-white/30" />
                      </div>
                      <input
                        required
                        type="number"
                        min="13"
                        max="60"
                        placeholder="Minimum 13+"
                        value={form.age}
                        onChange={(e) =>
                          setForm({ ...form, age: e.target.value })
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5 flex flex-col h-full">
                  <div>
                    <label className={labelClass}>Past Staff Experience</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Detail your previous roles..."
                      value={form.experience}
                      onChange={(e) =>
                        setForm({ ...form, experience: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>
                      Why should we choose you?
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="What value can you bring to GarudaPS?"
                      value={form.reason}
                      onChange={(e) =>
                        setForm({ ...form, reason: e.target.value })
                      }
                      className={`${inputClass} resize-none h-full min-h-20`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(234,88,12,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Submit Application{" "}
                          <SendHorizontal className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-4 text-center w-full pointer-events-none">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
          Garuda Private Server © 2026
        </p>
      </div>

      {/* --- SUCCESS MODAL OVERLAY --- */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100"
            />
            <div className="fixed inset-0 flex items-center justify-center z-110 p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(234,88,12,0.15)] w-full max-w-sm text-center relative pointer-events-auto"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-white/50 hover:text-white" />
                </button>

                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <AnimatedCheckmark />
                </div>

                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                  Application Sent!
                </h2>
                <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">
                  Your staff application has been successfully encrypted and
                  submitted. Our Senior Staff will reach out if you are
                  selected.
                </p>

                {/* Button konfirmasi. viewnya bakal keganti kalo buttonnya di ganti */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-sm transition-all active:scale-95 cursor-pointer"
                >
                  Understood
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
