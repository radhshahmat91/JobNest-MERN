import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Clock3 } from 'lucide-react';
import { api } from '../lib/api';

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications/mine')
      .then((r) => {
        setApps(r.data.applications);
      })
      .catch((error) => {
        console.error('Failed to load applications:', error);
        setApps([]);
      });
  }, []);

  return (
    <main className="page narrow">
      <span className="eyebrow plain">Your activity</span>

      <h1>Applications</h1>

      <div className="application-list">
        {apps.map((a) => (
          <div className="application" key={a._id}>
            <div className="company-logo">
              {a.job?.company?.[0]}
            </div>

            <div>
              <Link to={`/jobs/${a.job?._id}`}>
                <b>{a.job?.title}</b>
              </Link>

              <p>{a.job?.company}</p>
            </div>

            <span className="status">
              {a.status}
            </span>

            <small>
              <Clock3 size={13} />{' '}
              {new Date(a.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}

        {!apps.length && (
          <div className="empty">
            <BriefcaseBusiness size={32} />

            <h3>No applications yet</h3>

            <p>
              When you apply for a role, it will appear here.
            </p>

            <Link className="primary-btn" to="/jobs">
              Find a job
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}