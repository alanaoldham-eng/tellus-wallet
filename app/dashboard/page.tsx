export const dynamic = "force-dynamic";
import { Header } from "@/components/Header";
import { DashboardView } from "@/components/DashboardView";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <DashboardView />
    </>
  );
}
