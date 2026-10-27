import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWhatsAppMessage, isFormId, summarize } from "../src/lib/forms.ts";
import { whatsappMessages } from "../src/lib/whatsapp.ts";

test("isFormId accepts only known form ids", () => {
  assert.equal(isFormId("booking"), true);
  assert.equal(isFormId("office"), true);
  assert.equal(isFormId("contact"), true);
  assert.equal(isFormId("billing"), false);
  assert.equal(isFormId(null), false);
});

test("summarize uses select labels and skips empty fields", () => {
  const text = summarize("booking", {
    name: "Ali",
    phone: "0343-7894566",
    service: "ac-repair",
    date: "2026-06-01",
    address: "Block 4, Gulistan-e-Jauhar",
    time: "",
    email: "",
  });
  assert.match(text, /Your name: Ali/);
  assert.match(text, /Service needed: AC Repair/);
  assert.doesNotMatch(text, /Preferred time:/);
  assert.doesNotMatch(text, /Email:/);
});

test("buildWhatsAppMessage prefixes the form intro", () => {
  const message = buildWhatsAppMessage("contact", {
    name: "Sara",
    phone: "0343-7894566",
    message: "Need a FoamJet clean",
  });
  assert.ok(message.startsWith(whatsappMessages.general));
  assert.match(message, /Your name: Sara/);
  assert.match(message, /Message: Need a FoamJet clean/);
});
