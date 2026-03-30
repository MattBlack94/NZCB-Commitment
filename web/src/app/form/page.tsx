"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Save,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import { signatories } from "@/data/signatories";
import { formSchema, FormData, defaultFormValues } from "@/lib/schema";
import StepIndicator from "@/components/ui/StepIndicator";
import SectionDetails from "@/components/form/SectionDetails";
import SectionPortfolio from "@/components/form/SectionPortfolio";
import SectionPerformance from "@/components/form/SectionPerformance";
import SectionActions from "@/components/form/SectionActions";
import SectionAdvocacy from "@/components/form/SectionAdvocacy";
import SectionEP100 from "@/components/form/SectionEP100";

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const signatoryId = searchParams.get("signatoryId");
  const source = searchParams.get("source");
  const isUpload = source === "upload";

  const signatory = signatories.find((s) => s.id === signatoryId);

  const [currentStep, setCurrentStep] = useState(1);
  const [draftSaved, setDraftSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadBannerVisible, setUploadBannerVisible] = useState(isUpload);
  const [uploadEntityName, setUploadEntityName] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: defaultFormValues,
    mode: "onBlur",
  });

  const { watch, setValue, handleSubmit, formState } = form;

  const commitmentVersion = watch("commitmentVersion");
  const assets = watch("assets") || [];
  const hasNewDevelopment = assets.some(
    (a: { type: string; count: number }) =>
      a.type === "New development / major renovation" && a.count > 0
  );
  const showEmbodiedCarbon =
    commitmentVersion === "2021" && hasNewDevelopment;

  // For upload mode, check if EP100 is in the climate initiatives
  const watchedInitiatives = watch("climateInitiatives") || [];
  const showEP100 = isUpload
    ? watchedInitiatives.includes("EP100")
    : signatory?.ep100 === true;

  // Pre-populate signatory data (signatory search flow)
  useEffect(() => {
    if (!signatory || isUpload) return;
    setValue("entityName", signatory.name);
    setValue("signatoryId", signatory.id);
    setValue("yearJoined", signatory.yearJoined);
    setValue("commitmentVersion", signatory.commitmentVersion as "2019" | "2021");

    const initiatives: string[] = [];
    if (signatory.ep100) initiatives.push("EP100");
    if (signatory.sbti) initiatives.push("SBTi");
    if (signatory.raceToZero) initiatives.push("Race to Zero");
    if (signatory.climatePledge) initiatives.push("The Climate Pledge");
    setValue("climateInitiatives", initiatives);
  }, [signatory, isUpload, setValue]);

  // Load data from uploaded Excel file
  useEffect(() => {
    if (!isUpload) return;
    const stored = localStorage.getItem("nzcb-upload-data");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as keyof FormData, value as FormData[keyof FormData]);
        }
      });
      if (parsed.entityName) {
        setUploadEntityName(parsed.entityName);
      }
    } catch {
      // ignore invalid stored data
    }
  }, [isUpload, setValue]);

  // Load draft from localStorage (signatory search flow)
  useEffect(() => {
    if (!signatoryId || isUpload) return;
    const draftKey = `nzcb-draft-${signatoryId}`;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([key, value]) => {
          setValue(key as keyof FormData, value as FormData[keyof FormData]);
        });
      } catch {
        // ignore invalid drafts
      }
    }
  }, [signatoryId, isUpload, setValue]);

  const saveDraft = useCallback(() => {
    // For upload mode, use a generic draft key or entity-name-based key
    const draftKey = isUpload
      ? `nzcb-draft-upload-${uploadEntityName || "unnamed"}`
      : `nzcb-draft-${signatoryId}`;
    if (!isUpload && !signatoryId) return;
    const data = form.getValues();
    localStorage.setItem(draftKey, JSON.stringify(data));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  }, [signatoryId, isUpload, uploadEntityName, form]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  const steps = [
    { number: 1, title: "Entity Details", active: true, completed: currentStep > 1, visible: true },
    { number: 2, title: "Portfolio", active: true, completed: currentStep > 2, visible: true },
    { number: 3, title: "Performance", active: true, completed: currentStep > 3, visible: true },
    { number: 4, title: "Actions", active: true, completed: currentStep > 4, visible: true },
    { number: 5, title: "Advocacy", active: true, completed: currentStep > 5, visible: true },
    { number: 6, title: "EP100", active: true, completed: currentStep > 6, visible: showEP100 },
  ];

  const visibleSteps = steps.filter((s) => s.visible);
  const maxStep = visibleSteps[visibleSteps.length - 1]?.number || 5;
  const isLastStep = currentStep === maxStep;

  const goNext = () => {
    if (isLastStep) return;
    let next = currentStep + 1;
    while (next <= 6 && !steps.find((s) => s.number === next)?.visible) {
      next++;
    }
    if (next <= 6) setCurrentStep(next);
  };

  const goPrev = () => {
    if (currentStep <= 1) return;
    let prev = currentStep - 1;
    while (prev >= 1 && !steps.find((s) => s.number === prev)?.visible) {
      prev--;
    }
    if (prev >= 1) setCurrentStep(prev);
  };

  if (!signatory && !isUpload) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-[#1d4354] mb-2">
          No Organisation Selected
        </h2>
        <p className="text-[#373737] mb-6">
          Please select your organisation from the home page to begin reporting.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#3c886c] text-white px-6 py-2.5 font-semibold text-sm hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] transition-colors"
        >
          Go to Home Page
        </button>
      </div>
    );
  }

  if (submitted) {
    const displayName = isUpload
      ? uploadEntityName || "your organisation"
      : signatory?.name || "your organisation";
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6fda44]/10 mb-6">
          <CheckCircle2 size={40} className="text-[#6fda44]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1d4354] mb-2">
          Submission Complete
        </h2>
        <p className="text-[#373737] mb-2">
          Thank you, <strong>{displayName}</strong>. Your NZCB Commitment
          report has been submitted successfully.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          A confirmation email will be sent to the submitter address provided.
          You can access your submission data from the WorldGBC reporting
          dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
            }}
            className="bg-white text-[#3c886c] border-2 border-[#3c886c] px-6 py-2.5 font-semibold text-sm hover:bg-[#3c886c] hover:text-white transition-colors"
          >
            Edit Submission
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-[#3c886c] text-white px-6 py-2.5 font-semibold text-sm hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Upload data banner */}
      {isUpload && uploadBannerVisible && (
        <div className="bg-[#3c886c]/5 border border-[#3c886c]/30 p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={16} className="text-[#3c886c] flex-shrink-0" />
            <p className="text-xs text-[#1d4354]">
              <span className="font-semibold">Data loaded from uploaded Excel file.</span>{" "}
              Please review all fields carefully and fill in any missing information.
            </p>
          </div>
          <button
            onClick={() => setUploadBannerVisible(false)}
            className="text-xs text-gray-400 hover:text-gray-600 ml-4 flex-shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Signatory / Upload banner */}
      {isUpload ? (
        <div className="bg-white border border-gray-200 p-3 mb-6 flex items-center justify-between shadow-[6px_6px_9px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3c886c]/10 flex items-center justify-center">
              <FileSpreadsheet size={16} className="text-[#3c886c]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1d4354]">
                {uploadEntityName || "Uploaded Form Data"}
              </p>
              <p className="text-xs text-gray-500">
                Pre-populated from Excel upload
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs text-[#3c886c] hover:text-[#1d4354] underline font-medium"
          >
            Start Over
          </button>
        </div>
      ) : signatory ? (
        <div className="bg-white border border-gray-200 p-3 mb-6 flex items-center justify-between shadow-[6px_6px_9px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3c886c]/10 flex items-center justify-center">
              <span className="text-sm font-bold text-[#3c886c]">
                {signatory.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1d4354]">
                {signatory.name}
              </p>
              <p className="text-xs text-gray-500">
                {signatory.country} &middot; v{signatory.commitmentVersion} &middot;{" "}
                {signatory.businessType}
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs text-[#3c886c] hover:text-[#1d4354] underline font-medium"
          >
            Change
          </button>
        </div>
      ) : null}

      {/* Step indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-gray-200 shadow-[6px_6px_9px_rgba(0,0,0,0.2)] p-6 sm:p-8 mb-6">
          {currentStep === 1 && <SectionDetails form={form} />}
          {currentStep === 2 && <SectionPortfolio form={form} />}
          {currentStep === 3 && (
            <SectionPerformance
              form={form}
              showEmbodiedCarbon={showEmbodiedCarbon}
            />
          )}
          {currentStep === 4 && <SectionActions form={form} />}
          {currentStep === 5 && <SectionAdvocacy form={form} />}
          {currentStep === 6 && showEP100 && <SectionEP100 form={form} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep <= 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm transition-colors ${
              currentStep <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#1d4354] hover:text-[#3c886c] hover:bg-white"
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={saveDraft}
              className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#3c886c] bg-white text-[#3c886c] font-medium text-sm hover:bg-[#3c886c] hover:text-white transition-colors"
            >
              <Save size={14} />
              {draftSaved ? (
                <span className="text-[#6fda44]">Saved!</span>
              ) : (
                "Save Draft"
              )}
            </button>

            {isLastStep ? (
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 bg-[#3c886c] text-white font-semibold text-sm hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] shadow-md hover:shadow-lg transition-all"
              >
                <Send size={14} />
                Submit Report
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#3c886c] text-white font-semibold text-sm hover:bg-white hover:text-[#3c886c] border-2 border-[#3c886c] transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Validation errors summary */}
        {formState.errors && Object.keys(formState.errors).length > 0 && isLastStep && (
          <div className="mt-4 bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Please fix the following errors before submitting:
                </p>
                <ul className="mt-1 text-xs text-red-600 list-disc list-inside space-y-0.5">
                  {Object.entries(formState.errors).map(([key, error]) => {
                    if (error && typeof error === "object" && "message" in error) {
                      return (
                        <li key={key}>
                          {String(error.message)}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 w-64 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 w-48 mx-auto" />
          </div>
        </div>
      }
    >
      <FormContent />
    </Suspense>
  );
}
