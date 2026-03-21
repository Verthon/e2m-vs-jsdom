import { HomeNavbar } from "../components/HomeNavbar";
import { Hero } from "../components/Hero/Hero";
import { MetricsBar } from "../components/MetricsBar/MetricsBar";
import { HomeFooter } from "../components/HomeFooter/HomeFooter";

const HomePage = () => {
  return (
    <div className="bg-surface text-on-surface antialiased">
      <HomeNavbar />
      <main className="pt-16">
        <Hero />
        <MetricsBar />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
