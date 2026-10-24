import { useNavigate, useParams } from "react-router-dom";
import { useGetCampusQuery } from "../store/tcmsApi";

export function CampusDetailPage() {
  const navigate = useNavigate();
  const { campusId } = useParams();
  const { data: campus } = useGetCampusQuery(campusId ?? "", { skip: !campusId });

  if (!campus) {
    return (
      <section className="surface-panel">
        <h3>Campus Not Found</h3>
        <p className="lead">The selected campus record does not exist.</p>
        <button type="button" className="btn btn-primary" onClick={() => navigate("/campus-management?tab=campuses")}>Back to Listing</button>
      </section>
    );
  }

  return (
    <div className="module-page-stack">
      <section className="surface-panel">
        <div className="panel-head">
          <h3>{campus.campusName}</h3>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/campus-management?tab=campuses")}>Back to Listing</button>
        </div>
        <p className="lead">Full campus profile including operations, capacity, facilities, timings, permissions, and analytics.</p>
      </section>

      <section className="detail-grid">
        <article className="surface-panel detail-card">
          <h3>Basic Information</h3>
          <div className="kv-grid">
            <div><span>Campus Name</span><strong>{campus.campusName}</strong></div>
            <div><span>Campus Code</span><strong>{campus.campusCode}</strong></div>
            <div><span>School</span><strong>{campus.schoolName}</strong></div>
            <div><span>City</span><strong>{campus.city}</strong></div>
            <div><span>Address</span><strong>{campus.basic.address}</strong></div>
            <div><span>State</span><strong>{campus.basic.state}</strong></div>
            <div><span>Pincode</span><strong>{campus.basic.pincode}</strong></div>
            <div><span>Latitude</span><strong>{campus.basic.latitude}</strong></div>
            <div><span>Longitude</span><strong>{campus.basic.longitude}</strong></div>
            <div><span>Status</span><strong>{campus.status}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Principal</h3>
          <div className="kv-grid">
            <div><span>Name</span><strong>{campus.principal.name}</strong></div>
            <div><span>Mobile</span><strong>{campus.principal.mobile}</strong></div>
            <div><span>Email</span><strong>{campus.principal.email}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Capacity</h3>
          <div className="kv-grid">
            <div><span>Maximum Students</span><strong>{campus.capacity.maxStudents}</strong></div>
            <div><span>Current Students</span><strong>{campus.capacity.currentStudents}</strong></div>
            <div><span>Maximum Teachers</span><strong>{campus.capacity.maxTeachers}</strong></div>
            <div><span>Current Teachers</span><strong>{campus.capacity.currentTeachers}</strong></div>
            <div><span>Buildings</span><strong>{campus.capacity.buildings}</strong></div>
            <div><span>Classrooms</span><strong>{campus.capacity.classrooms}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Academic</h3>
          <div className="kv-grid">
            <div><span>Academic Session</span><strong>{campus.academic.session}</strong></div>
            <div><span>Classes</span><strong>{campus.academic.classes}</strong></div>
            <div><span>Sections</span><strong>{campus.academic.sections}</strong></div>
            <div><span>Streams</span><strong>{campus.academic.streams}</strong></div>
            <div className="span-2"><span>Subjects</span><strong>{campus.academic.subjects}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Facilities</h3>
          <div className="checkbox-grid">
            {[
              "Library",
              "Hostel",
              "Transport",
              "Cafeteria",
              "Smart Classes",
              "Laboratory",
              "Sports Complex"
            ].map((facility) => (
              <label key={facility} className="check-pill">
                <input type="checkbox" checked={campus.facilities.includes(facility)} readOnly />
                <span>{facility}</span>
              </label>
            ))}
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Statistics</h3>
          <div className="kv-grid">
            <div><span>Students</span><strong>{campus.students}</strong></div>
            <div><span>Teachers</span><strong>{campus.teachers}</strong></div>
            <div><span>Attendance %</span><strong>{campus.statistics.attendance}</strong></div>
            <div><span>Fees Collection</span><strong>{campus.statistics.feesCollection}</strong></div>
            <div><span>Pending Fees</span><strong>{campus.statistics.pendingFees}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card">
          <h3>Timings</h3>
          <div className="kv-grid">
            <div><span>Opening Time</span><strong>{campus.timings.openingTime}</strong></div>
            <div><span>Closing Time</span><strong>{campus.timings.closingTime}</strong></div>
            <div><span>Weekly Off</span><strong>{campus.timings.weeklyOff}</strong></div>
            <div><span>Holidays</span><strong>{campus.timings.holidays}</strong></div>
          </div>
        </article>

        <article className="surface-panel detail-card span-all">
          <h3>Permissions</h3>
          <div className="permissions-grid">
            {campus.permissions.map((group) => (
              <div key={group.module} className="permission-card">
                <h4>{group.module}</h4>
                <div className="permission-list">
                  {group.permissions.map((permission) => (
                    <div key={permission.name} className="permission-row">
                      <span>{permission.name}</span>
                      <strong>{permission.enabled ? "Enabled" : "Disabled"}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
