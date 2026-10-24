import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CampusCapacityPage } from "./CampusCapacityPage";
import { CampusesPage } from "./CampusesPage";

type CampusManagementTab = "campuses" | "capacity";

const tabs: Array<{ key: CampusManagementTab; label: string }> = [
  { key: "campuses", label: "Campuses" },
  { key: "capacity", label: "Campus Capacity" }
];

export function CampusManagementPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentTab = useMemo<CampusManagementTab>(() => {
    const value = searchParams.get("tab");
    return value === "capacity" ? "capacity" : "campuses";
  }, [searchParams]);

  function openTab(tab: CampusManagementTab) {
    navigate(`/campus-management?tab=${tab}`, { replace: true });
  }

  return (
    <div className="module-page-stack">
      <section className="module-tabs" aria-label="Campus Management Sections">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={currentTab === tab.key ? "module-tab active" : "module-tab"}
            onClick={() => openTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {currentTab === "campuses" ? <CampusesPage embedded /> : <CampusCapacityPage embedded />}
    </div>
  );
}
