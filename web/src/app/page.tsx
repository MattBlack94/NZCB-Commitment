"use client";

import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { signatories } from "@/data/signatories";
import { parseExcelFile, ParseResult } from "@/lib/excelParser";
import {
  Search,
  Building2,
  ArrowRight,
  CheckCircle2,
  Globe,
  Upload,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<
    "idle" | "parsing" | "success" | "error"
  >("idle");
  const [uploadResult, setUploadResult] = useState<ParseResult | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadFileName, setUploadFileName] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setUploadState("parsing");
    setUploadResult(null);
    setUploadError("");

    try {
      const result = await parseExcelFile(file);

      if (result.format === "unknown") {
        setUploadState("error");
        setUploadError(
          "This file does not appear to be a valid NZCB reporting form. Please upload a file based on the simplified template or the original WorldGBC form."
        );
        return;
      }

      if (result.fieldsPopulated === 0) {
        setUploadState("error");
        setUploadError(
          "The file was recognised but no data could be extracted. It may be an empty template."
        );
        return;
      }

      setUploadResult(result);
      setUploadState("success");

      // Store parsed data in localStorage
      localStorage.setItem("nzcb-upload-data", JSON.stringify(result.data));
    } catch (err) {
      setUploadState("error");
      setUploadError(
        err instanceof Error
          ? `Error parsing file: ${err.message}`
          : "An unexpected error occurred while parsing the file."
      );
    }

    // Reset file input so the same file can be re-uploaded
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadContinue = () => {
    router.push("/form?source=upload");
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return signatories;
    const lower = search.toLowerCase();
    return signatories.filter(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        s.country.toLowerCase().includes(lower) ||
        s.businessType.toLowerCase().includes(lower)
    );
  }, [search]);

  const selected = signatories.find((s) => s.id === selectedId);

  const handleContinue = () => {
    if (selected) {
      const params = new URLSearchParams({ signatoryId: selected.id });
      router.push(`/form?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#3c886c]/10 text-[#3c886c] text-xs font-semibold px-3 py-1.5 mb-4">
            <Globe size={14} />
            2024 Reporting Cycle
          </div>
          <h1 className="text-[42px] leading-tight font-bold text-[#1d4354] mb-3">
            Net Zero Carbon Buildings
            <span className="block text-[#3c886c]">Commitment Reporting</span>
          </h1>
          <p className="text-[#373737] text-base max-w-lg mx-auto">
            Welcome to the WorldGBC NZCB Commitment annual reporting form.
            Search for your organisation below to begin.
          </p>
        </div>

        {/* Search card */}
        <div className="bg-white shadow-[6px_6px_9px_rgba(0,0,0,0.2)] border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-[#1d4354] mb-2">
            Find Your Organisation
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsOpen(true);
                setSelectedId(null);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-sm text-[#373737] focus:border-[#3c886c] focus:outline-none focus:ring-2 focus:ring-[#3c886c]/20 transition-shadow"
              placeholder="Search by name, country, or business type..."
            />
          </div>

          {/* Dropdown */}
          {isOpen && !selectedId && (
            <div className="mt-2 border border-gray-200 overflow-hidden shadow-sm max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No organisations found matching &quot;{search}&quot;
                </div>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(s.id);
                      setSearch(s.name);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#3c886c]/5 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#373737]">
                          {s.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {s.country} &middot; {s.businessType} &middot; Joined{" "}
                          {s.yearJoined}
                        </p>
                      </div>
                      <span className="text-xs bg-[#3c886c]/10 text-[#3c886c] px-2 py-0.5 font-medium">
                        v{s.commitmentVersion}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Selected signatory preview */}
          {selected && (
            <div className="mt-4 bg-[#3c886c]/5 border border-[#3c886c]/30 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#3c886c]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-[#3c886c]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#1d4354]">
                    {selected.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-[#373737]">
                    <span>
                      <strong>Country:</strong> {selected.country}
                    </span>
                    <span>
                      <strong>Type:</strong> {selected.businessType}
                    </span>
                    <span>
                      <strong>Joined:</strong> {selected.yearJoined}
                    </span>
                    <span>
                      <strong>Version:</strong> {selected.commitmentVersion}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.ep100 && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5">
                        <CheckCircle2 size={10} /> EP100
                      </span>
                    )}
                    {selected.sbti && (
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5">
                        <CheckCircle2 size={10} /> SBTi
                      </span>
                    )}
                    {selected.raceToZero && (
                      <span className="inline-flex items-center gap-1 text-xs bg-teal-100 text-teal-700 px-2 py-0.5">
                        <CheckCircle2 size={10} /> Race to Zero
                      </span>
                    )}
                    {selected.climatePledge && (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5">
                        <CheckCircle2 size={10} /> Climate Pledge
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-all ${
              selected
                ? "bg-[#3c886c] text-white hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] shadow-md hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300"
            }`}
          >
            Begin Reporting
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-8 mb-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Upload card */}
        <div className="bg-white shadow-[6px_6px_9px_rgba(0,0,0,0.2)] border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-[#1d4354] mb-2">
            Upload a Completed Excel File
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Upload a filled-in Excel reporting form (.xlsx or .xlsm) to
            pre-populate the web form. Supports both the simplified template and
            the original WorldGBC form.
          </p>

          {/* File input area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
              uploadState === "parsing"
                ? "border-gray-300 bg-gray-50 cursor-wait"
                : uploadState === "success"
                  ? "border-[#3c886c] bg-[#3c886c]/5"
                  : uploadState === "error"
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-[#3c886c] hover:bg-[#3c886c]/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xlsm"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploadState === "parsing"}
            />

            {uploadState === "idle" && (
              <>
                <Upload
                  size={28}
                  className="mx-auto text-gray-400 mb-2"
                />
                <p className="text-sm text-[#373737]">
                  Click to select a file or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  .xlsx or .xlsm files only
                </p>
              </>
            )}

            {uploadState === "parsing" && (
              <>
                <Loader2
                  size={28}
                  className="mx-auto text-[#3c886c] mb-2 animate-spin"
                />
                <p className="text-sm text-[#373737]">
                  Parsing {uploadFileName}...
                </p>
              </>
            )}

            {uploadState === "error" && (
              <>
                <AlertCircle
                  size={28}
                  className="mx-auto text-red-500 mb-2"
                />
                <p className="text-sm text-red-700 mb-1">{uploadError}</p>
                <p className="text-xs text-gray-500">
                  Click to try a different file
                </p>
              </>
            )}

            {uploadState === "success" && uploadResult && (
              <>
                <FileSpreadsheet
                  size={28}
                  className="mx-auto text-[#3c886c] mb-2"
                />
                <p className="text-sm font-medium text-[#1d4354] mb-1">
                  {uploadFileName}
                </p>
                <p className="text-xs text-[#3c886c]">
                  Format{" "}
                  {uploadResult.format === "B"
                    ? "detected: Simplified Template"
                    : "detected: Original WorldGBC Form"}{" "}
                  &middot; {uploadResult.fieldsPopulated} field
                  {uploadResult.fieldsPopulated !== 1 ? "s" : ""} populated
                </p>
                {uploadResult.warnings.length > 0 && (
                  <div className="mt-2">
                    {uploadResult.warnings.map((w, i) => (
                      <p key={i} className="text-xs text-amber-600">
                        {w}
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Click to upload a different file
                </p>
              </>
            )}
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={handleUploadContinue}
            disabled={uploadState !== "success"}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-all ${
              uploadState === "success"
                ? "bg-[#3c886c] text-white hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] shadow-md hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300"
            }`}
          >
            Continue with Uploaded Data
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white border border-gray-200 p-4 shadow-[6px_6px_9px_rgba(0,0,0,0.2)]">
            <h3 className="text-sm font-semibold text-[#1d4354] mb-1">
              5 Sections
            </h3>
            <p className="text-xs text-gray-500">
              Entity details, portfolio, performance, actions, and advocacy.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 shadow-[6px_6px_9px_rgba(0,0,0,0.2)]">
            <h3 className="text-sm font-semibold text-[#1d4354] mb-1">
              Save & Resume
            </h3>
            <p className="text-xs text-gray-500">
              Save your draft at any time and return to complete it later.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 shadow-[6px_6px_9px_rgba(0,0,0,0.2)]">
            <h3 className="text-sm font-semibold text-[#1d4354] mb-1">
              Pre-populated
            </h3>
            <p className="text-xs text-gray-500">
              Your entity details are pre-filled from the NZCB mastersheet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
