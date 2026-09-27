import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Filter,
  LocateFixed,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import JobCard from '../components/JobCard';
import { api, getUser } from '../lib/api';

const categories = [
  'Technology',
  'BPO',
  'BTO',
  'Database',
  'Creative',
  'Administration',
  'Sales',
  'Customer Support'
];

export default function Jobs() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState(params.get('search') || '');
  const [cat, setCat] = useState(params.get('category') || '');
  const [bg, setBg] = useState('');
  const [mode, setMode] = useState('');
  const [location, setLocation] = useState(
    params.get('location') || ''
  );
  const [sort, setSort] = useState('new');

  const user = getUser();

  const load = () =>
    api
      .get('/jobs', {
        params: {
          search: q,
          category: cat,
          background: bg,
          workMode: mode,
          location
        }
      })
      .then((r) => setJobs(r.data.jobs));

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const visible = useMemo(
    () =>
      [...jobs].sort((a, b) =>
        sort === 'salary'
          ? (b.salaryMax || 0) - (a.salaryMax || 0)
          : new Date(b.postedAt) - new Date(a.postedAt)
      ),
    [jobs, sort]
  );

  // Save a job
  // If the user is not logged in, redirect them to the login page.
  const save = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/users/saved/${id}`);
      await load();
    } catch (error) {
      console.error('Could not save job:', error);
    }
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow plain">Discover</span>

          <h1>Jobs made for you.</h1>

          <p>
            Filter by what you know, what you studied, and where
            you want to work.
          </p>
        </div>
      </div>

      <div className="finder">
        <div className="field wide">
          <Search size={18} />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs, skills or companies"
          />
        </div>

        <div className="field">
          <LocateFixed size={18} />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Area / city"
          />
        </div>

        <button
          className="primary-btn"
          onClick={() => load().catch(() => {})}
        >
          Search
        </button>
      </div>

      <div className="content-grid">
        <aside className="filters">
          <div className="filter-title">
            <SlidersHorizontal size={18} />
            Filters
          </div>

          <label>
            Category

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value="">All categories</option>

              {categories.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>

          <label>
            Background

            <select
              value={bg}
              onChange={(e) => setBg(e.target.value)}
            >
              <option value="">Any background</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Work mode

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Any</option>
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </label>

          <button
            className="outline-btn full"
            onClick={() => load().catch(() => {})}
          >
            <Filter size={15} />
            Apply filters
          </button>
        </aside>

        <section>
          <div className="results-bar">
            <b>{visible.length} opportunities</b>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="new">Newest</option>
              <option value="salary">Highest salary</option>
            </select>
          </div>

          <div className="jobs-grid">
            {visible.map((j) => (
              <JobCard
                key={j._id}
                job={j}
                onSave={save}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
