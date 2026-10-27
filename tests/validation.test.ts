import assert from "node:assert/strict";
import { test } from "node:test";
import { karachiToday, toPkInternational, validateFields, type FieldDef } from "../src/lib/validation.ts";

test("normalizes Pakistan phone numbers", () => {
  assert.equal(toPkInternational("0343-7894566"), "923437894566");
  assert.equal(toPkInternational("+92 343 7894566"), "923437894566");
  assert.equal(toPkInternational("00923437894566"), "923437894566");
  assert.equal(toPkInternational("021-34567890"), "922134567890");
  assert.equal(toPkInternational("343-7894566"), null);
  assert.equal(toPkInternational("0343-789456"), null);
});

test("karachiToday uses Asia/Karachi (UTC+5)", () => {
  assert.equal(karachiToday(new Date("2026-01-01T19:30:00Z")), "2026-01-02");
  assert.equal(karachiToday(new Date("2026-01-01T18:59:00Z")), "2026-01-01");
});

test("validateFields reports required, format and range errors", () => {
  const fields: FieldDef[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "units", label: "Units", type: "number", min: 1, max: 50 },
    { name: "plan", label: "Plan", type: "select", options: ["A", { value: "B", label: "Plan B" }] },
    { name: "email", label: "Email", type: "email" },
  ];
  const today = "2026-05-10";

  const bad = validateFields(fields, { name: "  ", phone: "123", date: "2026-05-09", units: "0", plan: "C", email: "x@" }, { today });
  assert.deepEqual(Object.keys(bad.errors).sort(), ["date", "email", "name", "phone", "plan", "units"]);

  const good = validateFields(fields, { name: " Ali ", phone: "0343 7894566", date: "2026-05-10", units: "7", plan: "B" }, { today });
  assert.deepEqual(good.errors, {});
  assert.equal(good.values.name, "Ali");
  assert.equal(good.values.email, "");
});
