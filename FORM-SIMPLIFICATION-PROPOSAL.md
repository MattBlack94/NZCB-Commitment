# NZCB Commitment Reporting Form - Simplification Proposal

## Executive Summary

This proposal redesigns the NZCB Commitment Reporting Form from a 12-tab Excel workbook into a streamlined web-first experience with Excel upload as a fallback. The redesign targets three outcomes:

1. **Reduce completion time by ~40%** through pre-population, conditional logic, and question consolidation
2. **Improve data quality** through validation, structured inputs, and elimination of ambiguous free-text fields
3. **Lower the support burden** by making guidance contextual rather than embedded in data-entry space

---

## Current Form Audit

### Structure (12 tabs, ~47 distinct questions)

| Tab | Type | Questions | Core Issues |
|-----|------|-----------|-------------|
| 0. About | Info | 0 | Long instructional text; most returning signatories skip it |
| Record | Dashboard | 0 | Pre-filled; useful but disconnected from data entry tabs |
| 1. Entity Details | Admin | ~8 | Climate initiative checklist is 10 rows; consent section is 3 separate acknowledgements |
| 2. Commit | Portfolio | ~8 | 11 asset type rows (6 existing + 5 new dev); heavy inline guidance in cols H-J |
| 3. Disclose | Performance | ~6 | Mixes operational carbon (rows 14-39) with embodied carbon (rows 42-66); manual unit converter |
| 4. Act | Strategy | ~9 | Roadmap table (rows 16-33) and Implementation Plan table (rows 46-61) duplicate action types |
| 5. Verify | Assurance | ~5 | Three near-identical detail blocks (certification, verification, other) |
| 6. Advocate | Influence | ~3 | 7x8 free-text matrix (56 cells) is intimidating and sparsely filled |
| 7. EP100 | Partner | ~8 | Retained as-is (Climate Group requirement) |
| Do not edit / MASTERSHEET / Lists | System | 0 | Lookup data for dropdowns |

### Cross-Cutting Problems

- **No conditional logic**: All signatories see all questions regardless of stage, commitment version, or entity type
- **No pre-population**: Returning signatories re-enter entity details and baseline data already held by WorldGBC
- **Guidance mixed with data entry**: Paragraphs of instructions sit alongside input cells, making it hard to scan
- **Redundant tables**: The Roadmap and Implementation Plan tables in Tab 4 use the same 8 action categories
- **Inconsistent structure**: Some tabs use column B for core/optional labels, others use different layouts
- **Manual calculations**: Unit conversions, totals, and intensity calculations require manual work or fragile formulas

---

## Proposed Redesign

### Design Principles

1. **Show only what's relevant** - Use conditional logic based on signatory profile (year joined, commitment version, entity type)
2. **Don't ask what you already know** - Pre-populate from MASTERSHEET and previous submissions
3. **One question, one purpose** - Eliminate overlapping tables and redundant fields
4. **Structured over free-text** - Use dropdowns, checkboxes, and constrained inputs wherever possible
5. **Guidance on demand** - Tooltips and expandable help sections, not inline paragraphs

### Recommended Platform Approach

**Primary: Web form** (e.g., custom-built, or platforms like Typeform/JotForm/MS Forms with logic)
**Fallback: Simplified Excel template** for signatories who prefer offline completion, with an upload mechanism

The web form should mirror the simplified Excel structure so that data from either channel maps to the same database.

---

### New Form Structure

The 7 signatory-facing tabs are consolidated into **5 sections**, with conditional display:

```
CURRENT (7 tabs)              PROPOSED (5 sections)
─────────────────             ─────────────────────
1. Entity Details       -->   Section 1: Your Details (simplified)
2. Commit               -->   Section 2: Your Portfolio
3. Disclose             -->   Section 3: Performance Data
                                 3A: Operational Carbon
                                 3B: Embodied Carbon (conditional: updated commitment only)
4. Act                  -->   Section 4: Decarbonisation Actions (merged roadmap + implementation)
5. Verify                     (folded into Section 3 as verification sub-section)
6. Advocate             -->   Section 5: Advocacy
7. EP100                -->   Section 6: EP100 (conditional: EP100 members only)
```

---

### Section-by-Section Redesign

#### Section 1: Your Details

**Goal**: Confirm identity, update contact info, capture consent

**Pre-populated fields** (editable):
- Entity name (from MASTERSHEET)
- Signatory ID
- Year joined
- Commitment version
- Known climate initiative memberships (EP100, SBTi, etc. from MASTERSHEET)

**New fields to complete**:
- Submitter name and email
- Update any climate initiative memberships (checkbox list, not a table)
- Single consolidated consent checkbox (replace 3 separate acknowledgements with one clear statement covering WorldGBC and Climate Group data disclosure)
- Marketing opt-in (Yes/No)
- Digital signature / typed name confirmation

**Removed**:
- The 10-row climate initiative table format (replaced with checkboxes)
- Separate consent blocks for WorldGBC and Climate Group (merged)
- "Report confirmation" section at bottom (moved to final submission step)

**Estimated reduction**: From ~8 questions across 47 rows to ~5 questions in a single screen

---

#### Section 2: Your Portfolio

**Goal**: Capture current portfolio composition and changes

**Pre-populated** (from previous submission):
- Previous year's asset counts and areas by type
- Baseline year data

**Simplified asset classification** (from 11 types to 5):

| Current (11 types) | Proposed (5 types) |
|--------------------|--------------------|
| Individual dwelling | Residential |
| Tenanted area in multi-unit building | Tenanted space |
| Base building (single) | Whole building (single) |
| Base building (multiple) | Whole building (multi-building/campus) |
| Whole building (single) | New development / major renovation |
| Whole building (multiple) | |
| Any other classification | |
| Single building development | |
| Multi-building development | |
| Major renovation (tenanted) | |
| Major renovation (single) | |
| Major renovation (multi-building) | |
| Any other classification | |

**Rationale**: The distinction between "base building" and "whole building" can be captured by a single toggle ("Does your data cover common areas only, or the whole building?") rather than separate rows. New developments and major renovations are combined since the data collected is identical.

**Other changes**:
- Area measurement type: Single dropdown (GFA, GLA, NLA, NIA, CFA, Other) instead of free-text
- Portfolio changes: Structured input ("Assets added: ___, Assets removed: ___, Reason: [dropdown + free text]") instead of open narrative
- Target year: Pre-populated from previous submission, editable

**Removed**:
- Inline guidance paragraphs in columns H-J (moved to tooltips)
- "Additional scopes and ambition" optional questions (move to Section 5 or a separate annual survey)
- Manual "Add row above" instructions (web form handles dynamic rows; Excel uses a simpler fixed list)

---

#### Section 3: Performance Data

Split into two conditional sub-sections.

##### Section 3A: Operational Carbon (all signatories at Disclose stage+)

**Pre-populated**:
- Baseline year data (from Record tab / previous submissions)
- Reporting period dates (default to current reporting cycle)
- GHG accounting standard (from previous submission)

**Simplified data table**:

| Metric | Unit | This Reporting Period | Renewable (on-site) | Renewable (off-site) | Offsets |
|--------|------|-----------------------|----------------------|----------------------|--------|
| Gross floor area | m2 | ___ | | | |
| Electricity | MWh | ___ | ___ | ___ | |
| Fuels | MWh | ___ | | | |
| District heating/cooling | MWh | ___ | | | |
| Scope 1 | tCO2e | ___ | | | ___ |
| Scope 2 (location-based) | tCO2e | ___ | | | |
| Scope 2 (market-based) | tCO2e | ___ | | | |

**Changes from current**:
- Baseline column removed from data entry (pre-populated and shown as read-only reference)
- Intensity auto-calculated (no manual entry)
- Totals auto-calculated
- Manufacturing/process loads: conditional field shown only for relevant entity types (manufacturers)
- Refrigerant emissions: Yes/No toggle with conditional quantity field
- Unit input: Dropdown to select input unit (kWh/MWh, sqft/m2, kgCO2e/tCO2e) with auto-conversion, replacing the manual conversion rows

**Measurement methodology** (currently Tab 3 rows 76-84): Simplified to a single dropdown per asset or a portfolio-level summary:
- "What % of your data is from actual metered data?" [slider or percentage input]
- "What is the primary source for non-metered data?" [dropdown]

**Verification** (currently Tab 5, folded in here):
- "How was this data verified?" [dropdown: Third-party certification / Third-party verification / SME self-assessment / Other]
- Conditional detail fields based on selection (verifier name, date, link to report)
- This eliminates three near-identical detail blocks from the current Tab 5

**Public disclosure link**: Single URL field (retained from current form)

##### Section 3B: Embodied Carbon (conditional - only for updated commitment signatories with new developments)

**Trigger**: Only shown if signatory has updated to 2021 commitment version AND reports new developments/major renovations in Section 2.

**Simplified asset-level table**:

| Field | Input Type |
|-------|-----------|
| Asset name | Text |
| Completion year | Dropdown (year) |
| Building type | Dropdown (from Lists) |
| Area (m2) | Number |
| Upfront carbon A1-A5 (tCO2e) | Number |
| Calculation tool used | Dropdown + Other |
| Database submitted to | Dropdown + Other |
| LCA conducted? | Yes/No |
| LCA attachment | File upload |

**Changes from current**:
- Collapsed A1-A3, A4, A5 into a single "Total A1-A5" field (the breakdown is rarely available and adds complexity). The detailed breakdown can be an optional expandable section for signatories who have it.
- Compensated emissions moved to a conditional field
- Dynamic rows in web form; fixed 10 rows in Excel fallback

---

#### Section 4: Decarbonisation Actions

**Goal**: Capture both strategic targets (roadmap) AND specific actions (implementation) in one unified table

**Current problem**: Tab 4 has two large tables that both list the same 8 action categories (Energy Efficiency, Electrification, Fuel Switching, Renewable on-site, Renewable off-site, Embodied Carbon, Carbon Offsets, Other). Signatories describe the same work twice - once as a "target/milestone" and again as a "specific action."

**Proposed: Single unified table**

Each row = one decarbonisation action:

| Field | Input Type | Notes |
|-------|-----------|-------|
| Action category | Dropdown | Energy Efficiency, Electrification, Fuel Switching, Renewable (on-site), Renewable (off-site), Embodied Carbon Reduction, Carbon Offsets, Other |
| Target | Text (short) | e.g., "50% improvement by 2030" |
| Key milestones | Text | e.g., "20% by 2024, 35% by 2026" |
| Current progress | Text (short) | e.g., "Achieved 15% reduction through LED retrofit" |
| Status | Dropdown | Not started / In progress / Completed |
| Scope | Dropdown | Asset level / Portfolio level |
| Expected completion | Date (MM/YY) | |
| Energy saving (MWh) | Number (optional) | |
| Carbon reduction (tCO2e) | Number (optional) | |

**This replaces**:
- Roadmap table (current rows 16-33) - 8 action types x 4 columns
- Implementation plan table (current rows 46-61) - 8 action types x 9 columns
- Two separate "have you developed a roadmap/implementation plan?" Yes/No questions

**Additional questions retained**:
- "Has quality assurance been undertaken on the implementation plan?" (Yes/No + details)
- Predicted contribution breakdown by strategy type (% table - simplified to a single pie-chart-style input)
- Electrification/fuel switching plans (Yes/No + details)
- Carbon offset type and source (dropdown + link)

**Estimated reduction**: From ~50 rows of tables + 9 questions to ~15 dynamic rows + 4 questions

---

#### Section 5: Advocacy

**Goal**: Capture advocacy actions in a way that's less intimidating and more likely to get quality responses

**Current problem**: A 7-stakeholder x 8-action-type matrix = 56 free-text cells. Most are left blank. The examples are helpful but the matrix format is overwhelming.

**Proposed: Structured list format**

Replace the matrix with:

**Question 1**: "Do you have an advocacy programme in place?" [Yes / No / In development]

**Question 2**: "Please describe your top advocacy actions (up to 8):"

Each action = one row:

| Field | Input Type |
|-------|-----------|
| Stakeholder type | Dropdown: Tenants, Owners/Developers, Manufacturers, Policymakers, Customers/Clients, Contractors, Other |
| Action type | Dropdown: Tenant support, Sustainability services, Supplier engagement, Membership/partnership, Events/speaking, Embodied carbon, Whole life carbon, Other |
| Description | Text (max 200 words) |
| Link (optional) | URL |

**Question 3** (optional): "Any additional information about your commitment?" [Text field - replaces current optional question]

**Rationale**: A list of up to 8 concrete actions will yield better data than 56 mostly-empty matrix cells. The dropdowns preserve the ability to analyse by stakeholder and action type.

---

#### Section 6: EP100 (Conditional)

**Shown only to**: Signatories who are also EP100 members (identifiable from MASTERSHEET column L and Entity Details checkbox)

**Retained as-is** per Climate Group requirements. Minor formatting improvements only:
- Add dropdowns for Yes/No fields
- Add currency dropdown for financial savings
- Structure the heating/cooling section with percentage sliders

---

### Summary of Changes

| Metric | Current | Proposed | Change |
|--------|---------|----------|--------|
| Tabs/Sections visible to a typical signatory | 7 | 4-5 | -30% to -43% |
| Asset type classifications | 11 | 5 | -55% |
| Advocacy matrix cells | 56 | Up to 8 structured rows | -85% |
| Separate tables for roadmap + implementation | 2 (17 rows each) | 1 unified table | -50% |
| Verification detail blocks | 3 identical blocks | 1 conditional block | -67% |
| Inline instruction paragraphs | ~15 | 0 (moved to tooltips) | -100% |
| Manual unit conversion cells | 4 | 0 (auto-conversion) | -100% |
| Consent acknowledgements | 3 | 1 | -67% |
| Pre-populated fields for returning signatories | 0 | ~15-20 | New |

---

## Excel Fallback Template

For signatories who prefer Excel upload, provide a **simplified template** that mirrors the web form structure:

| Tab | Contents |
|-----|----------|
| Instructions | One-page guide (replaces current multi-page "About" tab) |
| 1. Details | Entity info, climate initiatives (checkboxes), consent |
| 2. Portfolio | Simplified 5-type asset table, area measurement, changes |
| 3. Performance | 3A operational carbon table + verification + 3B embodied carbon table |
| 4. Actions | Unified decarbonisation actions table |
| 5. Advocacy | List-format advocacy actions |
| 6. EP100 | Retained (only included in EP100 member version) |
| Lists | Dropdown source data (hidden) |

Two versions of the Excel template should be distributed:
1. **Standard** (Sections 1-5) - for non-EP100 signatories
2. **EP100** (Sections 1-6) - for EP100 members

---

## Implementation Considerations

### Data Migration
- Map all current MASTERSHEET fields to the new structure
- Ensure previous submission data can pre-populate the new form
- Create a crosswalk between old asset classifications and new ones

### Backwards Compatibility
- Year-over-year trend analysis needs mapping between old and new field structures
- The Record tab / dashboard should continue to work with data from both old and new formats

### Phased Rollout Option

If a full redesign is too ambitious for the next reporting cycle:

**Phase 1 (next cycle)**: Simplify the Excel form only
- Merge Roadmap + Implementation Plan tables
- Simplify asset classifications
- Replace advocacy matrix with list format
- Fold Verify into Disclose tab

**Phase 2 (following cycle)**: Launch web form
- Conditional logic and pre-population
- Auto-calculations and unit conversion
- File upload for LCA attachments
- Excel upload as alternative channel

---

## Next Steps

1. Review this proposal with the Commitment Taskforce and Technical Working Group
2. Decide on phased vs. full rollout
3. Select web form platform (or decide to build custom)
4. Create field-level mapping document (current form --> new structure)
5. Pilot with 5-10 returning signatories for feedback
6. Develop simplified Excel template in parallel
