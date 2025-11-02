import React, { useEffect, useMemo, useState } from 'react';
import { Dumbbell, Salad, Trophy, Plus, Trash2 } from 'lucide-react';

function useLocalArray(key, initial = []) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }, [key, data]);
  return [data, setData];
}

function SectionCard({ title, icon: Icon, children, accent = 'red' }) {
  const ring = useMemo(() => ({
    red: 'ring-red-500/30',
    green: 'ring-emerald-500/30',
    gold: 'ring-amber-500/30'
  })[accent] || 'ring-red-500/30', [accent]);

  return (
    <div className={`rounded-2xl bg-neutral-950/70 border border-neutral-800 ring-1 ${ring} p-6 backdrop-blur`}> 
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-red-600/15 border border-red-500/30 text-red-400">
          <Icon size={18} />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Tracker() {
  const [active, setActive] = useState('exercise');

  return (
    <section id="tracker" className="relative py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_60%_at_50%_0%,rgba(239,68,68,0.12),transparent_60%)]" />
      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Your Training Hub</h2>
          <div className="flex gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
            <TabButton id="exercise" active={active} setActive={setActive} icon={Dumbbell} label="Exercises" />
            <TabButton id="meal" active={active} setActive={setActive} icon={Salad} label="Meals" />
            <TabButton id="pr" active={active} setActive={setActive} icon={Trophy} label="PRs" />
          </div>
        </div>

        {active === 'exercise' && <ExerciseSection />}
        {active === 'meal' && <MealSection />}
        {active === 'pr' && <PRSection />}
      </div>
    </section>
  );
}

function TabButton({ id, active, setActive, icon: Icon, label }) {
  const isActive = id === active;
  return (
    <button
      onClick={() => setActive(id)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition 
      ${isActive ? 'bg-red-600 text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function ExerciseSection() {
  const [items, setItems] = useLocalArray('gym_exercises', []);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const add = () => {
    if (!name.trim()) return;
    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      sets: Number(sets) || 0,
      reps: Number(reps) || 0,
      weight: Number(weight) || 0,
      date: new Date().toISOString()
    };
    setItems([entry, ...items]);
    setName(''); setSets(''); setReps(''); setWeight('');
  };
  const remove = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <SectionCard title="Exercise Log" icon={Dumbbell}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Exercise (e.g., Squat)" className="col-span-2 md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={sets} onChange={e=>setSets(e.target.value)} placeholder="Sets" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={reps} onChange={e=>setReps(e.target.value)} placeholder="Reps" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Weight (kg)" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <button onClick={add} className="col-span-2 md:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm font-semibold">
          <Plus size={16} /> Add
        </button>
      </div>

      <List items={items} onRemove={remove} render={(i) => (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium">{i.name}</span>
          <span className="text-neutral-400 text-sm">{i.sets} x {i.reps} @ {i.weight}kg</span>
          <span className="text-neutral-500 text-xs">{new Date(i.date).toLocaleString()}</span>
        </div>
      )} />
    </SectionCard>
  );
}

function MealSection() {
  const [meals, setMeals] = useLocalArray('gym_meals', []);
  const [meal, setMeal] = useState('');
  const [cal, setCal] = useState('');
  const [protein, setProtein] = useState('');

  const add = () => {
    if (!meal.trim()) return;
    const entry = {
      id: crypto.randomUUID(),
      meal: meal.trim(),
      calories: Number(cal) || 0,
      protein: Number(protein) || 0,
      date: new Date().toISOString()
    };
    setMeals([entry, ...meals]);
    setMeal(''); setCal(''); setProtein('');
  };
  const remove = (id) => setMeals(meals.filter(m => m.id !== id));

  return (
    <SectionCard title="Meal Log" icon={Salad} accent="green">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <input value={meal} onChange={e=>setMeal(e.target.value)} placeholder="Meal (e.g., Chicken Bowl)" className="col-span-2 md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Calories" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="Protein (g)" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <button onClick={add} className="col-span-2 md:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm font-semibold">
          <Plus size={16} /> Add
        </button>
      </div>

      <List items={meals} onRemove={remove} render={(m) => (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium">{m.meal}</span>
          <span className="text-neutral-400 text-sm">{m.calories} kcal • {m.protein}g protein</span>
          <span className="text-neutral-500 text-xs">{new Date(m.date).toLocaleString()}</span>
        </div>
      )} />
    </SectionCard>
  );
}

function PRSection() {
  const [prs, setPRs] = useLocalArray('gym_prs', []);
  const [lift, setLift] = useState('');
  const [max, setMax] = useState('');

  const add = () => {
    if (!lift.trim() || !max) return;
    const entry = {
      id: crypto.randomUUID(),
      lift: lift.trim(),
      max: Number(max) || 0,
      date: new Date().toISOString()
    };
    setPRs([entry, ...prs]);
    setLift(''); setMax('');
  };
  const remove = (id) => setPRs(prs.filter(p => p.id !== id));

  return (
    <SectionCard title="Personal Records" icon={Trophy} accent="gold">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input value={lift} onChange={e=>setLift(e.target.value)} placeholder="Lift (e.g., Deadlift)" className="col-span-2 md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <input value={max} onChange={e=>setMax(e.target.value)} placeholder="Max (kg)" type="number" className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500/60" />
        <button onClick={add} className="col-span-2 md:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm font-semibold">
          <Plus size={16} /> Add
        </button>
      </div>

      <List items={prs} onRemove={remove} render={(p) => (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium">{p.lift}</span>
          <span className="text-neutral-400 text-sm">{p.max} kg</span>
          <span className="text-neutral-500 text-xs">{new Date(p.date).toLocaleString()}</span>
        </div>
      )} />
    </SectionCard>
  );
}

function List({ items, onRemove, render }) {
  if (!items.length) {
    return (
      <div className="mt-6 text-sm text-neutral-400">No entries yet. Add your first!</div>
    );
  }
  return (
    <div className="mt-6 space-y-3">
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800 rounded-lg px-4 py-3">
          <div>{render(it)}</div>
          <button onClick={() => onRemove(it.id)} className="text-neutral-400 hover:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
