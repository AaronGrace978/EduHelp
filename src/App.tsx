import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { CollegesPage } from "@/pages/CollegesPage";
import { PowerFaidsPage } from "@/pages/PowerFaidsPage";
import { DisabilityPage } from "@/pages/DisabilityPage";
import { BooksPage } from "@/pages/BooksPage";
import { RateMyProfessorPage } from "@/pages/RateMyProfessorPage";
import { HistoryPage } from "@/pages/HistoryPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="colleges" element={<CollegesPage />} />
        <Route path="powerfaids" element={<PowerFaidsPage />} />
        <Route path="disability" element={<DisabilityPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="rmp" element={<RateMyProfessorPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
