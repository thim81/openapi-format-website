import { ArrowUpDown, Filter, FileCode, Layers, SplitSquareVertical, RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const items = [
  { icon: ArrowUpDown, title: "Sort", desc: "Alphabetically sort fields, paths, and components for consistent ordering.", link: "/docs/sorting" },
  { icon: Filter, title: "Filter", desc: "Remove internal endpoints, tags, or unused components before publishing.", link: "/docs/filtering" },
  { icon: FileCode, title: "Format", desc: "Standardise casing, indentation, and structure across your specs.", link: "/docs/formatting" },
  { icon: Layers, title: "Overlay", desc: "Apply overlays to add or override parts of your OpenAPI document.", link: "/docs/overlays" },
  { icon: SplitSquareVertical, title: "Split & Bundle", desc: "Split large specs into files or bundle multiple files into one.", link: "/docs/split-bundle" },
  { icon: RefreshCw, title: "Convert", desc: "Convert between JSON and YAML, or between OpenAPI versions.", link: "/docs/convert" },
];

const Features = () => (
  <section id="features" className="py-20 bg-muted/30">
    <div className="container max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Features
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link to={f.link} className="block h-full group">
              <Card className="border bg-card h-full transition-colors group-hover:border-primary/40">
                <CardHeader>
                  <f.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                  <span className="inline-flex items-center gap-1 text-sm text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read docs <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
