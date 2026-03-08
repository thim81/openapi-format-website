import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/components/prism-yaml";

const before = `openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets/{petId}:
    get:
      summary: Get pet by ID
  /pets:
    post:
      summary: Create a pet
    get:
      summary: List all pets
components:
  schemas:
    Pet:
      type: object
    Error:
      type: object`;

const after = `openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets
    post:
      summary: Create a pet
  /pets/{petId}:
    get:
      summary: Get pet by ID
components:
  schemas:
    Error:
      type: object
    Pet:
      type: object`;

const HighlightedCode = ({ code }: { code: string }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);
  return (
    <pre className="rounded-lg border bg-card p-4 text-sm overflow-x-auto font-mono leading-relaxed">
      <code ref={ref} className="language-yaml">{code}</code>
    </pre>
  );
};

const CodeExample = () => (
  <section id="example" className="py-20 bg-muted/30">
    <div className="container max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Before &amp; After
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        {[{ label: "Before", code: before }, { label: "After", code: after }].map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <p className="text-sm font-semibold text-muted-foreground mb-2">{b.label}</p>
            <HighlightedCode code={b.code} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CodeExample;
