import { Star, Download, Package } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { icon: Star, label: "GitHub Stars", value: "150+" },
  { icon: Download, label: "Monthly Downloads", value: "320K+" },
  { icon: Package, label: "Versions Released", value: "87" },
];

const SocialProof = () => (
  <section className="py-16 border-y bg-muted/20">
    <div className="container max-w-4xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider"
      >
        Trusted by the OpenAPI community
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <m.icon className="h-6 w-6 text-primary" />
            <span className="text-3xl font-extrabold tracking-tight">{m.value}</span>
            <span className="text-sm text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        More OpenAPI tools from the community can be found on{" "}
        <a
          href="https://openapi.tools/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          openapi.tools
        </a>
        .
      </motion.p>
    </div>
  </section>
);

export default SocialProof;
