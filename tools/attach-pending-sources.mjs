import { readFile, writeFile } from 'node:fs/promises';
const path = 'content/ophthalmology/topic-groups.json';
const data = JSON.parse(await readFile(path, 'utf8'));
const routes = [
  ['السيكلوسبورين أ', 'glaukom-konservierungsmittel-augenoberflaeche'],
  ['تدبير رضوض الجزء الأمامي', 'ophthalmologisches-trauma-89c95dd'],
  ['Enhancing nAMD', 'patientenversorgung-bei-namd-im-klinischen-alltag-erleichtern-ca3cdcc'],
  ['تسهيل رعاية مرضى التنكس البقعي', 'patientenversorgung-bei-namd-im-klinischen-alltag-erleichtern-ca3cdcc'],
  ['منظور طب النظم', 'patientenversorgung-bei-namd-im-klinischen-alltag-erleichtern-ca3cdcc'],
  ['Pathophysiology and Advanced Management of Diabetic Macular Edema', 'diabetes-und-das-auge-ein-briefing-zu-pathophysiologie-therapie-und-ma-a15e4d8'],
  ['وذمة البقعية السكرية', 'diabetes-und-das-auge-ein-briefing-zu-pathophysiologie-therapie-und-ma-a15e4d8'],
  ['Macular Edema: An Update', 'briefing-therapie-und-praxis-bei-makulaodem-ein-update-5db5fd5'],
  ['تحديثات علاج الجلوكوما 2025', 'glaukomtherapie-2025-eine-synthese-aktueller-schlusselstudien-3e3e0e5'],
  ['تحديثات تشخيص الجلوكوما', 'briefing-aktuelle-entwicklungen-in-der-glaukomdiagnostik-update-2025-33ea69d'],
  ['رؤى حديثة في أبحاث الجلوكوما', 'translationale-glaukomforschung-perspektiven-herausforderungen-und-zuk-ade908a'],
  ['النتائج الوظيفية في حالات الجلوكوما لدى الأطفال', 'funktionelles-outcome-bei-kindlichen-glaukomerkrankungen-eine-synthese-81d3e63'],
  ['رؤى حول علاج الجلوكوما الخلقية', 'therapie-des-kindlichen-glaukoms-5efb764'],
  ['المؤشرات الحيوية والتصوير', 'retinale-biomarker-und-ki-bildgebung'],
  ['اعتلالات الجسم الزجاجي وانفصال الشبكية', 'management-der-vitreoretinalen-grenzflache-und-netzhautabhebungen-klin-8fee993'],
  ['أدوية طويلة المفعول لأمراض الشبكية', 'langwirksame-anti-vegf-therapie-netzhaut'],
  ['Anti-VEGF', 'langwirksame-anti-vegf-therapie-netzhaut'],
  ['رؤى متعمقة حول الوذمة البقعية السكرية', 'diabetes-und-das-auge-ein-briefing-zu-pathophysiologie-therapie-und-ma-a15e4d8'],
  ['زراعة العدسات الثانوية', 'facharzt-repetitorium-kataraktchirurgie-bei-diabetes-mellitus-und-nach-c947f1c'],
  ['مبادئ تفسير فحص التصوير المقطعي', 'oct-interpretation-2f81e72'],
  ['تحديث DOG 2025', 'zur-altersbedingten-makuladegeneration-amd-fur-die-facharztprufung-a477b2a'],
  ['رؤى حديثة حول علاج الوذمة البقعية', 'briefing-therapie-und-praxis-bei-makulaodem-ein-update-5db5fd5'],
  ['مستجدات علاج الجلوكوما 2025', 'glaukomtherapie-2025-eine-synthese-aktueller-schlusselstudien-3e3e0e5'],
  ['ملخص إحاطة: تسهيل رعاية المرضى', 'patientenversorgung-bei-namd-im-klinischen-alltag-erleichtern-ca3cdcc'],
  ['ملخص شامل: منهجية المراجعات', 'systematische-abklaerung-sehverlust-rapd'],
  ['موجز حول اعتلال الشبكية السكري', 'fachspezifischer-leitfaden-zur-diabetischen-retinopathie-vorbereitung--23261ea'],
  ['التظاهرات العينية للأمراض الجهازية', 'ophthalmologische-manifestationen-systemischer-erkrankungen-ein-briefi-3c5a49e'],
  ['موجز إحاطة: رؤى حديثة في طب عيون الأطفال', 'leitfaden-padiatrisches-glaukom-wissenssynthese-fur-die-facharztprufun-e4732b7'],
  ['Optic-Pit', 'optic-pit-makulopathie-2dcc2c9'],
  ['اعتلال اللطخة الناجم عن حفرة العصب البصري', 'optic-pit-makulopathie-2dcc2c9'],
];
let attached = 0;
for (const [needle, targetId] of routes) {
  const target = data.groups.find(g => g.id === targetId);
  if (!target) continue;
  const pending = data.groups.filter(g => !g.bodyDe && !g.summaryDe && String(g.titleDe).includes(needle));
  for (const g of pending) {
    const refs = [g.primary, ...(g.merged || [])];
    target.merged = [...new Set([...(target.merged || []), ...refs])];
    target.sourceLanguages = [...new Set([...(target.sourceLanguages || []), ...(g.sourceLanguages || [])])];
    data.groups = data.groups.filter(x => x !== g);
    attached += refs.length;
  }
}
for (const g of data.groups) {
  const refs = [g.primary, ...(g.merged || [])].join(' ');
  const langs = new Set(g.sourceLanguages || []);
  if (/[\u0600-\u06ff]/.test(refs)) langs.add('ar');
  if (/\b(Briefing Document|Visual Field Analysis|Treatment Strategies|Neuro-Ophthalmic|Enhancing nAMD)\b/.test(refs)) langs.add('en');
  g.sourceLanguages = [...langs];
}
await writeFile(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Attached ${attached} pending source report(s) to existing German chapters.`);
