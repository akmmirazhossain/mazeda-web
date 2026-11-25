import { useState } from "react";

const input = "w-full border rounded-2xl px-4 py-2 focus:outline-none";

export default function ApplyForm({ jobTitle = "", jobSlug = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault();
    const formEl = e.target;
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: new FormData(formEl),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) formEl.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="hidden"
        name="position"
        value={jobTitle || "General Application"}
      />
      <input type="hidden" name="job_slug" value={jobSlug} />
      <input
        name="full_name"
        placeholder="Full name"
        required
        className={input}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={input}
      />
      <input name="phone" placeholder="Phone" required className={input} />
      <textarea
        name="message"
        rows={4}
        placeholder="Message (optional)"
        className={input}
      />
      <input name="cv" type="file" accept=".pdf,.doc,.docx" required />
      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <button
        disabled={status === "sending"}
        className="px-6 py-2 text-white rounded-full green_gradient disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
      {status === "done" && (
        <p className="text_green">Application submitted.</p>
      )}
      {status === "error" && (
        <p className="text_red">
          Failed. Check the file (PDF/DOC, max 5MB) and retry.
        </p>
      )}
    </form>
  );
}
