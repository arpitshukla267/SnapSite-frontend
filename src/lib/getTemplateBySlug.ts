import Template1 from "../templates/template-1.json";
import Template2 from "../templates/template-2.json";
import Template3 from "../templates/template-3.json";
import Template4 from "../templates/template-4.json";
import Template5 from "../templates/template-5.json";
import Template6 from "../templates/template-6.json";

const templatesMap = {
  "template-1": Template1,
  "template-2": Template2,
  "template-3": Template3,
  "template-4": Template4,
  "template-5": Template5,
  "template-6": Template6,
};

export function getTemplateBySlug(slug: string) {
  return templatesMap[slug] || null;
}
