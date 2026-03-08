import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import Features from "@/components/landing/Features";
import UseCases from "@/components/landing/UseCases";
import CodeExample from "@/components/landing/CodeExample";
import QuickStart from "@/components/landing/QuickStart";
import DocsOverview from "@/components/landing/DocsOverview";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground scroll-smooth">
    <Header />
    <Hero />
    <SocialProof />
    <Features />
    <UseCases />
    <CodeExample />
    <QuickStart />
    <DocsOverview />
    <Footer />
  </div>
);

export default Index;
