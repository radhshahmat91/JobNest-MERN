import { useEffect, useState } from 'react';
import { api, getUser, saveSession } from '../lib/api';
import { MapPin, Save, UserRound } from 'lucide-react';

export default function Profile() {
  const [f, setF] = useState({ ...getUser() });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/users/me')
      .then((r) => {
        setF(r.data.user);
      })
      .catch((error) => {
        console.error('Failed to load profile:', error);
      });
  }, []);

  const save = async () => {
    try {
      const r = await api.put('/users/me', f);

      setF(r.data.user);
      localStorage.setItem(
        'jobnest_user',
        JSON.stringify(r.data.user)
      );

      setMsg('Profile saved.');
    } catch (error) {
      console.error('Failed to save profile:', error);
      setMsg('Failed to save profile.');
    }
  };

  return (
    <main className="page narrow">
      <span className="eyebrow plain">Your profile</span>

      <h1>Personalize your job feed.</h1>

      <p className="lead">
        The more you tell us, the better we can match roles to you.
      </p>

      <div className="profile-card">
        <div className="avatar">
          <UserRound />
        </div>

        <label>
          Name
          <input
            value={f.name || ''}
            onChange={(e) =>
              setF({ ...f, name: e.target.value })
            }
          />
        </label>

        <label>
          Email
          <input
            value={f.email || ''}
            disabled
          />
        </label>

        <label>
          Background
          <select
            value={f.background || 'other'}
            onChange={(e) =>
              setF({ ...f, background: e.target.value })
            }
          >
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Home address / area

          <div className="input-wrap">
            <MapPin size={17} />

            <input
              value={f.address || ''}
              onChange={(e) =>
                setF({ ...f, address: e.target.value })
              }
              placeholder="e.g. Khilgaon, Dhaka"
            />
          </div>
        </label>

        <label>
          City

          <input
            value={f.city || ''}
            onChange={(e) =>
              setF({ ...f, city: e.target.value })
            }
            placeholder="Dhaka"
          />
        </label>

        <button
          className="primary-btn"
          onClick={save}
        >
          <Save size={16} />
          Save preferences
        </button>

        {msg && (
          <span className="success">
            {msg}
          </span>
        )}
      </div>
    </main>
  );
}