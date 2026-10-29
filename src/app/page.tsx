"use client";

import React, { useState } from "react";
import { Check, Copy, Download, Share2, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDownload = () => {
    const textContent = `CLAIM READY
A free checklist for anyone about to file a warranty claim.

WHO THIS IS FOR
Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty,
and who wants the claim to be decided on facts, in writing.

THE IDEA IN ONE LINE
A warranty claim is decided on records. Keep yours, and ask for theirs in writing.

BEFORE ANYTHING GOES WRONG
1. Keep the invoice. Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.
2. Register the product. Many brands ask you to register on their website or app; some add extra warranty when you do.
3. Read the warranty card once. Note how long it lasts, what it covers, and what it excludes.
4. Record the condition. Take a few dated photos of the product once it is installed or unboxed.

WHEN THE FAULT APPEARS
5. Record the fault. Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.
6. Raise the complaint in writing. Use email, the brand's website or its app, not only a phone call, so there is a record.
7. Note every reference number. Write down the complaint or ticket number, the date and the name of anyone you speak to.

WHEN A TECHNICIAN VISITS
8. Ask for the job sheet. Ask the technician for a copy of the visit report or job sheet before they leave.
9. Ask what was tested. Ask which test or instrument was used to reach the diagnosis.
10. Take your own photos. Photograph the product and anything the technician points to, during the visit.

IF THE CLAIM IS REFUSED
11. Ask for the reason in writing. Request a written explanation that names the exact cause and the evidence for it.
12. Ask for the technical report. If the refusal rests on an inspection, ask for that inspection report.
13. Escalate inside the company. Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.
14. Keep it factual. Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.
15. Know your consumer helpline. Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.

15 steps in the checklist.
4 records to keep before anything goes wrong.
1 rule: if it is not in writing, it did not happen.

Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country's consumer rules.`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "claim-ready-checklist.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Checklist downloaded successfully");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CLAIM READY",
          text: "A warranty claim is decided on records. Keep yours, and ask for theirs in writing.",
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard");
      } catch {
        showToast("Failed to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#363C47] flex flex-col font-sans selection:bg-[#DCF3EA] selection:text-[#065F43]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D1117] text-white px-5 py-3 rounded-full shadow-float text-[13.5px] font-medium flex items-center gap-2 animate-fade-in border border-[#34D399]/20">
          <Check className="w-4 h-4 text-[#34D399]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TICKER STRIP */}
      <div className="bg-[#EEFAF5] text-[#065F43] border-b border-[#B9E6D6] py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-ticker flex items-center">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="flex items-center space-x-10 pr-10">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                CLAIM READY
              </span>
              <span className="text-[#B9E6D6]">•</span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                A WARRANTY CLAIM IS DECIDED ON RECORDS
              </span>
              <span className="text-[#B9E6D6]">•</span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                KEEP YOURS, AND ASK FOR THEIRS IN WRITING
              </span>
              <span className="text-[#B9E6D6]">•</span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                IF IT IS NOT IN WRITING, IT DID NOT HAPPEN
              </span>
              <span className="text-[#B9E6D6]">•</span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                15 STEPS IN THE CHECKLIST
              </span>
              <span className="text-[#B9E6D6]">•</span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                4 RECORDS TO KEEP BEFORE ANYTHING GOES WRONG
              </span>
              <span className="text-[#B9E6D6]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#E7EAEF] h-[72px] transition-all">
        <div className="max-w-[1180px] h-full mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#087A58] flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-[18px] tracking-[-0.035em] text-[#0D1117]">
              CLAIM READY
            </span>
          </a>

          {/* Nav links - strictly one line, hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#steps"
              className="text-[15px] font-semibold text-[#5B6472] hover:text-[#0D1117] transition-colors"
            >
              The 15 steps
            </a>
            <a
              href="#key-numbers"
              className="text-[15px] font-semibold text-[#5B6472] hover:text-[#0D1117] transition-colors"
            >
              Key numbers
            </a>
          </nav>

          {/* Right Action: Dark pill button */}
          <button
            onClick={handleDownload}
            className="bg-[#0D1117] text-white rounded-full px-5 py-2.5 text-[13.5px] font-medium hover:bg-[#087A58] transition-colors duration-200 shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 border-b border-[#E7EAEF]">
          <div className="max-w-[1180px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Copy */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Mono pill label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
                  <span>CLAIM READY</span>
                </div>

                {/* Display Headline */}
                <h1 className="font-extrabold text-[42px] sm:text-[54px] lg:text-[60px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-6">
                  CLAIM READY
                </h1>

                {/* Lead Paragraph */}
                <p className="text-[18px] sm:text-[20px] leading-[1.72] text-[#5B6472] max-w-[62ch] mb-8">
                  A free checklist for anyone about to file a warranty claim.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleDownload}
                    className="bg-[#087A58] text-white font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-raised hover:bg-[#066748] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2.5"
                  >
                    <span>Download checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white text-[#0D1117] border border-[#E7EAEF] font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-[#F7F8FA] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4 text-[#5B6472]" />
                    <span>Share checklist</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Headline Card with scanlines */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[26px] bg-[#0D1117] text-white p-8 md:p-10 shadow-raised overflow-hidden border border-[#0D1117]">
                  {/* Faint horizontal scanline texture */}
                  <div className="scanlines absolute inset-0 pointer-events-none opacity-20"></div>

                  <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
                    <div className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#34D399] mb-6">
                      THE IDEA IN ONE LINE
                    </div>

                    <p className="font-extrabold text-[22px] sm:text-[25px] leading-[1.3] tracking-[-0.035em] text-white">
                      A warranty claim is decided on records. Keep yours, and ask for theirs in writing.
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-white/60 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span>RECORDS • PROOF • FACTS</span>
                      <span className="text-[#34D399]">#01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR SECTION */}
        <section className="py-20 md:py-24 bg-[#F7F8FA] border-b border-[#E7EAEF]">
          <div className="max-w-[880px] mx-auto px-5 md:px-10">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
              <span>WHO THIS IS FOR</span>
            </div>

            {/* Section Headline */}
            <h2 className="font-extrabold text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-6">
              WHO THIS IS FOR
            </h2>

            {/* Editorial Card with the full sentence once, without device cards */}
            <div className="bg-white rounded-[18px] p-8 md:p-10 border border-[#E7EAEF] shadow-card">
              <p className="text-[18px] sm:text-[20px] leading-[1.72] text-[#363C47]">
                Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty, and who wants the claim to be decided on facts, in writing.
              </p>
            </div>
          </div>
        </section>

        {/* THE 15 STEPS (CHECKLIST PHASES) */}
        <div id="steps">
          {/* PHASE 1: BEFORE ANYTHING GOES WRONG */}
          <section className="py-20 md:py-28 border-b border-[#E7EAEF] bg-white">
            <div className="max-w-[1180px] mx-auto px-5 md:px-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
                <span>PHASE 01</span>
              </div>
              <h2 className="font-extrabold text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-12">
                BEFORE ANYTHING GOES WRONG
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Step 1 */}
                <div
                  onClick={() => toggleStep(1)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[1]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 1"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[1]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 01
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">1. Keep the invoice.</strong> Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => toggleStep(2)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[2]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 2"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[2]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 02
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">2. Register the product.</strong> Many brands ask you to register on their website or app; some add extra warranty when you do.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => toggleStep(3)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[3]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 3"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[3]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 03
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">3. Read the warranty card once.</strong> Note how long it lasts, what it covers, and what it excludes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  onClick={() => toggleStep(4)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[4]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 4"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[4]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 04
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">4. Record the condition.</strong> Take a few dated photos of the product once it is installed or unboxed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PHASE 2: WHEN THE FAULT APPEARS */}
          <section className="py-20 md:py-28 border-b border-[#E7EAEF] bg-[#F7F8FA]">
            <div className="max-w-[1180px] mx-auto px-5 md:px-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
                <span>PHASE 02</span>
              </div>
              <h2 className="font-extrabold text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-12">
                WHEN THE FAULT APPEARS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 5 */}
                <div
                  onClick={() => toggleStep(5)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[5]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 5"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[5]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 05
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">5. Record the fault.</strong> Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div
                  onClick={() => toggleStep(6)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[6]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 6"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[6]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 06
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">6. Raise the complaint in writing.</strong> Use email, the brand&apos;s website or its app, not only a phone call, so there is a record.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div
                  onClick={() => toggleStep(7)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[7]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 7"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[7]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 07
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">7. Note every reference number.</strong> Write down the complaint or ticket number, the date and the name of anyone you speak to.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PHASE 3: WHEN A TECHNICIAN VISITS */}
          <section className="py-20 md:py-28 border-b border-[#E7EAEF] bg-white">
            <div className="max-w-[1180px] mx-auto px-5 md:px-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
                <span>PHASE 03</span>
              </div>
              <h2 className="font-extrabold text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-12">
                WHEN A TECHNICIAN VISITS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 8 */}
                <div
                  onClick={() => toggleStep(8)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[8]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 8"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[8]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 08
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">8. Ask for the job sheet.</strong> Ask the technician for a copy of the visit report or job sheet before they leave.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 9 */}
                <div
                  onClick={() => toggleStep(9)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[9]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 9"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[9]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 09
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">9. Ask what was tested.</strong> Ask which test or instrument was used to reach the diagnosis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 10 */}
                <div
                  onClick={() => toggleStep(10)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[10]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 10"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[10]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 10
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">10. Take your own photos.</strong> Photograph the product and anything the technician points to, during the visit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PHASE 4: IF THE CLAIM IS REFUSED */}
          <section className="py-20 md:py-28 border-b border-[#E7EAEF] bg-[#F7F8FA]">
            <div className="max-w-[1180px] mx-auto px-5 md:px-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEFAF5] border border-[#B9E6D6] text-[#065F43] font-mono text-[10px] font-medium uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087A58]"></span>
                <span>PHASE 04</span>
              </div>
              <h2 className="font-extrabold text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.035em] text-[#0D1117] mb-12">
                IF THE CLAIM IS REFUSED
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Step 11 */}
                <div
                  onClick={() => toggleStep(11)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[11]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 11"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[11]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 11
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">11. Ask for the reason in writing.</strong> Request a written explanation that names the exact cause and the evidence for it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 12 */}
                <div
                  onClick={() => toggleStep(12)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[12]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 12"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[12]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 12
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">12. Ask for the technical report.</strong> If the refusal rests on an inspection, ask for that inspection report.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 13 */}
                <div
                  onClick={() => toggleStep(13)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[13]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 13"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[13]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 13
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">13. Escalate inside the company.</strong> Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 14 */}
                <div
                  onClick={() => toggleStep(14)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 ${
                    checkedSteps[14]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 14"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[14]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 14
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">14. Keep it factual.</strong> Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 15 */}
                <div
                  onClick={() => toggleStep(15)}
                  className={`cursor-pointer rounded-[18px] p-7 md:p-8 border transition-all duration-200 hover:-translate-y-0.5 md:col-span-2 lg:col-span-1 ${
                    checkedSteps[15]
                      ? "bg-[#EEFAF5] border-[#B9E6D6] shadow-sm"
                      : "bg-white border-[#E7EAEF] shadow-card hover:shadow-raised"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      aria-label="Toggle step 15"
                      className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                        checkedSteps[15]
                          ? "bg-[#087A58] text-white"
                          : "border border-[#D6DBE3] text-transparent hover:border-[#087A58]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#697382] block mb-2">
                        STEP 15
                      </span>
                      <p className="text-[17px] leading-[1.72] text-[#363C47]">
                        <strong className="font-extrabold text-[#0D1117]">15. Know your consumer helpline.</strong> Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* KEY NUMBERS SECTION (Note: "KEY NUMBERS FOR THE PAGE" heading is hidden as per notes) */}
        <section id="key-numbers" className="py-20 md:py-28 bg-white border-b border-[#E7EAEF]">
          <div className="max-w-[1180px] mx-auto px-5 md:px-10">
            {/* Stat Grid on outline-colored container with 1px gap */}
            <div className="rounded-[18px] overflow-hidden border border-[#E7EAEF] bg-[#E7EAEF] shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]">
                {/* Stat 1 */}
                <div className="bg-white p-7 md:p-9 flex flex-col justify-between">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#697382] mb-3">
                    CHECKLIST
                  </span>
                  <div className="font-extrabold text-[48px] sm:text-[52px] leading-none text-[#0D1117] tracking-[-0.035em] mb-3 font-mono">
                    15
                  </div>
                  <p className="text-[13.5px] font-medium text-[#5B6472] leading-[1.5]">
                    steps in the checklist.
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="bg-white p-7 md:p-9 flex flex-col justify-between">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#697382] mb-3">
                    PREPARATION
                  </span>
                  <div className="font-extrabold text-[48px] sm:text-[52px] leading-none text-[#0D1117] tracking-[-0.035em] mb-3 font-mono">
                    4
                  </div>
                  <p className="text-[13.5px] font-medium text-[#5B6472] leading-[1.5]">
                    records to keep before anything goes wrong.
                  </p>
                </div>

                {/* Stat 3: Hot Cell in Emerald */}
                <div className="bg-white p-7 md:p-9 flex flex-col justify-between">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#087A58] mb-3">
                    THE GOLDEN RULE
                  </span>
                  <div className="font-extrabold text-[48px] sm:text-[52px] leading-none text-[#087A58] tracking-[-0.035em] mb-3 font-mono">
                    1
                  </div>
                  <p className="text-[13.5px] font-medium text-[#065F43] leading-[1.5]">
                    rule: if it is not in writing, it did not happen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION (Note: "CALL TO ACTION" heading is hidden as per notes) */}
        <section className="py-20 md:py-28 bg-[#F7F8FA]">
          <div className="max-w-[880px] mx-auto px-5 md:px-10">
            {/* Callout Card */}
            <div className="bg-[#EEFAF5] border border-[#B9E6D6] rounded-[18px] p-8 md:p-12 shadow-raised">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Action 1 */}
                <div className="flex flex-col items-start gap-4 pr-0 md:pr-4 md:border-r md:border-[#B9E6D6]">
                  <p className="text-[17px] font-medium text-[#065F43] leading-[1.6]">
                    Download the checklist and keep it with your invoices.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="bg-[#087A58] text-white font-semibold text-[15px] px-6 py-3.5 rounded-full shadow-raised hover:bg-[#066748] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download checklist</span>
                  </button>
                </div>

                {/* Action 2 */}
                <div className="flex flex-col items-start gap-4 pl-0 md:pl-4">
                  <p className="text-[17px] font-medium text-[#065F43] leading-[1.6]">
                    Share it with a friend who just bought something expensive.
                  </p>
                  <button
                    onClick={handleShare}
                    className="bg-[#0D1117] text-white font-medium text-[15px] px-6 py-3.5 rounded-full shadow-raised hover:bg-[#087A58] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4 text-[#34D399]" />
                    <span>Share checklist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (Note: "FOOTER NOTE" heading is hidden as per notes) */}
      <footer className="bg-[#F7F8FA] border-t border-[#E7EAEF] py-16">
        <div className="max-w-[1180px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E7EAEF]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#087A58] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-[16px] tracking-[-0.035em] text-[#0D1117]">
                CLAIM READY
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#steps"
                className="text-[13.5px] font-medium text-[#5B6472] hover:text-[#0D1117] transition-colors"
              >
                The 15 steps
              </a>
              <a
                href="#key-numbers"
                className="text-[13.5px] font-medium text-[#5B6472] hover:text-[#0D1117] transition-colors"
              >
                Key numbers
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[13.5px] font-medium text-[#087A58] hover:underline"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <div className="pt-8 text-center md:text-left">
            <p className="text-[13.5px] text-[#5B6472] leading-[1.6]">
              Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country&apos;s consumer rules.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
