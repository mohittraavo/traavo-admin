import { useGetCampusCapacityQuery } from "../store/tcmsApi";

export function CampusCapacityPage({ embedded = false }: { embedded?: boolean } = {}) {
  const { data: campuses = [] } = useGetCampusCapacityQuery();
  return (
    <div className="module-page-stack">
      {!embedded ? (
        <section>
          <h1>Campus Capacity</h1>
          <p className="lead">Track utilization pressure and remaining seats per campus to plan admissions and staffing.</p>
        </section>
      ) : null}

      <section>
        <h3>Capacity Overview</h3>
        <div className="capacity-list">
          {campuses.map((row) => {
            const studentUsage = Math.round((row.currentStudents / row.maxStudents) * 100);
            const teacherUsage = Math.round((row.currentTeachers / row.maxTeachers) * 100);
            return (
              <article key={row.id} className="capacity-card">
                <div className="capacity-head">
                  <div>
                    <strong>{row.campusName}</strong>
                    <p>{row.schoolName}</p>
                  </div>
                </div>
                <div className="capacity-bar-block">
                  <span>Students: {row.currentStudents} / {row.maxStudents}</span>
                  <div className="capacity-bar-track">
                    <div className="capacity-bar-fill" style={{ width: `${studentUsage}%` }} />
                  </div>
                </div>
                <div className="capacity-bar-block">
                  <span>Teachers: {row.currentTeachers} / {row.maxTeachers}</span>
                  <div className="capacity-bar-track">
                    <div className="capacity-bar-fill teacher" style={{ width: `${teacherUsage}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
