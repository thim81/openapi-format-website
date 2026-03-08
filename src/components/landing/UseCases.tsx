import { Globe, Wrench, GitBranch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const cases = [
  { icon: Globe, title: "Public Docs", desc: "Strip internal endpoints and sort your spec before publishing external documentation." },
  { icon: Wrench, title: "Maintenance", desc: "Keep large OpenAPI files readable and diff-friendly for easier code reviews." },
  { icon: GitBranch, title: "CI/CD", desc: "Automate formatting and filtering in your pipeline to enforce spec standards." },
];

const UseCases = () => (
  <section id="use-cases" className="py-20">
    <div className="container max-w-4xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Use Cases
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="border bg-card h-full">
              <CardHeader>
                <c.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-xl">{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
